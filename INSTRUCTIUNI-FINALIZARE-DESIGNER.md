# Instrucțiuni Finalizare în Webflow Designer

## Importante: Ce a fost implementat și ce rămâne de făcut

### ✅ Implementat prin API:

1. **Pagina Vinuri** creată cu structura completă:
   - H1 "Vinurile Noastre"
   - Structura brand-section cu toate elementele (brand-bg, brand-image, brand-content, brand-title, brand-desc, brand-button)
   - Stiluri CSS create și aplicate (brand-section, brand-image, brand-content, brand-title, brand-desc, brand-button)
   - Stilizări responsive pentru mobile

2. **Wine Brands Template** modificat:
   - Structura brand-page-header creată (brand-bg, brand-page-title, brand-page-tagline)
   - Structura wine-item creată (wine-image, wine-info cu wine-title, wine-desc, wine-meta, wine-award)
   - Stiluri CSS create și aplicate (brand-page-header, brand-page-title, brand-page-tagline, wine-item, wine-image, wine-info, wine-title, wine-desc, wine-meta, wine-award)
   - Meta tags configurate: `{Name} – Vinuri {Name} de la Crama Darie`
   - Stilizări responsive pentru mobile

3. **Cod custom JavaScript** documentat în `webflow-custom-code.md`

---

## 📋 Pași Finalizare în Designer

### 1. Pagina Vinuri - Collection List Wine Brands

**Pași:**
1. Deschide pagina "Vinuri" în Designer
2. Structura brand-section creată este în Block (element: 31089664-a828-73e3-8499-e7dddacb6855)
3. **Creează Collection List:**
   - Trage elementul "Collection List" pe pagină (în Section-ul existent, după H1)
   - Selectează colecția "Wine Brands"
   - Sursă: Wine Brands

4. **Configurează Collection List:**
   - Settings > Sort Order: după câmpul `display-order` crescător
   - Settings > Layout: 1 column (vertical scroll)

5. **Mută structura brand-section în Collection Item:**
   - Selectează Block-ul cu brand-section (element: 31089664-a828-73e3-8499-e7dddacb6855)
   - Copiază structura (toate elementele din interior: brand-bg, brand-image, brand-content)
   - Intră în Collection List > Collection Item (prima instanță)
   - Șterge conținutul default din Collection Item
   - Lipește structura brand-section

6. **Leagă elementele la câmpuri CMS:**
   - **brand-image (Image)**: Element Settings > Bind to CMS > Wine Brands > `brand-logo` (sau primul `bottle-image` din Wine Products dacă brand-logo lipsește)
   - **brand-title (Heading H2)**: Element Settings > Bind to CMS > Wine Brands > `name`
   - **brand-desc (TextBlock/RichText)**: Element Settings > Bind to CMS > Wine Brands > `brand-description`
   - **brand-button (Link)**: Element Settings > Link > Select Link > Collection Page > Wine Brands (Current Item)
     - Sau folosește "Current Wine Brands" din opțiuni
   - **brand-bg (DivBlock)**: Adaugă Embed HTML cu:
     ```html
     <style>
       .brand-bg {
         background-color: [Field: Brand Color];
       }
     </style>
     ```
     - Sau folosește style inline în div: `style="background-color: [Field: Brand Color];"`

7. **Verifică preview:** Collection List > Preview > Ar trebui să vezi toate brandurile (Străbun, Capidava, Cuvee, IceWine, BIB)

---

### 2. Wine Brands Template - Collection List Wine Products

**Pași:**
1. Deschide "Wine Brands Template" în Designer
2. Structura wine-item creată este în Section (element: 56a2a533-a193-fc4e-e52e-cad48bf1da37)

3. **Creează Collection List:**
   - Trage elementul "Collection List" în Section-ul existent (după brand-page-header)
   - Selectează colecția "Wine Products"
   - Sursă: Wine Products

4. **Configurează Collection List:**
   - Settings > Filter: `Brand` (Reference) equals `Current Wine Brands`
   - Settings > Sort Order: alfabetic după `name` (sau după preferință)
   - Settings > Layout: 1 column (vertical scroll)

5. **Mută structura wine-item în Collection Item:**
   - Selectează Section-ul cu wine-item (element: 56a2a533-a193-fc4e-e52e-cad48bf1da37)
   - Copiază structura (toate elementele din interior)
   - Intră în Collection List > Collection Item
   - Șterge conținutul default
   - Lipește structura wine-item (Block cu wine-image și wine-info)

6. **Leagă elementele la câmpuri CMS:**
   - **wine-image (Image)**: Element Settings > Bind to CMS > Wine Products > `bottle-image`
   - **wine-title (Heading H3)**: Element Settings > Bind to CMS > Wine Products > `name`
   - **wine-desc (TextBlock/RichText)**: 
     - Încearcă să legi la `short-description` (dacă există)
     - Dacă nu, leagă la `tasting-notes`
   - **wine-meta (TextBlock)**: 
     - Creează text manual combinând câmpuri: `{Wine Type} • {Wine Style} • {Volume} • {Alcohol Content}%`
     - Sau creează elemente separate legate la fiecare câmp
   - **wine-award (TextBlock)**: Element Settings > Bind to CMS > Wine Products > `highest-award`

