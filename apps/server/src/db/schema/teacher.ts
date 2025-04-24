import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";

import { user } from "./auth";

export const teacher = pgTable("teacher", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  userId: varchar("user_id")
    .references(() => user.id)
    .notNull(),
  employeeId: varchar("employee_id", { length: 50 }),
  designation: varchar("designation", { length: 50 }),
  codeName: varchar("code_name", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
