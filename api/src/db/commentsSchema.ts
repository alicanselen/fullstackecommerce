import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod"; // createUpdateSchema ekleyin
import { ordersTable } from "./ordersSchema.js";
import { productsTable } from "./productsSchema.js";
import { usersTable } from "./usersSchema.js";

// Yorumlar tablosu
export const commentsTable = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").references(() => usersTable.id).notNull(),
  productId: integer("productId").references(() => productsTable.id).notNull(),
  orderId: integer("orderId").references(() => ordersTable.id).notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// Yorum ekleme şeması
export const insertCommentSchema = createInsertSchema(commentsTable).omit({
  id: true,
  createdAt: true,
});

// Yorum güncelleme şeması
export const updateCommentSchema = createInsertSchema(commentsTable).omit({
  id: true,
  userId: true,
  productId: true,
  orderId: true,
  createdAt: true,
});