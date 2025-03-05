/**
 * Template pour une carte produit
 * @param {Object} product - Le produit à afficher
 * @returns {string} HTML de la carte produit
 */
export function renderProductCard(product) {
  return `
        <article class="product-card card hover-lift" data-id="${product.id}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-actions">
                <button class="btn btn-primary view-details" data-id="${product.id}">
                    Voir détails
                </button>
            </div>
        </article>
    `;
}
