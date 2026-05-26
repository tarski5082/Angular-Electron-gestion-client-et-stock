/*
  Warnings:

  - The primary key for the `Adresse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codePostal` on the `Adresse` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Adresse` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `Adresse` table. All the data in the column will be lost.
  - You are about to drop the column `ville` on the `Adresse` table. All the data in the column will be lost.
  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adresseId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Client` table. All the data in the column will be lost.
  - Added the required column `id_adresse` to the `Adresse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_client` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Localite" (
    "id_localite" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code_postale" TEXT,
    "province" TEXT,
    "localite" TEXT
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id_cat" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "intitule" TEXT
);

-- CreateTable
CREATE TABLE "Sous_categorie" (
    "id_sous_cat" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "intitule_sous_cat" TEXT,
    "id_cat" INTEGER,
    CONSTRAINT "Sous_categorie_id_cat_fkey" FOREIGN KEY ("id_cat") REFERENCES "Categorie" ("id_cat") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProduitStock" (
    "id_produit" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "intitule_produit" TEXT,
    "quantite" INTEGER,
    "prix_unitaire" DECIMAL,
    "id_sous_cat" INTEGER,
    CONSTRAINT "ProduitStock_id_sous_cat_fkey" FOREIGN KEY ("id_sous_cat") REFERENCES "Sous_categorie" ("id_sous_cat") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProduitCommande" (
    "id_commande" INTEGER NOT NULL,
    "id_produit" INTEGER NOT NULL,
    "id_facture" INTEGER NOT NULL,
    "quantite" INTEGER,

    PRIMARY KEY ("id_commande", "id_produit"),
    CONSTRAINT "ProduitCommande_id_produit_fkey" FOREIGN KEY ("id_produit") REFERENCES "ProduitStock" ("id_produit") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProduitCommande_id_facture_fkey" FOREIGN KEY ("id_facture") REFERENCES "Facture" ("id_facture") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Facture" (
    "id_facture" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_client" INTEGER,
    "date_paiement" DATETIME,
    "moyen" TEXT,
    "montant" DECIMAL,
    "etat" TEXT NOT NULL DEFAULT 'a_payer',
    CONSTRAINT "Facture_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client" ("id_client") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adresse" (
    "id_adresse" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rue" TEXT,
    "numero" TEXT,
    "boite" TEXT,
    "id_localite" INTEGER,
    CONSTRAINT "Adresse_id_localite_fkey" FOREIGN KEY ("id_localite") REFERENCES "Localite" ("id_localite") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Adresse" ("boite", "numero", "rue") SELECT "boite", "numero", "rue" FROM "Adresse";
DROP TABLE "Adresse";
ALTER TABLE "new_Adresse" RENAME TO "Adresse";
CREATE TABLE "new_Client" (
    "id_client" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT,
    "prenom" TEXT,
    "email" TEXT,
    "id_adresse" INTEGER,
    CONSTRAINT "Client_id_adresse_fkey" FOREIGN KEY ("id_adresse") REFERENCES "Adresse" ("id_adresse") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("nom", "prenom") SELECT "nom", "prenom" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
