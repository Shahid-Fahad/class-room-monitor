CREATE TABLE "passkey" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"name" varchar,
	"publicKey" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"credential_ID" varchar NOT NULL,
	"counter" integer NOT NULL,
	"device_type" varchar NOT NULL,
	"backed_up" boolean NOT NULL,
	"transports" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "passkey" ADD CONSTRAINT "passkey_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;