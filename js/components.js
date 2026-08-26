/* =========================================================
   FinTrust Capital — shared header + footer
   Injected on every page. Set active item with <body data-page="…">.
   BRAND.sub is the ONLY place the sub-brand name lives — změna názvu
   (Capital -> cokoliv) se propíše všude odsud.
   ========================================================= */
(function () {
  "use strict";

  var BRAND = { name: "FinTrust", sub: "Capital" }; // <- snadno vyměnitelné

  var LOGO = '' +
    '<span class="logo" data-logo>' +
      '<img class="logo__wm" src="assets/fintrust-wordmark-inverted.svg" alt="FinTrust" width="356" height="83" />' +
      '<span class="logo__sub">' + BRAND.sub + "</span>" +
    "</span>";

  // one-page anchors; from subpages they point back to index.html#…
  var onHome = (document.body.getAttribute("data-page") || "") === "domu";
  var HREF = function (anchor) { return (onHome ? "" : "index.html") + "#" + anchor; };

  var LINKS = [
    { key: "sluzby", anchor: "sluzby", label: "Služby" },
    { key: "parametry", anchor: "parametry", label: "Parametry" },
    { key: "kalkulacka", anchor: "kalkulacka", label: "Kalkulačka" },
    { key: "jak-to-funguje", anchor: "jak-to-funguje", label: "Jak to funguje" },
    { key: "faq", anchor: "faq", label: "FAQ" },
    { key: "kontakt", anchor: "kontakt", label: "Kontakt" },
  ];

  function navLinks(mobile) {
    return LINKS.map(function (l, i) {
      if (mobile) return '<a href="' + HREF(l.anchor) + '" class="menu__link"><i>0' + (i + 1) + "</i> " + l.label + "</a>";
      return '<a href="' + HREF(l.anchor) + '" data-cursor>' + l.label + "</a>";
    }).join("");
  }

  function header() {
    return '' +
      '<header class="nav" id="nav">' +
        '<a href="index.html" class="nav__logo" data-cursor aria-label="' + BRAND.name + " " + BRAND.sub + ' — domů">' + LOGO + "</a>" +
        '<nav class="nav__links" aria-label="Hlavní navigace">' + navLinks(false) + "</nav>" +
        '<div class="nav__right">' +
          '<span class="nav__loc">Nebankovní financování</span>' +
          '<a href="' + HREF("poptavka") + '" class="btn btn--gold btn--sm" data-cursor data-magnetic>Nezávazná poptávka</a>' +
          '<button class="nav__burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>' +
        "</div>" +
      "</header>" +
      '<div class="menu" id="menu" aria-hidden="true">' +
        '<nav class="menu__links">' + navLinks(true) + "</nav>" +
        '<div class="menu__foot">' +
          '<a href="' + HREF("poptavka") + '" class="btn btn--gold">Nezávazná poptávka</a>' +
          "<p>Součást skupiny <a href=\"https://fintg.cz\" target=\"_blank\" rel=\"noopener\">FinTrust</a> · vše přes osobního poradce</p>" +
        "</div>" +
      "</div>";
  }

  function footer() {
    var y = new Date().getFullYear();
    return '' +
      '<footer class="footer footer--legal">' +
        '<div class="footer__top">' +
          '<div class="footer__brand">' +
            '<a href="index.html" class="logo logo--footer" data-logo data-cursor>' + LOGO + "</a>" +
            '<p class="footer__tag">Prémiové zajištěné financování.<br>Vždy s osobním poradcem.</p>' +
          "</div>" +
          '<nav class="footer__nav" aria-label="Patička">' +
            '<div><h4>Služby</h4>' +
              '<a href="zastava-nemovitosti.html" data-cursor>Zástava nemovitosti</a>' +
              '<a href="vykup-nemovitosti.html" data-cursor>Výkup nemovitostí</a>' +
              '<a href="konsolidace.html" data-cursor>Konsolidace</a>' +
              '<a href="financovani-podnikatele.html" data-cursor>Financování pro podnikatele</a>' +
            "</div>" +
            '<div><h4>Web</h4>' +
              '<a href="' + HREF("parametry") + '" data-cursor>Parametry</a>' +
              '<a href="' + HREF("kalkulacka") + '" data-cursor>Kalkulačka</a>' +
              '<a href="' + HREF("jak-to-funguje") + '" data-cursor>Jak to funguje</a>' +
              '<a href="' + HREF("faq") + '" data-cursor>Časté dotazy</a>' +
            "</div>" +
            '<div><h4>Skupina FinTrust</h4>' +
              '<a href="https://fintg.cz" target="_blank" rel="noopener" data-cursor>FinTrust ↗</a>' +
              '<a href="https://fintg.cz" target="_blank" rel="noopener" data-cursor>Hypotéky ↗</a>' +
              '<a href="https://fintg.cz" target="_blank" rel="noopener" data-cursor>Pojištění ↗</a>' +
            "</div>" +
            '<div><h4>Kontakt</h4>' +
              '<a href="mailto:[DOPLNIT]" data-cursor>[DOPLNIT — e-mail]</a>' +
              '<a href="tel:[DOPLNIT]" data-cursor>[DOPLNIT — telefon]</a>' +
              '<span>Vše přes osobního poradce</span>' +
            "</div>" +
          "</nav>" +
        "</div>" +

        '<div class="legal">' +
          '<p class="legal__entity">Provozovatel: <b>[DOPLNÍ KLIENT — entita se zakládá]</b> · IČO: [DOPLNIT] · Sídlo: [DOPLNIT]</p>' +
          '<div class="legal__block">' +
            "<span class=\"legal__tag\">[PRÁVNÍ TEXT — DODÁ COMPLIANCE]</span>" +
            "<p>Zákonné informace o poskytovateli, oprávnění / licenci k poskytování spotřebitelského úvěru, reprezentativní příklad (RPSN, celková částka k úhradě) a povinná poučení doplní compliance před spuštěním. Tento web je pracovní návrh a neobsahuje závaznou nabídku.</p>" +
          "</div>" +
        "</div>" +

        '<div class="footer__bottom">' +
          "<span>© " + y + " " + BRAND.name + " " + BRAND.sub + " — součást skupiny FinTrust</span>" +
          '<span class="footer__made">Pracovní návrh · placeholdery k doplnění</span>' +
          '<a href="#top" class="footer__top-link" data-cursor data-magnetic>Nahoru ↑</a>' +
        "</div>" +
      "</footer>";
  }

  function inject() {
    if (!document.getElementById("scrollProgress")) {
      var chrome = document.createElement("div");
      chrome.innerHTML =
        '<div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>';
      document.body.insertBefore(chrome.firstChild, document.body.firstChild);
    }
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.innerHTML = header();
    if (f) f.innerHTML = footer();
  }

  inject();
  window.FTR = window.FTR || {};
})();
