import { pgTable, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createId } from "utils/create-id";

export const user = pgTable("user", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 100 }).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: varchar("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  expiresAt: timestamp("expires_at").notNull(),
  token: varchar("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent"),
  userId: varchar("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  accountId: varchar("account_id").notNull(),
  providerId: varchar("provider_id").notNull(),
  userId: varchar("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: varchar("access_token"),
  refreshToken: varchar("refresh_token"),
  idToken: varchar("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: varchar("scope"),
  password: varchar("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: varchar("id", { length: 26 }).primaryKey().$defaultFn(createId),
  identifier: varchar("identifier").notNull(),
  value: varchar("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
