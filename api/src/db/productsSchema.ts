import { doublePrecision, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const producctsTable = pgTable("Products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image:varchar({ length: 255 }),
  price:doublePrecision().notNull(),
});
