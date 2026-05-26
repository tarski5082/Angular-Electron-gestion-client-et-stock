/*
  Warnings:

  - You are about to drop the column `id_cat` on the `ProduitStock` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProduitStock" (
    "id_produit" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlImage" TEXT,
    "intitule_produit" TEXT,
    "quantite" INTEGER,
    "prix_unitaire" DECIMAL,
    "id_sous_cat" INTEGER,
    CONSTRAINT "ProduitStock_id_sous_cat_fkey" FOREIGN KEY ("id_sous_cat") REFERENCES "Sous_categorie" ("id_sous_cat") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProduitStock" ("id_produit", "id_sous_cat", "intitule_produit", "prix_unitaire", "quantite", "urlImage") SELECT "id_produit", "id_sous_cat", "intitule_produit", "prix_unitaire", "quantite", "urlImage" FROM "ProduitStock";
DROP TABLE "ProduitStock";
ALTER TABLE "new_ProduitStock" RENAME TO "ProduitStock";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
