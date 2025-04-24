import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role_name", [
  "Super Admin",
  "Chairman",
  "Admin",
  "CR",
  "Teacher",
  "Student",
]);
export type Role = (typeof roleEnum.enumValues)[number];

export const dayEnum = pgEnum("day", [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]);

export const approvalStatusEnum = pgEnum("approval_status", [
  "Pending",
  "Approved",
  "Rejected",
]);
export const deliveryStatusEnum = pgEnum("delivery_status", [
  "Scheduled",
  "Delivered",
  "Canceled",
  "Rescheduled",
]);