7. **Configurează Conditional Visibility pentru wine-award:**
   - Selectează elementul wine-award (TextBlock cu highest-award)
   - Element Settings > Conditional Visibility
   - Add Rule: `award-winner` equals `On` (sau `true`)
   - Astfel, badge-ul de premiu apare doar pentru vinurile cu `award-winner = true`

8. **Leagă brand-page-title și brand-page-tagline:**
   - **brand-page-title (H1)**: Element Settings > Bind to CMS > Wine Brands (Current Item) > `name`
   - **brand-page-tagline (Paragraph)**: Element Settings > Bind to CMS > Wine Brands > `brand-tagline`
   - **brand-bg (în brand-page-header)**: Adaugă Embed HTML cu Brand Color (similar cu pagina Vinuri)

9. **Verifică preview:** 
   - Collection List > Preview > Selectează un brand (ex: Străbun)
   - Ar trebui să vezi doar vinurile acelui brand
   - Brand-page-header ar trebui să afișeze numele brandului și tagline-ul

---

### 3. Adăugare Cod Custom

**Pentru pagina Vinuri:**
1. Page Settings > Custom Code > Inside <head> Tag
   - Adaugă CSS pentru smooth scroll (vezi `webflow-custom-code.md`)

2. Page Settings > Custom Code > Before </body> Tag
   - Adaugă JavaScript pentru fade-in animations (vezi `webflow-custom-code.md`)

**Pentru Wine Brands Template:**
1. Page Settings > Custom Code > Before </body> Tag
   - Adaugă JavaScript pentru fade-in animations wine items (vezi `webflow-custom-code.md`)

---

### 4. Verificare Finală

**Checklist:**
- [ ] Pagina Vinuri afișează toate brandurile în ordinea corectă (Display Order: 1-5)
- [ ] Fiecare brand-section are background color dinamic (Brand Color)
- [ ] Imagini brand se afișează corect (brand-logo sau fallback)
- [ ] Butoanele "Explorează" duc la paginile corecte `/detail_wine-brand/{slug}`
- [ ] Wine Brands Template afișează header-ul brandului corect
- [ ] Wine Brands Template listează doar vinurile brandului selectat (filtru funcționează)
- [ ] Wine award badge apare doar pentru vinurile cu award-winner = true
- [ ] Responsive design funcționează pe mobile (layout vertical)
- [ ] Textul este lizibil pe fundaluri colorate (contrast bun)
- [ ] Smooth scroll și animations funcționează (dacă codul a fost adăugat)

---

### 5. Note Suplimentare

**Dacă brand-logo lipsește pentru un brand:**
- Folosește primul `bottle-image` din Wine Products asociate brandului
- Sau creează un fallback în Embed HTML care verifică dacă brand-logo există

**Dacă dorești filtrare interactivă:**
- Vezi secțiunea "JavaScript pentru Finsweet CMS Filter" din `webflow-custom-code.md`
- Include script-ul Finsweet în Footer Code (Project Settings)
- Adaugă atributele necesare pe elemente (fs-cmsfilter-element, etc.)

**Dropdown Vintage (Opțional):**
- Vezi secțiunea "JavaScript pentru Dropdown Vintage" din `webflow-custom-code.md`
- Necesită colecție Wine Vintages separată sau structură HTML specifică

---

## Structură Finală Pagină Vinuri

```
Section
  └─ H1 "Vinurile Noastre"
  └─ Collection List (Wine Brands)
      └─ Collection Item
          └─ DivBlock .brand-section
              ├─ DivBlock .brand-bg (background Brand Color dinamic)
              ├─ Image .brand-image (legat la brand-logo)
              └─ DivBlock .brand-content
                  ├─ Heading H2 .brand-title (legat la name)
                  ├─ TextBlock .brand-desc (legat la brand-description)
                  └─ Link .brand-button (link către detail_wine-brand)
```

## Structură Finală Wine Brands Template

```
Section .brand-page-header
  ├─ DivBlock .brand-bg (background Brand Color dinamic)
  ├─ Heading H1 .brand-page-title (legat la name)
  └─ Paragraph .brand-page-tagline (legat la brand-tagline)

Section
  └─ Collection List (Wine Products, filtrat Brand = Current)
      └─ Collection Item
          └─ DivBlock .wine-item
              ├─ Image .wine-image (legat la bottle-image)
              └─ DivBlock .wine-info
                  ├─ Heading H3 .wine-title (legat la name)
                  ├─ TextBlock .wine-desc (legat la short-description sau tasting-notes)
                  ├─ TextBlock .wine-meta (text combinat: type • style • volume • alcool)
                  └─ TextBlock .wine-award (legat la highest-award, conditional visibility)
```

---

**Toate elementele și stilurile sunt create și gata. Rămâne doar să fie conectate la CMS în Designer conform instrucțiunilor de mai sus.**

