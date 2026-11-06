import { randomUUID } from "crypto";
import type { Session, InsertSession } from "@workspace/db/schema";
import { logger } from "./lib/logger";

/**
 * Session storage.
 *
 * With DATABASE_URL set, sessions live in Postgres (Drizzle, table paid_sessions).
 * Without it, the server falls back to an in-memory store so it can boot for
 * local development and smoke tests — sessions are lost on restart, so always
 * set DATABASE_URL in production.
 *
 * `@workspace/db` throws at import time when DATABASE_URL is missing, which is
 * why it is imported lazily here.
 */
interface SessionStore {
  createSession(data: InsertSession): Promise<Session>;
  getSessionByPaymentId(paymentSessionId: string): Promise<Session | null>;
  getSession(id: string): Promise<Session | null>;
}

class PgStorage implements SessionStore {
  private mod = Promise.all([import("@workspace/db"), import("drizzle-orm")]);

  async createSession(data: InsertSession): Promise<Session> {
    const [{ db, sessionsTable }] = await this.mod;
    const [session] = await db.insert(sessionsTable).values(data).returning();
    return session;
  }

  async getSessionByPaymentId(
    paymentSessionId: string,
  ): Promise<Session | null> {
    const [{ db, sessionsTable }, { eq }] = await this.mod;
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.stripeSessionId, paymentSessionId));
    return session ?? null;
  }

  async getSession(id: string): Promise<Session | null> {
    const [{ db, sessionsTable }, { eq }] = await this.mod;
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, id));
    return session ?? null;
  }
}

export class MemoryStorage implements SessionStore {
  private sessions = new Map<string, Session>();

  async createSession(data: InsertSession): Promise<Session> {
    const session: Session = {
      id: data.id ?? randomUUID(),
      stripeSessionId: data.stripeSessionId,
      tier: data.tier,
      expiresAt: data.expiresAt ?? null,
      used: data.used ?? false,
      createdAt: new Date(),
    };
    for (const s of this.sessions.values()) {
      if (s.stripeSessionId === session.stripeSessionId) {
        throw new Error("duplicate stripe_session_id");
      }
    }
    this.sessions.set(session.id, session);
    return session;
  }

  async getSessionByPaymentId(
    paymentSessionId: string,
  ): Promise<Session | null> {
    for (const s of this.sessions.values()) {
      if (s.stripeSessionId === paymentSessionId) return s;
    }
    return null;
  }

  async getSession(id: string): Promise<Session | null> {
    return this.sessions.get(id) ?? null;
  }
}

function createStorage(): SessionStore {
  if (process.env.DATABASE_URL) return new PgStorage();
  logger.warn(
    "DATABASE_URL is not set — using in-memory session storage (sessions are lost on restart; do not use in production)",
  );
  return new MemoryStorage();
}

export const storage: SessionStore = createStorage();
