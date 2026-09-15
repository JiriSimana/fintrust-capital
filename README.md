# FinTrust Capital — web

Druhý web skupiny FinTrust — **nebankovní financování proti zástavě nemovitosti**.
Design systém převzatý z webu FinTrust Reality (stejné fonty, barvy, tlačítka, karty, spacing).
Statický web bez build kroku, nasazený přes Vercel z větve `main`.

## Klíčový princip
**Nejsme banka — vše jde přes osobního poradce.** Žádné online schválení naslepo.
Každá poptávka vede na kontakt s poradcem.

## Spuštění lokálního náhledu
V kořeni repozitáře:
```bash
python3 -m http.server 8081
```
Otevřete **http://localhost:8081**.

## Struktura
| Stránka | Soubor |
|---|---|
| Domů (one-page) | `index.html` |
| Zástava nemovitosti | `zastava-nemovitosti.html` |
| Výkup nemovitostí | `vykup-nemovitosti.html` |
| Konsolidace | `konsolidace.html` |
| Financování pro podnikatele | `financovani-podnikatele.html` |
| Zásady ochrany osobních údajů | `zasady-ochrany-osobnich-udaju.html` |

- Hlavička/patička: `js/components.js` (název sub-brandu **Capital** je na jednom místě — `BRAND.sub`).
- Interakce: `js/app.js` (animace, formulář) + `js/capital.js` (kalkulačka, FAQ, GDPR brána).
- Design: `css/style.css`.

## Firemní údaje — vyplňují se na jednom místě
V `js/components.js` je objekt `COMPANY`:

```js
var COMPANY = {
  entity: "",        // obchodní firma, např. „FinTrust Capital s.r.o."
  ico: "",           // IČO
  seat: "",          // sídlo
  email: "",         // veřejný kontakt + adresa, kam chodí poptávky
  phone: "",         // veřejný telefon, např. „+420 777 000 000"
  formEndpoint: ""   // volitelně URL služby pro příjem formulářů (Formspree, Web3Forms…)
};
```

Údaje se propíšou do patičky, sekce Kontakt, Zásad ochrany osobních údajů i do formuláře.
**Prázdná položka se na webu vůbec nezobrazí.**

## Poptávkový formulář
Kam poptávka odejde, určuje `COMPANY`:
1. je-li vyplněn `formEndpoint` → odešle se tam (POST, JSON),
2. jinak je-li vyplněn `email` → otevře se e-mailový klient s předvyplněnou poptávkou,
3. jinak formulář poctivě oznámí, že ho nelze odeslat (dříve falešně hlásil „Odesláno ✓").

## Kalkulačka
Ilustrativní měsíční splátka z orientační úrokové sazby dle typu nemovitosti
(byt 12 %, rodinný dům 12,5 %, komerční objekt 13 %, pozemek 14 % p. a.).
Počítá úrok z celé jistiny po celou dobu splatnosti — u dlouhé splatnosti tak vychází
výrazně výš než standardní anuitní splátka při stejné sazbě. Nezobrazuje RPSN.
Od 10 000 000 Kč zobrazí „Individuální".
