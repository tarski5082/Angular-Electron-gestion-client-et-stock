/*
  Warnings:

  - Made the column `id_localite` on table `Adresse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nom` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prenom` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adresse" (
    "id_adresse" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rue" TEXT,
    "numero" TEXT,
    "boite" TEXT,
    "id_localite" INTEGER NOT NULL,
    CONSTRAINT "Adresse_id_localite_fkey" FOREIGN KEY ("id_localite") REFERENCES "Localite" ("id_localite") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Adresse" ("boite", "id_adresse", "id_localite", "numero", "rue") SELECT "boite", "id_adresse", "id_localite", "numero", "rue" FROM "Adresse";
DROP TABLE "Adresse";
ALTER TABLE "new_Adresse" RENAME TO "Adresse";
CREATE TABLE "new_Client" (
    "id_client" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT,
    "id_adresse" INTEGER,
    CONSTRAINT "Client_id_adresse_fkey" FOREIGN KEY ("id_adresse") REFERENCES "Adresse" ("id_adresse") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("email", "id_adresse", "id_client", "nom", "prenom") SELECT "email", "id_adresse", "id_client", "nom", "prenom" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
