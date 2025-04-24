import { pgTable, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";

import { user } from "./auth";
import { section } from "./section";

export const resource = pgTable("resource", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  fileUrl: varchar("file_url", { length: 200 }),
  fileName: varchar("file_name", { length: 100 }),
  uploadedBy: varchar("uploaded_by")
    .references(() => user.id)
    .notNull(),
  sectionId: varchar("section_id")
    .references(() => section.id)
    .notNull(),
  versionNumber: integer("version_number"),
  uploadedAt: timestamp("uploaded_at"),
  duration: integer("duration"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
