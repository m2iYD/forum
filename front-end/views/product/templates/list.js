/**
 * Template pour la liste des produits
 * @param {Array} products - Liste des produits
 * @param {Function} renderCard - Fonction de rendu d'une carte produit
 * @returns {string} HTML de la liste des produits
 */
export function renderProductList(products, renderCard) {
  return `
        <div class="products-page container page-transition">
            <h1>Nos Produits</h1>
            <div class="products-grid grid">
                ${products.map((product) => renderCard(product)).join("")}
            </div>
        </div>
    `;
}
