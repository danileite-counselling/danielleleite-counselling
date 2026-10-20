/* Cookie consent for Google Analytics. Analytics loads only after the visitor clicks Accept. */
(function () {
  var GA_ID = 'G-43ZJSZ3QQ7';
  var KEY = 'dl-analytics-consent';

  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadAnalytics() {
    if (window.__dlGaLoaded) return;
    window.__dlGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function removeGaCookies() {
    var host = location.hostname;
    var domains = ['', host, '.' + host, '.' + host.replace(/^www\./, '')];
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0 || name === '_gid') {
        domains.forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
        });
      }
    });
  }

  var css = '' +
    '.dl-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:100000;max-width:640px;margin:0 auto;' +
    'background:#FFFDF9;color:#564D44;border:1px solid rgba(168,181,160,0.35);border-radius:14px;' +
    'box-shadow:0 6px 30px rgba(61,56,50,0.15);padding:1.1rem 1.3rem;font-family:Inter,-apple-system,sans-serif;' +
    'font-size:0.9rem;line-height:1.6;font-weight:400;display:flex;flex-wrap:wrap;align-items:center;gap:0.9rem 1.2rem}' +
    '.dl-cookie p{margin:0;flex:1 1 300px}' +
    '.dl-cookie a{color:#7A8E6F;text-decoration:underline;text-underline-offset:2px}' +
    '.dl-cookie-btns{display:flex;gap:0.6rem;flex:0 0 auto}' +
    '.dl-cookie button{font-family:inherit;font-size:0.88rem;font-weight:500;padding:0.6rem 1.3rem;border-radius:50px;' +
    'cursor:pointer;border:2px solid #7A8E6F;background:#7A8E6F;color:#fff;min-width:96px}' +
    '.dl-cookie button:hover{background:#5e7a50;border-color:#5e7a50;color:#fff}';

  function showBanner() {
    if (document.getElementById('dl-cookie')) return;
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    var b = document.createElement('div');
    b.id = 'dl-cookie';
    b.className = 'dl-cookie';
    b.setAttribute('role', 'region');
    b.setAttribute('aria-label', 'Cookie choice');
    b.innerHTML = '<p>I use analytics cookies to understand how this site is used. They are only set if you accept. ' +
      '<a href="/privacy/">Privacy Notice</a></p>' +
      '<div class="dl-cookie-btns"><button type="button" data-choice="denied">Reject</button>' +
      '<button type="button" data-choice="granted">Accept</button></div>';
    b.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-choice');
      if (!v) return;
      setChoice(v);
      b.parentNode.removeChild(b);
      if (v === 'granted') loadAnalytics(); else removeGaCookies();
    });
    document.body.appendChild(b);
  }

  function init() {
    var choice = getChoice();
    if (choice === 'granted') loadAnalytics();
    else if (choice !== 'denied') showBanner();
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-cookie-settings]') : null;
      if (!t) return;
      e.preventDefault();
      showBanner();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
