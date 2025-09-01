-- CreateTable
CREATE TABLE "public"."incident_audit_logs" (
    "id" SERIAL NOT NULL,
    "incidentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "field" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "incident_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "incident_audit_logs_incidentId_idx" ON "public"."incident_audit_logs"("incidentId");

-- CreateIndex
CREATE INDEX "incident_audit_logs_userId_idx" ON "public"."incident_audit_logs"("userId");

-- AddForeignKey
ALTER TABLE "public"."incident_audit_logs" ADD CONSTRAINT "incident_audit_logs_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "public"."incidents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."incident_audit_logs" ADD CONSTRAINT "incident_audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
