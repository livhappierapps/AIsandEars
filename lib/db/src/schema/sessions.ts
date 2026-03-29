import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const sessionsTable = pgTable("paid_sessions", {
  id: text("id").primaryKey(),
  stripeSessionId: text("stripe_session_id").notNull().unique(),
  tier: text("tier").notNull(),
  expiresAt: timestamp("expires_at"),
  used: boolean("used").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSessionSchema = createInsertSchema(sessionsTable).omit({ createdAt: true });
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessionsTable.$inferSelect;
