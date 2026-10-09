// Razor Autobody — interactions
document.addEventListener('DOMContentLoaded', function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Reveal-on-scroll for cards, features, gallery
  var revealTargets = document.querySelectorAll('.card, .feature, .g, .section-head, .split-copy, .contact-form');
  if ('IntersectionObserver' in window) {
    revealTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  }
});

// Lightweight quote handler (demo — no backend). Opens the user's mail client.
function handleQuote(e) {
  e.preventDefault();
  var f = e.target;
  var name = f.name.value.trim();
  var phone = f.phone.value.trim();
  var msg = f.msg.value.trim();
  var subject = encodeURIComponent('Website quote request — ' + name);
  var body = encodeURIComponent(
    'Name: ' + name + '\nPhone: ' + phone + '\n\nVehicle & damage:\n' + msg
  );
  window.location.href = 'mailto:info@razorautobody.co.za?subject=' + subject + '&body=' + body;
  return false;
}
