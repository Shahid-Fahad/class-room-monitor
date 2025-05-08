import { pgTable, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";
import { auditFields } from "./auditFields";

export const course = pgTable("course", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  title: varchar("title", { length: 100 }),
  code: varchar("code", { length: 20 }).notNull(),
  isActive: boolean("is_active").default(true),
  ...auditFields,
});
