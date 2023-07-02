ALTER TABLE "log" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "log" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "log" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "log" ADD COLUMN "user_id" uuid;