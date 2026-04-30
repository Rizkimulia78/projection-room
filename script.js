document.addEventListener('DOMContentLoaded', () => {
  const buttons     = document.querySelectorAll('.filter-btn');
  const cards       = document.querySelectorAll('.card');
  const empty       = document.querySelector('.empty-state');
  const searchInput = document.getElementById('search-input');

  let activeFilter = 'all';
  let searchQuery  = '';

  function applyFilters() {
    let visible = 0;

    cards.forEach(card => {
      const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const genre = card.querySelector('.card-genre')?.textContent.toLowerCase() || '';
      const searchMatch = searchQuery === '' || title.includes(searchQuery) || genre.includes(searchQuery);

      const show = categoryMatch && searchMatch;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (empty) empty.style.display = visible === 0 ? '' : 'none';
  }

  // Category filter
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  // Search
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.toLowerCase().trim();
    applyFilters();
  });
});
