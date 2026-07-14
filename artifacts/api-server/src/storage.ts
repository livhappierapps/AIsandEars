import { db } from "@workspace/db";
import { sessionsTable, type Session, type InsertSession } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

export class Storage {
  async createSession(data: InsertSession): Promise<Session> {
    const [session] = await db.insert(sessionsTable).values(data).returning();
    return session;
  }

  async getSessionByStripeId(stripeSessionId: string): Promise<Session | null> {
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.stripeSessionId, stripeSessionId));
    return session ?? null;
  }

  async getSession(id: string): Promise<Session | null> {
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, id));
    return session ?? null;
  }

}

export const storage = new Storage();
