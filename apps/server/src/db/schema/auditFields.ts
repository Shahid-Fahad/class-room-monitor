import { varchar, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const auditFields = {
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
  updatedBy: varchar("marked_by").references(() => user.id),
  deletedBy: varchar("deleted_by").references(() => user.id),
};
