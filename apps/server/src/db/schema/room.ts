import { pgTable, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";

export const room = pgTable("room", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  buildingName: varchar("building_name", { length: 100 }),
  roomNumber: varchar("room_number", { length: 50 }),
  isLab: boolean("is_lab").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
