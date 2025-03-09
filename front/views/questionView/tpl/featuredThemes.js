/**
 * Template pour les themes
 * @param {Array} themes - Liste des themes
 * @returns {string} HTML des themes
 */
export function renderFeaturedThemes(themes) {
  if (themes.length === 0) {
    return `<option value="loading">Loading themes...</option>`;
  }

  return themes
    .map((theme) => `<option value="${theme.name}">${theme.name}</option>`)
    .join("");
}
