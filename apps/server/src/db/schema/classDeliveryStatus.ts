import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";
import { deliveryStatusEnum } from "./enums";
import { scheduledClass } from "./scheduledClass";
import { rescheduledClass } from "./rescheduledClass";
import { user } from "./auth";

export const classDeliveryStatus = pgTable("class_delivery_status", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  scheduledClassId: varchar("scheduled_class_id").references(
    () => scheduledClass.id
  ),
  rescheduledClassId: varchar("rescheduled_class_id").references(
    () => rescheduledClass.id
  ),
  markedById: varchar("marked_by_id").references(() => user.id),
  status: deliveryStatusEnum("status"),
  remarks: varchar("remarks", { length: 100 }),
  markedAt: timestamp("marked_at"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
