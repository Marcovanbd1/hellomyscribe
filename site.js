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
