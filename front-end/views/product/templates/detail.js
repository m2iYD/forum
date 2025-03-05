/**
 * Template pour le détail d'un produit
 * @param {Object} product - Le produit à afficher
 * @returns {string} HTML du détail du produit
 */
export function renderProductDetail(product) {
  if (!product) {
    return `
            <div class="error-page container page-transition">
                <div class="error-content">
                    <h1 class="error-title">404</h1>
                    <div class="error-message">
                        <h2>Produit non trouvé</h2>
                        <p>Désolé, le produit que vous recherchez n'existe pas ou a été supprimé.</p>
                    </div>
                    <div class="error-actions">
                        <a href="/products" class="btn btn-primary" data-link>Voir tous les produits</a>
                    </div>
                </div>
            </div>
        `;
  }

  return `
        <div class="product-detail container page-transition">
            <div class="product-navigation">
                <a href="/products" class="back-button" data-link>
                    <span class="icon">&larr;</span>
                    <span>Retour aux produits</span>
                </a>
            </div>
            
            <div class="product-content card">
                <div class="product-header">
                    <h1>${product.name}</h1>
                    <div class="product-id">Référence: #${product.id}</div>
                </div>

                <div class="product-body">
                    <div class="product-image">
                        <!-- Placeholder pour l'image -->
                        <div class="image-placeholder">
                            <span class="placeholder-text">${product.name}</span>
                        </div>
                    </div>

                    <div class="product-info">
                        <div class="description">
                            <h2>Description</h2>
                            <p>${product.description}</p>
                        </div>

                        <div class="product-actions">
                            <button class="btn btn-success add-to-cart" data-id="${product.id}">
                                <span class="icon">🛒</span>
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
