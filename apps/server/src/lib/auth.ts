import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import { passkey } from "better-auth/plugins/passkey";
import "dotenv/config";
import { twoFactor } from "better-auth/plugins";
import { createAuthClient } from "better-auth/client";
import { emailOTPClient } from "better-auth/client/plugins";
import { sendEmail } from "./sendMail";

export const authClient = createAuthClient({
  plugins: [emailOTPClient()],
});

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
    twoFactor({
      skipVerificationOnEnable: true,
      otpOptions: {
        async sendOTP({ user, otp }, request) {
          // send otp to user
          await sendEmail({
            to: user.email,
            subject: "Your verification code",
            text: `Your OTP code is: ${otp}`,
            html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
          });
        },
      },
    }),
  ],
});
