export interface Stock {
  id_produit: number;
  urlImage?: string | '';
  intitule_produit?: string | null;
  quantite?: number | null;
  prix_unitaire?: number | null;
  id_sous_cat?: number | null;
}
