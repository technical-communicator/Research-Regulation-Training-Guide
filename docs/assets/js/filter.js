// ===================================
// Filter Functionality
// ===================================

/**
 * Initialize filters
 */
function initFilters() {
  const filterCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]');
  const cards = document.querySelectorAll('.card[data-jurisdiction], .card[data-category]');

  if (filterCheckboxes.length === 0 || cards.length === 0) return;

  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      applyFilters(filterCheckboxes, cards);
    });
  });
}

/**
 * Apply filters to cards
 */
function applyFilters(checkboxes, cards) {
  // Get selected filters
  const selectedFilters = {
    jurisdiction: [],
    category: []
  };

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const filterType = checkbox.dataset.filter;
      const filterValue = checkbox.value;
      if (selectedFilters[filterType]) {
        selectedFilters[filterType].push(filterValue);
      }
    }
  });

  // Apply filters to cards
  cards.forEach(card => {
    const cardJurisdiction = card.dataset.jurisdiction;
    const cardCategory = card.dataset.category;

    let showCard = true;

    // Check jurisdiction filter
    if (selectedFilters.jurisdiction.length > 0) {
      const matchesJurisdiction = selectedFilters.jurisdiction.some(filter => {
        if (filter === 'us' && cardJurisdiction === 'us') return true;
        if (filter === 'international' && cardJurisdiction === 'international') return true;
        if (filter === 'eu' && cardJurisdiction === 'eu') return true;
        return false;
      });

      if (!matchesJurisdiction) showCard = false;
    }

    // Check category filter
    if (selectedFilters.category.length > 0 && showCard) {
      const matchesCategory = selectedFilters.category.some(filter => {
        if (filter === 'human-subjects' && cardCategory === 'human-subjects') return true;
        if (filter === 'irb' && cardCategory === 'irb') return true;
        if (filter === 'clinical-trials' && cardCategory === 'clinical-trials') return true;
        if (filter === 'data-privacy' && cardCategory === 'data-privacy') return true;
        return false;
      });

      if (!matchesCategory) showCard = false;
    }

    // Show/hide card
    if (showCard) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Show message if no cards visible
  const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
  const container = cards[0]?.closest('.container');

  if (visibleCards.length === 0 && container) {
    let noResultsMsg = document.getElementById('no-results-message');
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.id = 'no-results-message';
      noResultsMsg.className = 'alert alert-info mt-lg';
      noResultsMsg.innerHTML = '<p>No regulations match the selected filters. Try adjusting your filter selection.</p>';
      cards[0].parentElement.appendChild(noResultsMsg);
    }
    noResultsMsg.style.display = 'block';
  } else {
    const noResultsMsg = document.getElementById('no-results-message');
    if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initFilters);
