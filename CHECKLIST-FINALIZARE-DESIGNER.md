# Checklist Finalizare în Webflow Designer

## ✅ Ce este deja implementat (Nu mai trebuie făcut)

### Pagina Vinuri
- ✅ Pagină creată cu slug `/vinuri`
- ✅ Meta Title și Description configurate
- ✅ H1 "Vinurile Noastre" adăugat
- ✅ **Collection List Wine Brands există** (verificat)
- ✅ Structura brand-section în Collection Item (toate elementele create)
- ✅ Stiluri CSS create și aplicate (7 stiluri)
- ✅ **Embed HTML pentru Brand Color adăugat** (verificat)
- ✅ Responsive breakpoints configurate (small și medium)
- ✅ Hover state pentru brand-button adăugat

### Wine Brands Template
- ✅ Structura brand-page-header creată
- ✅ Structura wine-item creată cu toate elementele
- ✅ **Collection List Wine Products există** (verificat)
- ✅ Structura wine-item în Collection Item (toate elementele create)
- ✅ Stiluri CSS create și aplicate (9 stiluri)
- ✅ Meta tags configurate cu field bindings
- ✅ Responsive breakpoints configurate (small și medium)

---

## 🔧 Ce trebuie făcut în Designer (Quick Checklist)

### Pagina Vinuri - Verificări și Finalizări

**Collection List Wine Brands:**
- [ ] Verifică că Collection List este conectat la colecția "Wine Brands"
- [ ] Verifică Settings > Sort Order: după `display-order` crescător
- [ ] Verifică Settings > Layout: 1 column (vertical scroll)

**Legare elemente la CMS (în Collection Item):**
- [ ] **brand-image** (Image) → Bind to CMS > Wine Brands > `brand-logo` (sau `bottle-image` dacă lipsește logo)
- [ ] **brand-title** (Heading H2) → Bind to CMS > Wine Brands > `name`
- [ ] **brand-desc** (RichText) → Bind to CMS > Wine Brands > `brand-description`
- [ ] **brand-button** (Link) → Link Settings > Collection Page > Wine Brands > Current Item

**Embed HTML Brand Color (verificat există):**
- [ ] Verifică că Embed HTML în brand-bg conține: `.brand-bg { background-color: [Field: Brand Color]; }`
- [ ] Dacă lipsește, adaugă Embed HTML în brand-bg cu codul de mai sus

**Preview și Testare:**
- [ ] Collection List > Preview Mode
- [ ] Verifică că toate brandurile apar (Străbun, Capidava, Cuvee, IceWine, BIB)
- [ ] Verifică că fiecare brand are culoarea corectă (Brand Color)
- [ ] Verifică că butonul "Explorează" duce la pagina corectă

---

### Wine Brands Template - Verificări și Finalizări

**Collection List Wine Products:**
- [ ] Verifică că Collection List este conectat la colecția "Wine Products"
- [ ] Verifică Settings > Filter: `Brand` (Reference) equals `Current Wine Brands`
- [ ] Verifică Settings > Sort Order: alfabetic după `name` sau după preferință
- [ ] Verifică Settings > Layout: 1 column (vertical scroll)

**Legare elemente brand-page-header la CMS:**
- [ ] **brand-page-title** (H1) → Bind to CMS > Wine Brands (Current Item) > `name`
- [ ] **brand-page-tagline** (Paragraph) → Bind to CMS > Wine Brands > `brand-tagline`
- [ ] **brand-bg** (în brand-page-header) → Adaugă Embed HTML cu Brand Color (similar cu pagina Vinuri)

**Legare elemente wine-item la CMS (în Collection Item):**
- [ ] **wine-image** (Image) → Bind to CMS > Wine Products > `bottle-image`
- [ ] **wine-title** (Heading H3) → Bind to CMS > Wine Products > `name`
- [ ] **wine-desc** (RichText) → Bind to CMS > Wine Products > `short-description` (sau `tasting-notes` dacă lipsește)
- [ ] **wine-meta** (TextBlock) → Creează text combinat:
  - Adaugă elemente Text separate pentru: `{Wine Type} • {Wine Style} • {Volume} • {Alcohol Content}%`
  - Sau creează un Text Block cu combinație manuală a câmpurilor
