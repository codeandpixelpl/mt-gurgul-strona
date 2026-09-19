/* Wireframe MT Gurgul: menu, podmenu, wybór biura przy „Zadzwoń”, formularz. */
(function () {
  var body = document.body;

  // menu na telefonie
  var menuBtn = document.querySelector('[data-menu]');
  function zamknijMenu() {
    body.classList.remove('menu-otwarte');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var otwarte = body.classList.toggle('menu-otwarte');
      menuBtn.setAttribute('aria-expanded', otwarte ? 'true' : 'false');
    });
  }

  // podmenu: przycisk rozwijania działa na dotyku i klawiaturze, hover jest tylko nadpisaniem w CSS
  function zwinWszystko(poza) {
    document.querySelectorAll('.nav__item.is-open').forEach(function (li) {
      if (li === poza) return;
      li.classList.remove('is-open');
      li.querySelector('.nav__rozwin').setAttribute('aria-expanded', 'false');
    });
  }
  document.querySelectorAll('.nav__rozwin').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = b.closest('.nav__item');
      var otwarte = !li.classList.contains('is-open');
      zwinWszystko(li);
      li.classList.toggle('is-open', otwarte);
      b.setAttribute('aria-expanded', otwarte ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__item')) zwinWszystko(null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // fokus z linku podmenu wraca na przycisk rozwijania, inaczej :focus-visible trzyma listę otwartą
      var li = document.activeElement && document.activeElement.closest('.nav__item');
      zwinWszystko(null); zamknijMenu();
      if (li && li.querySelector('.nav__rozwin') && document.activeElement !== li.querySelector('.nav__rozwin')) li.querySelector('.nav__rozwin').focus();
    }
  });
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', zamknijMenu);
  });

  // „Zadzwoń”: dwa biura, więc najpierw wybór numeru
  var okno = document.getElementById('zadzwon');
  document.querySelectorAll('[data-zadzwon]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (okno && okno.showModal) okno.showModal();
    });
  });
  if (okno) {
    okno.addEventListener('click', function (e) { if (e.target === okno) okno.close(); });
  }

  // formularz: biuro i rodzaj sprawy z adresu (?biuro=brzesko&sprawa=gap) zaznaczają pigułkę,
  // błędy pól widać dopiero po próbie wysłania (klasa .proba), potem potwierdzenie
  var form = document.querySelector('.form');
  if (form) {
    var q = new URLSearchParams(location.search);
    ['biuro', 'sprawa'].forEach(function (k) {
      var v = q.get(k);
      if (!v) return;
      var radio = form.querySelector('input[name="' + k + '"][value="' + CSS.escape(v) + '"]');
      if (radio) radio.checked = true;
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('proba');
      if (!form.reportValidity()) return;
      var wrap = form.closest('.form-wrap');
      wrap.classList.add('wyslane');
      var ok = wrap.querySelector('.form__ok');
      ok.setAttribute('tabindex', '-1');
      ok.focus();
    });
  }

  // mapa dojazdu: fasada, iframe Google dopiero po kliknięciu (waga strony i ciasteczka Google przed zgodą)
  document.querySelectorAll('.p-mapa').forEach(function (m) {
    var przycisk = m.querySelector('.p-mapa__pokaz');
    if (!przycisk) return;
    przycisk.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = m.getAttribute('data-mapa');
      f.title = m.getAttribute('data-tytul') || 'Mapa dojazdu';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.setAttribute('allowfullscreen', '');
      m.classList.add('p-mapa--wczytana');
      m.appendChild(f);
      f.focus();
    });
  });

  // zakładki (Sposoby likwidacji szkody): wzorzec ARIA tabs, strzałki, Home/End; bez JS widać wszystkie panele
  document.querySelectorAll('[data-zakladki]').forEach(function (z) {
    var taby = [].slice.call(z.querySelectorAll('[role="tab"]'));
    function pokaz(t, fokus) {
      taby.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (fokus) t.focus();
    }
    taby.forEach(function (t, i) {
      t.addEventListener('click', function () { pokaz(t); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % taby.length;
        else if (e.key === 'ArrowLeft') n = (i - 1 + taby.length) % taby.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = taby.length - 1;
        if (n === null) return;
        e.preventDefault();
        pokaz(taby[n], true);
      });
    });
    pokaz(taby[0]);
  });

  // pas kart przewijany w bok (Rozwiązania warte uwagi): strzałki przesuwają o jedną kartę,
  // wyłączają się na końcach; dotyk przewija palcem bez JS
  document.querySelectorAll('[data-przewijane]').forEach(function (pas) {
    var sek = pas.closest('section');
    var strz = sek ? sek.querySelectorAll('[data-przewin]') : [];
    if (!strz.length) return;
    function krok() {
      var k = pas.firstElementChild;
      return k ? k.getBoundingClientRect().width + parseFloat(getComputedStyle(pas).columnGap || 0) : pas.clientWidth;
    }
    function stan() {
      var max = pas.scrollWidth - pas.clientWidth - 2;
      strz[0].disabled = pas.scrollLeft <= 2;
      strz[1].disabled = pas.scrollLeft >= max;
    }
    strz.forEach(function (b) {
      b.addEventListener('click', function () { pas.scrollBy({ left: krok() * Number(b.getAttribute('data-przewin')) }); });
    });
    pas.addEventListener('scroll', stan, { passive: true });
    window.addEventListener('resize', stan);
    stan();
  });
})();
