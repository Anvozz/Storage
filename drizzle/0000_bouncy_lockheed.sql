CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstname" text,
	"lastname" text,
	"isActive" boolean,
	"email" text,
	"password" text,
	"role" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
