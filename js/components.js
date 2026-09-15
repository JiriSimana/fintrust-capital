/* =========================================================
   FinTrust Capital — shared header + footer
   Injected on every page. Set active item with <body data-page="…">.
   BRAND.sub is the ONLY place the sub-brand name lives — změna názvu
   (Capital -> cokoliv) se propíše všude odsud.
   ========================================================= */
(function () {
  "use strict";

  var BRAND = { name: "FinTrust", sub: "Capital" }; // <- snadno vyměnitelné

  /* ---------------------------------------------------------
     FIREMNÍ ÚDAJE — JEDINÉ MÍSTO, KDE SE VYPLŇUJÍ.
     Propíšou se do patičky, sekce Kontakt, Zásad ochrany osobních
     údajů i do obsluhy formuláře. Prázdná položka se na webu
     vůbec nezobrazí (žádné „[DOPLNIT]").
       entity – obchodní firma provozovatele (např. „FinTrust Capital s.r.o.")
       ico    – IČO
       seat   – sídlo
       email  – veřejný kontakt; zároveň adresa, kam chodí poptávky
       phone  – veřejný telefon ve formátu +420 …
       formEndpoint – volitelně URL služby pro příjem formulářů
                      (Formspree, Web3Forms, vlastní API). Bez něj formulář
                      otevře e-mailového klienta s předvyplněnou poptávkou.
     --------------------------------------------------------- */
  var COMPANY = {
    entity: "",
    ico: "",
    seat: "",
    email: "",
    phone: "",
    formEndpoint: ""
  };
  window.FTC_COMPANY = COMPANY;

  var telHref = function (p) { return "tel:" + p.replace(/[^\d+]/g, ""); };

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
              (COMPANY.email ? '<a href="mailto:' + COMPANY.email + '" data-cursor>' + COMPANY.email + "</a>" : "") +
              (COMPANY.phone ? '<a href="' + telHref(COMPANY.phone) + '" data-cursor>' + COMPANY.phone + "</a>" : "") +
              '<a href="' + HREF("poptavka") + '" data-cursor>Nezávazná poptávka</a>' +
              '<span>Vše přes osobního poradce</span>' +
            "</div>" +
          "</nav>" +
        "</div>" +

        '<div class="legal">' +
          (COMPANY.entity
            ? '<p class="legal__entity">Provozovatel: <b>' + COMPANY.entity + "</b>" +
                (COMPANY.ico ? " · IČO: " + COMPANY.ico : "") +
                (COMPANY.seat ? " · Sídlo: " + COMPANY.seat : "") + "</p>"
            : "") +
          '<div class="legal__block">' +
            "<p>Informace uvedené na tomto webu mají orientační charakter a nepředstavují závaznou nabídku ani návrh na uzavření smlouvy. " +
            "Konkrétní podmínky financování — včetně úrokové sazby, RPSN, celkové částky k úhradě a všech poplatků — obdržíte v individuální nabídce " +
            "a ve smluvní dokumentaci před uzavřením smlouvy. Poskytnutí financování je vždy podmíněno individuálním posouzením. " +
            '<a href="zasady-ochrany-osobnich-udaju.html" data-cursor>Zásady ochrany osobních údajů</a></p>' +
          "</div>" +
        "</div>" +

        '<div class="footer__bottom">' +
          "<span>© " + y + " " + BRAND.name + " " + BRAND.sub + " — součást skupiny FinTrust</span>" +
          '<a href="zasady-ochrany-osobnich-udaju.html" class="footer__made" data-cursor>Ochrana osobních údajů</a>' +
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
    fillCompany();
  }

  // Háčky ve statickém HTML: [data-company="email|phone|entity|ico|seat"].
  // Blok [data-company-block] se schová, když příslušný údaj chybí.
  function fillCompany() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-company-block]"), function (b) {
      var key = b.getAttribute("data-company-block");
      if (key === "name") key = "entity";
      if (!COMPANY[key]) b.hidden = true;
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-company]"), function (el) {
      var key = el.getAttribute("data-company"), val = COMPANY[key];
      if (!val) return;
      el.textContent = val;
      if (el.tagName === "A") {
        if (key === "email") el.href = "mailto:" + val;
        if (key === "phone") el.href = telHref(val);
      }
    });
  }

  inject();
  window.FTR = window.FTR || {};
})();
