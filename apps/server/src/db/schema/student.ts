import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";

import { user } from "./auth";
import { section } from "./section";
import { auditFields } from "./auditFields";

export const student = pgTable("student", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  userId: varchar("user_id")
    .references(() => user.id)
    .notNull(),
  metricId: varchar("metric_id", { length: 50 }),
  sectionId: varchar("section_id")
    .references(() => section.id)
    .notNull(),
  batchName: varchar("batch_name", { length: 20 }),
  ...auditFields,
});
