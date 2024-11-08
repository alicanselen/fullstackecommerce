import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("Users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    email: varchar({length:255}).notNull().unique(),
    pasword:varchar({length:255}).notNull(),
    role:varchar({length:255}).notNull().default('user'),
    
    name:varchar({length:255}),
    address:text()
  });

  export const createUserSchema = createInsertSchema(usersTable).omit({
    id:true,
    role:true,
  }
  );
  export const loginSchema = createInsertSchema(usersTable).pick({
    email:true,
    pasword:true,
  }
  );