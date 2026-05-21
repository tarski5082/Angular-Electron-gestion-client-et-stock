/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresseId" INTEGER NOT NULL,
    CONSTRAINT "Client_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "Adresse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Adresse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rue" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "boite" TEXT,
    "codePostal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "province" TEXT NOT NULL
);
