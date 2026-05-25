/*
 * search.js — client-side search for nobell.com.
 * Reads ?s= from the URL, fetches assets/search-index.json, renders matching
 * cards. Re-submits with the search-form input.
 */
(function () {
  'use strict';

  var INDEX_URL = '/assets/search-index.json';

  var input  = document.getElementById('js-search-input');
  var form   = document.getElementById('js-search-form');
  var grid   = document.getElementById('js-search-grid');
  var meta   = document.getElementById('js-search-meta');
  var empty  = document.getElementById('js-search-empty');
  var sub    = document.getElementById('js-search-sub');

  if (!form || !grid) return;

  function getQuery() {
    var p = new URLSearchParams(window.location.search);
    return (p.get('s') || p.get('q') || '').trim();
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c];
    });
  }

  function escapeReg(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, terms) {
    var html = escapeHtml(text);
    terms.forEach(function (t) {
      if (!t) return;
      var re = new RegExp('(' + escapeReg(t) + ')', 'gi');
      html = html.replace(re, '<mark>$1</mark>');
    });
    return html;
  }

  function scoreEntry(e, terms) {
    var hay = {
      title: (e.title || '').toLowerCase(),
      desc:  (e.description || '').toLowerCase(),
      tag:   (e.tag || '').toLowerCase(),
      text:  (e.text || '').toLowerCase(),
      url:   (e.url || '').toLowerCase()
    };
    var score = 0;
    var matchedAll = true;
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (!t) continue;
      var hit = 0;
      if (hay.title.indexOf(t) !== -1) hit += 10;
      if (hay.tag.indexOf(t)   !== -1) hit += 6;
      if (hay.desc.indexOf(t)  !== -1) hit += 4;
      if (hay.text.indexOf(t)  !== -1) hit += 2;
      if (hay.url.indexOf(t)   !== -1) hit += 1;
      if (hit === 0) { matchedAll = false; break; }
      score += hit;
    }
    return matchedAll ? score : 0;
  }

  function render(results, query, terms) {
    grid.innerHTML = '';
    if (!query) {
      meta.hidden = true;
      empty.hidden = true;
      return;
    }
    if (!results.length) {
      meta.hidden = true;
      grid.hidden = true;
      empty.hidden = false;
      empty.querySelector('strong').textContent = '«' + query + '»';
      return;
    }
    grid.hidden = false;
    empty.hidden = true;
    meta.hidden = false;
    meta.innerHTML = 'Найдено <strong>' + results.length + '</strong> результат(ов) по запросу <strong>«' + escapeHtml(query) + '»</strong>';

    var frag = document.createDocumentFragment();
    results.forEach(function (e) {
      var a = document.createElement('a');
      a.className = 'search-card';
      a.href = '/' + e.url;
      var img = e.image
        ? '<div class="search-card__img"><img loading="lazy" decoding="async" src="/' + escapeHtml(e.image) + '" alt=""></div>'
        : '';
      a.innerHTML =
        img +
        '<div class="search-card__body">' +
          (e.tag ? '<span class="search-card__tag">' + escapeHtml(e.tag) + '</span>' : '') +
          '<h3 class="search-card__title">' + highlight(e.title || e.url, terms) + '</h3>' +
          (e.description ? '<p class="search-card__text">' + highlight(e.description, terms) + '</p>' : '') +
          '<span class="search-card__url">/' + escapeHtml(e.url) + '</span>' +
        '</div>';
      frag.appendChild(a);
    });
    grid.appendChild(frag);
  }

  function tokenize(q) {
    return q.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 8);
  }

  function performSearch(index, query) {
    if (!query) return [];
    var terms = tokenize(query);
    var scored = [];
    for (var i = 0; i < index.length; i++) {
      var s = scoreEntry(index[i], terms);
      if (s > 0) scored.push({ s: s, e: index[i] });
    }
    scored.sort(function (a, b) { return b.s - a.s; });
    return scored.map(function (x) { return x.e; });
  }

  var initialQuery = getQuery();
  if (input && initialQuery) input.value = initialQuery;
  if (sub && initialQuery) sub.style.display = 'none';

  // Loading state
  if (initialQuery) {
    meta.hidden = false;
    meta.textContent = 'Идёт поиск…';
  }

  fetch(INDEX_URL, { credentials: 'same-origin' })
    .then(function (r) { return r.json(); })
    .then(function (index) {
      var q = initialQuery;
      var results = performSearch(index, q);
      render(results, q, tokenize(q));

      // Live re-search after page is loaded (debounced)
      if (input) {
        var t = null;
        input.addEventListener('input', function () {
          clearTimeout(t);
          t = setTimeout(function () {
            var q2 = input.value.trim();
            var url = new URL(window.location.href);
            if (q2) url.searchParams.set('s', q2); else url.searchParams.delete('s');
            window.history.replaceState(null, '', url.toString());
            render(performSearch(index, q2), q2, tokenize(q2));
            if (sub) sub.style.display = q2 ? 'none' : '';
          }, 180);
        });
      }
    })
    .catch(function (err) {
      console.error('Search index load error', err);
      meta.hidden = false;
      meta.textContent = 'Не удалось загрузить поисковый индекс. Попробуйте позже.';
    });
})();
