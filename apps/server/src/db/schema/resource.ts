import { pgTable, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";

import { user } from "./auth";
import { section } from "./section";
import { auditFields } from "./auditFields";

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
  duration: integer("duration"),
  ...auditFields,
});