- [ ] **wine-award** (TextBlock) → Bind to CMS > Wine Products > `highest-award`

**Conditional Visibility pentru wine-award:**
- [ ] Selectează elementul wine-award (TextBlock)
- [ ] Element Settings > Conditional Visibility > Add Rule
- [ ] Rule: `award-winner` equals `On` (sau `true`)
- [ ] Salvează - acum badge-ul apare doar pentru vinurile cu premii

**Preview și Testare:**
- [ ] Collection List > Preview Mode
- [ ] Selectează un brand (ex: Străbun)
- [ ] Verifică că header-ul afișează numele și tagline-ul brandului corect
- [ ] Verifică că sunt listate doar vinurile acelui brand (filtru funcționează)
- [ ] Verifică că wine-award apare doar pentru vinurile cu `award-winner = true`
- [ ] Verifică că wine-meta afișează corect type • style • volume • alcool

---

### Cod Custom - Adăugare

**Pagina Vinuri:**
- [ ] Page Settings > Custom Code > Inside <head> Tag
  - [ ] Adaugă CSS smooth scroll (vezi `webflow-custom-code.md`)
- [ ] Page Settings > Custom Code > Before </body> Tag
  - [ ] Adaugă JavaScript fade-in animations (vezi `webflow-custom-code.md`)

**Wine Brands Template:**
- [ ] Page Settings > Custom Code > Before </body> Tag
  - [ ] Adaugă JavaScript fade-in animations pentru wine items (vezi `webflow-custom-code.md`)

**Notă:** Codul complet este în `webflow-custom-code.md`

---

### Verificare Finală Completă

**Design și Layout:**
- [ ] Pagina Vinuri arată bine pe desktop (secțiuni full-height)
- [ ] Pagina Vinuri arată bine pe tablet (medium breakpoint)
- [ ] Pagina Vinuri arată bine pe mobile (layout vertical)
- [ ] Wine Brands Template arată bine pe toate device-urile
- [ ] Textul este lizibil pe toate fundalurile colorate (contrast bun)

**Funcționalități:**
- [ ] Butoanele "Explorează" duc la paginile corecte `/detail_wine-brand/{slug}`
- [ ] Wine Brands Template afișează doar vinurile brandului selectat (filtru funcționează)
- [ ] Responsive design funcționează corect (layout se adaptează)
- [ ] Smooth scroll funcționează (dacă codul a fost adăugat)
- [ ] Animations fade-in funcționează (dacă codul a fost adăugat)

**CMS și Conținut:**
- [ ] Toate brandurile apar pe pagina Vinuri (Străbun, Capidava, Cuvee, IceWine, BIB)
- [ ] Fiecare brand are culoarea corectă (Brand Color)
- [ ] Imagini brand se afișează corect (brand-logo sau fallback)
- [ ] Textul brand apare corect (name, description)
- [ ] Wine items apar corect cu toate detaliile (imagine, nume, descriere, meta, award)

**SEO:**
- [ ] Meta titles unice pentru fiecare pagină
- [ ] Meta descriptions complete
- [ ] Field bindings funcționează (titles și descriptions se actualizează dinamic)

---

## 📝 Element IDs de Referință

### Pagina Vinuri

**Section**: `60685110-764c-e59d-a76c-0b752a90ac89`
- **H1**: `798fa942-c894-5844-6098-036868ad0781`
- **Collection List**: `e1909d33-40e2-f78d-41b0-9c313b40dc1d` (DynamoList)
- **Collection Item**: `e1909d33-40e2-f78d-41b0-9c313b40dc1e` (DynamoItem)
  - **brand-section**: `c02f0c88-17cb-671d-56af-4c5038e68c62`
    - **brand-bg**: `c02f0c88-17cb-671d-56af-4c5038e68c63`
    - **brand-image**: `c02f0c88-17cb-671d-56af-4c5038e68c66`
    - **brand-content**: `c02f0c88-17cb-671d-56af-4c5038e68c67`
      - **brand-title**: `c02f0c88-17cb-671d-56af-4c5038e68c68`
      - **brand-desc**: `2e098dd2-6ded-05e8-75b9-bc4826a01468`
      - **brand-button**: `c02f0c88-17cb-671d-56af-4c5038e68c6c`

