import { doublePrecision, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("Products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image:varchar({ length: 255 }),
  price:doublePrecision().notNull(),
});

export const createProductSchema = createInsertSchema(productsTable).omit({
  id:true, 
});

export const updateProductSchema = createInsertSchema(productsTable).omit({
  id:true, 
})
.partial();
