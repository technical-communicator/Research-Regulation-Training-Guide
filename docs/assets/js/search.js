// ===================================
// Search Functionality
// ===================================

let regulationsData = null;

/**
 * Load regulations data
 */
async function loadRegulationsData() {
  if (regulationsData) return regulationsData;

  try {
    const response = await fetch('../assets/data/regulations.json');
    regulationsData = await response.json();
    return regulationsData;
  } catch (error) {
    console.error('Error loading regulations data:', error);
    return null;
  }
}

/**
 * Search regulations
 */
async function searchRegulations(query) {
  const data = await loadRegulationsData();
  if (!data) return [];

  const lowerQuery = query.toLowerCase();
  const results = [];

  data.regulations.forEach(reg => {
    let score = 0;
    let matches = [];

    // Title match (highest weight)
    if (reg.title.toLowerCase().includes(lowerQuery)) {
      score += 10;
      matches.push('title');
    }

    // Short name match
    if (reg.shortName.toLowerCase().includes(lowerQuery)) {
      score += 8;
      matches.push('shortName');
    }

    // Summary match
    if (reg.summary.toLowerCase().includes(lowerQuery)) {
      score += 5;
      matches.push('summary');
    }

    // Key requirements match
    reg.keyRequirements.forEach(req => {
      if (req.toLowerCase().includes(lowerQuery)) {
        score += 3;
        matches.push('requirements');
      }
    });

    // Category match
    if (reg.category.toLowerCase().includes(lowerQuery)) {
      score += 4;
      matches.push('category');
    }

    // Jurisdiction match
    if (reg.jurisdiction.toLowerCase().includes(lowerQuery)) {
      score += 4;
      matches.push('jurisdiction');
    }

    if (score > 0) {
      results.push({
        regulation: reg,
        score: score,
        matches: [...new Set(matches)]
      });
    }
  });

  // Sort by score
  results.sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Display search results
 */
function displaySearchResults(results, container) {
  if (!results || results.length === 0) {
    container.innerHTML = `
      <div class="alert alert-info">
        <p>No results found. Try a different search term or browse regulations by <a href="../regulations/index.html">jurisdiction</a> or <a href="../topics/index.html">topic</a>.</p>
      </div>
    `;
    return;
  }

  const html = results.map(result => {
    const reg = result.regulation;
    const matchText = result.matches.length > 0
      ? `<span class="text-sm text-secondary">Matched in: ${result.matches.join(', ')}</span>`
      : '';

    return `
      <div class="card">
        <div class="flex justify-between items-center mb-sm">
          <h3 class="card-title mb-0">${reg.shortName}</h3>
          <span class="badge badge-primary">${reg.jurisdiction}</span>
        </div>
        <p class="text-secondary mb-sm"><strong>${reg.title}</strong></p>
        <p class="card-content">${reg.summary}</p>
        <div class="mt-md">
          <span class="badge badge-info">${reg.category}</span>
        </div>
        ${matchText ? `<p class="mt-sm">${matchText}</p>` : ''}
        <a href="../regulations/${getRegulationPage(reg.id)}" class="card-link">View details</a>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

/**
 * Get regulation page filename from ID
 */
function getRegulationPage(id) {
  const mapping = {
    'fda-50': 'fda.html',
    'fda-56': 'fda.html#part-56',
    'common-rule': 'common-rule.html',
    'ich-gcp': 'ich-gcp.html',
    'helsinki': 'helsinki.html',
    'hipaa': 'hipaa.html',
    'gdpr': 'gdpr.html'
  };
  return mapping[id] || 'index.html';
}

/**
 * Initialize search page
 */
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const resultsContainer = document.getElementById('search-results');

  if (!searchInput || !resultsContainer) return;

  // Handle search
  const performSearch = async () => {
    const query = searchInput.value.trim();

    if (query.length < 2) {
      resultsContainer.innerHTML = `
        <div class="alert alert-info">
          <p>Please enter at least 2 characters to search.</p>
        </div>
      `;
      return;
    }

    // Show loading
    resultsContainer.innerHTML = `
      <div class="loading-container">
        <div class="spinner"></div>
      </div>
    `;

    // Perform search
    const results = await searchRegulations(query);

    // Display results
    displaySearchResults(results, resultsContainer);
  };

  // Search on button click
  if (searchButton) {
    searchButton.addEventListener('click', performSearch);
  }

  // Search on Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Debounced live search
  const debouncedSearch = utils.debounce(performSearch, 500);
  searchInput.addEventListener('input', debouncedSearch);

  // Check for query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('q');
  if (queryParam) {
    searchInput.value = queryParam;
    performSearch();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSearch);
