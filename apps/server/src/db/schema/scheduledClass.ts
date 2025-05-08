import { pgTable, varchar, integer, time, date } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";
import {
  approvalStatusEnum as rescheduledClassApprovalStatusEnum,
  deliveryStatusEnum,
} from "./enums";
import { course } from "./course";
import { teacher } from "./teacher";
import { section } from "./section";
import { room } from "./room";
import { auditFields } from "./auditFields";

export const scheduledClass = pgTable("scheduled_class", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  courseId: varchar("course_id")
    .references(() => course.id)
    .notNull(),
  teacherId: varchar("teacher_id")
    .references(() => teacher.id)
    .notNull(),
  roomId: varchar("room_id")
    .references(() => room.id)
    .notNull(),
  sectionId: varchar("section_id")
    .references(() => section.id)
    .notNull(),
  startTime: time("start_time").notNull(),
  duration: integer("duration").notNull(),
  date: date("date").notNull(),
  rescheduledClassApprovalStatus: rescheduledClassApprovalStatusEnum(
    "rescheduled_class_status_approval_status"
  ),
  status: deliveryStatusEnum("status"),
  remarks: varchar("remarks", { length: 100 }),
  ...auditFields,
});
