/* =========================================================
   FinTrust Capital — page interactions
   • Orientační kalkulačka (jen ilustrativní, ŽÁDNÉ sazby)
   • FAQ accordion
   • GDPR gate na formuláři poptávky
   ========================================================= */
(function () {
  "use strict";

  var fmt = function (n) {
    return Math.round(n).toLocaleString("cs-CZ").replace(/ /g, " ") + " Kč";
  };

  /* ---------- ORIENTAČNÍ KALKULAČKA ----------
     Čistě ilustrativní měsíční splátka počítaná z jedné úrokové sazby (od cca 12 % p.a.).
     Nezobrazuje RPSN. Zástava vždy formou nemovitosti — liší se jen typ nemovitosti. */
  var NEMOVITOST = {
    byt:      { label: "Byt", rate: 0.12 },
    dum:      { label: "Rodinný dům", rate: 0.125 },
    pozemek:  { label: "Pozemek", rate: 0.14 },
    komercni: { label: "Komerční objekt", rate: 0.13 },
  };

  var MAX_AMOUNT = 10000000;

  function formatSplatnost(M) {
    if (M < 12) return M + (M === 1 ? " měsíc" : M < 5 ? " měsíce" : " měsíců");
    var years = Math.floor(M / 12);
    var rest = M % 12;
    var out = years + (years === 1 ? " rok" : years < 5 ? " roky" : " let");
    if (rest > 0) out += " " + rest + (rest === 1 ? " měsíc" : rest < 5 ? " měsíce" : " měsíců");
    return out;
  }

  // Aktualizuje CSS proměnnou --fill na range inputu, aby se ukazatel (track) hýbal s kuličkou.
  function syncRangeFill(el) {
    var min = parseFloat(el.min) || 0;
    var max = parseFloat(el.max) || 100;
    var val = parseFloat(el.value);
    var pct = max > min ? ((val - min) / (max - min)) * 100 : 0;
    el.style.setProperty("--fill", pct + "%");
  }

  function initCalculator() {
    var root = document.getElementById("calc");
    if (!root) return;
    var amount = document.getElementById("calcAmount");
    var amountOut = document.getElementById("calcAmountOut");
    var months = document.getElementById("calcMonths");
    var monthsOut = document.getElementById("calcMonthsOut");
    var typeSel = document.getElementById("calcType");
    var out = document.getElementById("calcResult");

    function update() {
      var A = parseInt(amount.value, 10);
      var M = parseInt(months.value, 10);
      var t = NEMOVITOST[typeSel.value] || NEMOVITOST.byt;

      syncRangeFill(amount);
      syncRangeFill(months);

      monthsOut.textContent = formatSplatnost(M);

      var isMax = A >= MAX_AMOUNT;
      amountOut.textContent = isMax ? "10 000 000 Kč a víc" : fmt(A);

      if (isMax) {
        out.innerHTML =
          '<span class="calc__reslabel">Požadovaná částka</span>' +
          '<span class="calc__resrange">Individuální</span>' +
          '<span class="calc__resnote">Nad 10 000 000 Kč posuzujeme každou žádost individuálně. ' +
          "<b>Nabídku vám připraví váš poradce.</b></span>" +
          '<a href="#poptavka" class="btn btn--gold btn--block calc__cta" data-cursor data-magnetic>Chci nezávaznou nabídku od poradce</a>';
        if (window.FTR && FTR.enhance) FTR.enhance(out);
        return;
      }

      // ilustrativní měsíční splátka: jistina/splatnost + orientační úrok (od t.rate ročně)
      var base = A / M;
      var splatka = base + A * (t.rate / 12);
      var round = function (x) { return Math.round(x / 100) * 100; };

      out.innerHTML =
        '<span class="calc__reslabel">Orientační měsíční splátka</span>' +
        '<span class="calc__resrange">od ' + fmt(round(splatka)) + "</span>" +
        '<span class="calc__resnote">Pouze ilustrativní výpočet (úrok od ' + String(Math.round(t.rate * 1000) / 10).replace(".", ",") + ' % ročně) — nejde o nabídku ani konkrétní podmínky. ' +
        "<b>Přesnou nabídku vám připraví váš poradce.</b></span>" +
        '<a href="#poptavka" class="btn btn--gold btn--block calc__cta" data-cursor data-magnetic>Chci nezávaznou nabídku od poradce</a>';

      if (window.FTR && FTR.enhance) FTR.enhance(out);
    }

    [amount, months, typeSel].forEach(function (el) {
      el.addEventListener("input", update);
      el.addEventListener("change", update);
    });
    update();
  }

  /* ---------- FAQ ACCORDION ---------- */
  function initFaq() {
    var items = document.querySelectorAll(".faq__item");
    if (!items.length) return;
    items.forEach(function (item) {
      var btn = item.querySelector(".faq__q");
      var panel = item.querySelector(".faq__a");
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", open);
        panel.style.maxHeight = open ? panel.scrollHeight + "px" : "";
      });
    });
  }

  /* ---------- GDPR gate ---------- */
  function initGdpr() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      var gdpr = document.getElementById("cgdpr");
      if (gdpr && !gdpr.checked) {
        e.preventDefault();
        e.stopImmediatePropagation(); // zablokuj generický handler v app.js
        var msg = document.getElementById("formMsg");
        if (msg) msg.textContent = "Pro odeslání potvrďte prosím souhlas se zpracováním údajů.";
        gdpr.focus();
      }
    }, true); // capture -> běží před app.js
  }

  function start() { initCalculator(); initFaq(); initGdpr(); }
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
