import {
  pgTable,
  varchar,
  timestamp,
  date,
  boolean,
} from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";
import { scheduledClass } from "./scheduledClass";
import { student } from "./student";
import { auditFields } from "./auditFields";

export const attendance = pgTable("attendance", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  scheduledClassId: varchar("scheduled_class_id")
    .references(() => scheduledClass.id)
    .notNull(),
  studentId: varchar("student_id")
    .references(() => student.id)
    .notNull(),
  date: date("date").notNull(),
  isPresent: boolean("is_present").notNull(),
  ...auditFields,
});
