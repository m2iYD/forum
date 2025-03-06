/**
 * Template pour les produits à la une
 * @param {Array} products - Liste des produits
 * @returns {string} HTML des produits à la une
 */
export function renderFeaturedProducts(products) {
  return products
    .map(
      (product) => `
            <article class="product-card card hover-lift" data-id="${product.id}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-actions">
                    <button class="btn btn-primary view-details" data-id="${product.id}">
                        Voir détails
                    </button>
                </div>
            </article>
        `
    )
    .join("");
}
