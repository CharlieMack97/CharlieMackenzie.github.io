(() => {
const folders = document.querySelectorAll('.folder');

  folders.forEach(folder => {
    const btn = folder.querySelector('.folder-tab');
    const cards = folder.querySelectorAll('.card');
    cards.forEach((c, i) => c.style.setProperty('--i', i));       
    folder.querySelector('.count').textContent =
      cards.length + (cards.length === 1 ? ' project' : ' projects');

    btn.addEventListener('click', () => setOpen(folder, !folder.classList.contains('open')));
  });

  function setOpen(folder, open) {
    folder.classList.toggle('open', open);
    folder.querySelector('.folder-tab').setAttribute('aria-expanded', open);
  }

  
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target && target.classList.contains('folder')) setOpen(target, true);
    });
  });
})();
