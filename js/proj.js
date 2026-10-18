document.querySelectorAll('.proj-card').forEach(function (card) {
    function toggle() {
        var flipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', flipped);
    }

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });
  });