### Wine Brands Template

**brand-page-header**: `4e37fe8a-2f39-3430-9d49-fc6e9f2a4648`
- **brand-bg**: `a008df06-7fc4-58c8-d843-e8c503a09edf`
- **brand-page-title**: `7aea282a-3e70-3572-cc18-8837ef51434a`
- **brand-page-tagline**: `96fbd506-6495-9c07-22c3-0cbe9cbcd166`

**Collection List Wine Products**: `eb7c085d-c7ee-f47f-b564-0e473f98e23c` (DynamoList)
- **Collection Item**: `eb7c085d-c7ee-f47f-b564-0e473f98e23d` (DynamoItem)
  - **wine-item**: `9b7833fc-51e1-d74f-0623-042055cf6681`
    - **wine-image**: `9b7833fc-51e1-d74f-0623-042055cf6682`
    - **wine-info**: `9b7833fc-51e1-d74f-0623-042055cf6683`
      - **wine-title**: `9b7833fc-51e1-d74f-0623-042055cf6684`
      - **wine-desc**: `02745792-ede2-9cd1-4185-5b824dec5c2a` (RichText)
      - **wine-meta**: `9b7833fc-51e1-d74f-0623-042055cf6688`
      - **wine-award**: `9b7833fc-51e1-d74f-0623-042055cf668a`

---

## 🎨 Stiluri Disponibile

**Pagina Vinuri:**
- `brand-section` - Container principal brand
- `brand-bg` - Background Brand Color
- `brand-image` - Imagine sticlă
- `brand-content` - Container text
- `brand-title` - Titlu brand
- `brand-desc` - Descriere brand
- `brand-button` - Buton CTA (cu hover state)

**Wine Brands Template:**
- `brand-page-header` - Header pagina brand
- `brand-page-title` - H1 titlu brand
- `brand-page-tagline` - Tagline brand
- `wine-item` - Container vin
- `wine-image` - Imagine sticlă vin
- `wine-info` - Container info vin
- `wine-title` - Titlu vin
- `wine-desc` - Descriere vin
- `wine-meta` - Meta info (type • style • volume • alcool)
- `wine-award` - Badge premiu

**Utilitare (disponibile pentru folosire):**
- `wine-list-container` - Container pentru listă vinuri (max-width 1200px)
- `brand-page-intro` - Stil pentru introducere (opacity 0.9)

---

## ⚡ Quick Tips pentru Designer

1. **Pentru a găsi elementele rapid:**
   - Folosește Navigator panel în Webflow
   - Caută după clase CSS (ex: `.brand-section`)
   - Sau folosește element IDs de mai sus

2. **Pentru a lega elemente la CMS:**
   - Selectează elementul
   - Element Settings (panoul din dreapta)
   - "Bind to CMS" sau "Add Field"
   - Selectează colecția și câmpul

3. **Pentru Conditional Visibility:**
   - Selectează elementul wine-award
   - Element Settings > Conditional Visibility
   - Add Rule > Wine Products > `award-winner` equals `On`

4. **Pentru Embed HTML:**
   - Drag element "Embed" în Designer
   - Intră în Embed și apasă "Add Field"
   - Selectează "Brand Color"
   - Scrie codul CSS în jurul field binding-ului

5. **Pentru Collection List Setup:**
   - Selectează Collection List
   - Settings panel (din dreapta)
   - Data Source > Selectează colecția
   - Filter > Add Filter > Configurează
   - Sort Order > Selectează câmpul și ordinea

---

## 📚 Documentație Disponibilă

1. **`webflow-custom-code.md`** - Cod JavaScript și CSS complet pentru Page Settings
2. **`INSTRUCTIUNI-FINALIZARE-DESIGNER.md`** - Pași detaliați pas cu pas
3. **`STATUS-IMPLEMENTARE.md`** - Status verificat al implementării
4. **`CHECKLIST-FINALIZARE-DESIGNER.md`** - Acest document (checklist rapid)

---

**Timp estimat pentru finalizare în Designer: 30-60 minute**

**Toate elementele și stilurile sunt pregătite. Rămâne doar conectarea la CMS și verificarea finală.**

