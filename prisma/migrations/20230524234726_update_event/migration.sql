-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "eventId" INTEGER;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
