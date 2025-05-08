import { pgTable, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";
import { teacher } from "./teacher";
import { auditFields } from "./auditFields";

export const section = pgTable("section", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  name: varchar("name", { length: 20 }).notNull(),
  semester: integer("semester").notNull(),
  advisorId: varchar("advisor_id").references(() => teacher.id),
  ...auditFields,
});
