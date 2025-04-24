import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";
import { user } from "./auth";
import { roleEnum } from "./enums";

export const role = pgTable("role", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  name: roleEnum("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const userRole = pgTable("user_role", {
  userId: varchar("user_id")
    .references(() => user.id)
    .notNull(),
  roleId: varchar("role_id")
    .references(() => role.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
