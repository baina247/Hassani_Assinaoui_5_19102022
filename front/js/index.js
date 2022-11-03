import  { getAllProducts }  from  "./functions/api.js";

// aller chercher la liste des canapes via l'api
const products = getAllProducts();
//faire une boucle sur cette liste de canapé
//pour chaque canape creer une cart et remplir les données de la carte avec les données du produit