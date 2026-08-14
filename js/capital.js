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
     Čistě ilustrativní rozpětí splátky. Nezobrazuje úrok/RPSN.
     Zástava vždy formou nemovitosti — liší se jen typ nemovitosti.
     Faktory jsou vědomě široké a orientační — přesné podmínky vždy poradce. */
  var NEMOVITOST = {
    byt:      { label: "Byt", lo: 0.011, hi: 0.018 },
    dum:      { label: "Rodinný dům", lo: 0.011, hi: 0.019 },
    pozemek:  { label: "Pozemek", lo: 0.013, hi: 0.021 },
    komercni: { label: "Komerční objekt", lo: 0.012, hi: 0.020 },
  };

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

      amountOut.textContent = fmt(A);
      monthsOut.textContent = M + (M === 1 ? " měsíc" : M < 5 ? " měsíce" : " měsíců");

      // ilustrativní rozpětí měsíční splátky
      var base = A / M;
      var lo = base + A * t.lo;
      var hi = base + A * t.hi;
      // zaokrouhlení na hezká čísla
      var round = function (x) { return Math.round(x / 100) * 100; };

      out.innerHTML =
        '<span class="calc__reslabel">Orientační měsíční splátka</span>' +
        '<span class="calc__resrange">' + fmt(round(lo)) + " – " + fmt(round(hi)) + "</span>" +
        '<span class="calc__resnote">Pouze ilustrativní výpočet — nejde o nabídku ani konkrétní podmínky. ' +
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
