import { pgTable, varchar, timestamp, date, time } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";
import { approvalStatusEnum } from "./enums";
import { scheduledClass } from "./scheduledClass";
import { room } from "./room";

export const rescheduledClass = pgTable("rescheduled_class", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  originalClassId: varchar("original_class_id")
    .references(() => scheduledClass.id)
    .notNull(),
  roomId: varchar("room_id")
    .references(() => room.id)
    .notNull(),
  startTime: time("start_time").notNull(),
  date: date("date").notNull(),
  approvalStatus: approvalStatusEnum("approval_status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
