/*
  Warnings:

  - Made the column `statusId` on table `Task` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "statusId" SET NOT NULL;
