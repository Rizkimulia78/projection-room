document.addEventListener('DOMContentLoaded', () => {

  // ── Filter + Search (homepage only) ─────────────────────────────────────
  const buttons     = document.querySelectorAll('.filter-btn');
  const cards       = document.querySelectorAll('.card');
  const empty       = document.querySelector('.empty-state');
  const searchInput = document.getElementById('search-input');

  if (buttons.length) {
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

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value.toLowerCase().trim();
        applyFilters();
      });
    }
  }

  // ── Share buttons (review pages) ─────────────────────────────────────────
  const copyBtn = document.querySelector('.copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '✓ Link Copied!';
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = '🔗 Copy Link';
        }, 2000);
      });
    });
  }

  const waBtn = document.querySelector('.share-btn.whatsapp');
  if (waBtn) {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url  = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(document.title + ' — ');
      window.open(`https://wa.me/?text=${text}${url}`, '_blank');
    });
  }

  const twBtn = document.querySelector('.share-btn.twitter');
  if (twBtn) {
    twBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url  = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(document.title);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    });
  }

  const igBtn = document.querySelector('.share-btn.instagram');
  if (igBtn) {
    igBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href).then(() => {
        igBtn.innerHTML = '✓ Link Copied — paste it on Instagram!';
        igBtn.style.color = '#e1306c';
        igBtn.style.borderColor = '#e1306c';
        setTimeout(() => {
          igBtn.innerHTML = '📷 Share to Instagram';
          igBtn.style.color = '';
          igBtn.style.borderColor = '';
        }, 3000);
      });
    });
  }

});
