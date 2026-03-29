import { db } from "@workspace/db";
import { sessionsTable, type Session, type InsertSession } from "@workspace/db/schema";
import { eq, sql } from "drizzle-orm";

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

  async listProductsWithPrices() {
    const result = await db.execute(
      sql`
        WITH paginated_products AS (
          SELECT id, name, description, metadata, active
          FROM stripe.products
          WHERE active = true
          ORDER BY id
          LIMIT 20
        )
        SELECT 
          p.id as product_id,
          p.name as product_name,
          p.description as product_description,
          p.active as product_active,
          p.metadata as product_metadata,
          pr.id as price_id,
          pr.unit_amount,
          pr.currency,
          pr.recurring,
          pr.active as price_active,
          pr.metadata as price_metadata
        FROM paginated_products p
        LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
        ORDER BY p.id, pr.unit_amount
      `
    );
    return result.rows;
  }
}

export const storage = new Storage();
