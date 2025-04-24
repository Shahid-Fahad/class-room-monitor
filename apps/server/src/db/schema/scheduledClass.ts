import {
  pgTable,
  varchar,
  timestamp,
  integer,
  time,
} from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";
import { dayEnum } from "./enums";
import { course } from "./course";
import { teacher } from "./teacher";
import { section } from "./section";
import { room } from "./room";

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
  day: dayEnum("day").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
