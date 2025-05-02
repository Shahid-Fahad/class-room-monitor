import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import { passkey } from "better-auth/plugins/passkey";
import "dotenv/config";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  emailAndPassword: { enabled: true },
  plugins: [
    passkey({
      rpID: process.env.RP_ID!,
      rpName: process.env.RP_NAME!,
      origin: process.env.ORIGIN!,
    }),
  ],
});
