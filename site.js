// Join the waitlist: scroll reliably to the form, from any page or a repeat click
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function goToWaitlist(smooth) {
    var t = document.getElementById('waitlist');
    if (!t) return false;
    t.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto', block: 'start' });
    var input = t.querySelector('input[type="email"]');
    if (input) input.focus({ preventScroll: true });
    return true;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href="/#waitlist"], a[href="#waitlist"]');
    if (!a) return;
    if (goToWaitlist(true)) {
      e.preventDefault();
      history.replaceState(null, '', '#waitlist');
    }
  });
  if (location.hash === '#waitlist') {
    var run = function () { goToWaitlist(false); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run); else window.addEventListener('load', run);
  }
})();

// Hero phone demo: ask, record, remember
(function () {
  var phone = document.querySelector('[data-demo]');
  if (!phone || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ask = phone.querySelector('.scene-ask'), rec = phone.querySelector('.scene-rec'), sum = phone.querySelector('.scene-sum');
  var words = phone.querySelectorAll('.words span'), wordsBox = phone.querySelector('.words');
  var items = phone.querySelectorAll('.sum-list li'), actions = phone.querySelector('.sum-actions'), hint = phone.querySelector('.sum-hint');
  var timeEl = phone.querySelector('.rec-time'), timers = [], clock;
  phone.querySelectorAll('.wave span').forEach(function (b) {
    b.style.animationDuration = (0.6 + Math.random() * 0.8).toFixed(2) + 's';
    b.style.animationDelay = (-Math.random()).toFixed(2) + 's';
  });
  function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function show(scene) { [ask, rec, sum].forEach(function (s) { s.classList.toggle('is-on', s === scene); }); }
  function reset() {
    timers.forEach(clearTimeout); timers = []; clearInterval(clock);
    phone.classList.remove('press'); wordsBox.classList.remove('gather');
    words.forEach(function (w) { w.classList.remove('in'); });
    items.forEach(function (i) { i.classList.remove('in'); });
    actions.classList.remove('in'); if (hint) hint.classList.remove('in'); timeEl.textContent = '00:00';
  }
  function run() {
    reset(); show(ask);
    at(2200, function () { phone.classList.add('press'); });
    at(2700, function () {
      phone.classList.remove('press'); show(rec);
      var s = 0; clock = setInterval(function () { s += 7; timeEl.textContent = '0' + Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }, 400);
    });
    words.forEach(function (w, i) { at(3300 + i * 1000, function () { w.classList.add('in'); }); });
    at(7800, function () { clearInterval(clock); wordsBox.classList.add('gather'); });
    at(8700, function () { show(sum); });
    items.forEach(function (it, i) { at(9100 + i * 550, function () { it.classList.add('in'); }); });
    at(10900, function () { actions.classList.add('in'); if (hint) hint.classList.add('in'); });
    at(15500, run);
  }
  run();
})();
