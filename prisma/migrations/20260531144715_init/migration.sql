/*
  Warnings:

  - The primary key for the `ProduitCommande` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[rue,numero,boite,id_adresse]` on the table `Adresse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Adresse_rue_numero_boite_id_localite_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProduitCommande" (
    "id_commande" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_produit" INTEGER NOT NULL,
    "id_facture" INTEGER NOT NULL,
    "quantite" INTEGER,
    CONSTRAINT "ProduitCommande_id_produit_fkey" FOREIGN KEY ("id_produit") REFERENCES "ProduitStock" ("id_produit") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProduitCommande_id_facture_fkey" FOREIGN KEY ("id_facture") REFERENCES "Facture" ("id_facture") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProduitCommande" ("id_commande", "id_facture", "id_produit", "quantite") SELECT "id_commande", "id_facture", "id_produit", "quantite" FROM "ProduitCommande";
DROP TABLE "ProduitCommande";
ALTER TABLE "new_ProduitCommande" RENAME TO "ProduitCommande";
CREATE TABLE "new_Sous_categorie" (
    "id_sous_cat" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "intitule_sous_cat" TEXT,
    "id_cat" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Sous_categorie_id_cat_fkey" FOREIGN KEY ("id_cat") REFERENCES "Categorie" ("id_cat") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sous_categorie" ("id_cat", "id_sous_cat", "intitule_sous_cat") SELECT coalesce("id_cat", 0) AS "id_cat", "id_sous_cat", "intitule_sous_cat" FROM "Sous_categorie";
DROP TABLE "Sous_categorie";
ALTER TABLE "new_Sous_categorie" RENAME TO "Sous_categorie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Adresse_rue_numero_boite_id_adresse_key" ON "Adresse"("rue", "numero", "boite", "id_adresse");
