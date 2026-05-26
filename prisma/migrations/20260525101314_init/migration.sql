/*
  Warnings:

  - Made the column `boite` on table `Adresse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numero` on table `Adresse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rue` on table `Adresse` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProduitStock" ADD COLUMN "urlImage" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adresse" (
    "id_adresse" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rue" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "boite" TEXT NOT NULL,
    "id_localite" INTEGER,
    CONSTRAINT "Adresse_id_localite_fkey" FOREIGN KEY ("id_localite") REFERENCES "Localite" ("id_localite") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Adresse" ("boite", "id_adresse", "id_localite", "numero", "rue") SELECT "boite", "id_adresse", "id_localite", "numero", "rue" FROM "Adresse";
DROP TABLE "Adresse";
ALTER TABLE "new_Adresse" RENAME TO "Adresse";
CREATE TABLE "new_Facture" (
    "id_facture" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_client" INTEGER,
    "date_paiement" DATETIME,
    "moyen" TEXT,
    "montant" DECIMAL,
    "etat" TEXT NOT NULL DEFAULT 'a_payer',
    CONSTRAINT "Facture_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client" ("id_client") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Facture" ("date_paiement", "etat", "id_client", "id_facture", "montant", "moyen") SELECT "date_paiement", "etat", "id_client", "id_facture", "montant", "moyen" FROM "Facture";
DROP TABLE "Facture";
ALTER TABLE "new_Facture" RENAME TO "Facture";
CREATE TABLE "new_ProduitCommande" (
    "id_commande" INTEGER NOT NULL,
    "id_produit" INTEGER NOT NULL,
    "id_facture" INTEGER NOT NULL,
    "quantite" INTEGER,

    PRIMARY KEY ("id_commande", "id_produit"),
    CONSTRAINT "ProduitCommande_id_produit_fkey" FOREIGN KEY ("id_produit") REFERENCES "ProduitStock" ("id_produit") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProduitCommande_id_facture_fkey" FOREIGN KEY ("id_facture") REFERENCES "Facture" ("id_facture") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProduitCommande" ("id_commande", "id_facture", "id_produit", "quantite") SELECT "id_commande", "id_facture", "id_produit", "quantite" FROM "ProduitCommande";
DROP TABLE "ProduitCommande";
ALTER TABLE "new_ProduitCommande" RENAME TO "ProduitCommande";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
