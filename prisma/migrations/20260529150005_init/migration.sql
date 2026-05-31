/*
  Warnings:

  - A unique constraint covering the columns `[rue,numero,boite,id_localite]` on the table `Adresse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code_postale,province,localite]` on the table `Localite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Adresse_rue_numero_boite_id_localite_key" ON "Adresse"("rue", "numero", "boite", "id_localite");

-- CreateIndex
CREATE UNIQUE INDEX "Localite_code_postale_province_localite_key" ON "Localite"("code_postale", "province", "localite");
