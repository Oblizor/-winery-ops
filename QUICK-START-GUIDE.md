# Quick Start Guide - Finalizare Webflow Designer

## 🚀 Start Rapid (5 minute)

### 1. Deschide Webflow Designer

[Launch Webflow Designer App](https://wine-cellar-e16575.design.webflow.com?app=dc8209c65e3ec02254d15275ca056539c89f6d15741893a0adf29ad6f381eb99)

### 2. Pagina Vinuri - Legare CMS (3 minute)

1. **Selectează Collection List Wine Brands** (DynamoList în Navigator)
   - Verifică: Settings > Data Source = "Wine Brands"
   - Verifică: Sort Order = `display-order` crescător

2. **Intră în Collection Item** (prima instanță)
   - **brand-image**: Click > Element Settings > Bind to CMS > Wine Brands > `brand-logo`
   - **brand-title**: Click > Bind to CMS > Wine Brands > `name`
   - **brand-desc**: Click > Bind to CMS > Wine Brands > `brand-description`
   - **brand-button**: Click > Link Settings > Collection Page > Wine Brands > Current Item

3. **Preview Mode** - Verifică că brandurile apar corect

### 3. Wine Brands Template - Legare CMS (5 minute)

1. **brand-page-header:**
   - **brand-page-title**: Bind to CMS > Wine Brands > `name`
   - **brand-page-tagline**: Bind to CMS > Wine Brands > `brand-tagline`

2. **Collection List Wine Products:**
   - Verifică: Settings > Data Source = "Wine Products"
   - Verifică: Filter = `Brand` equals `Current Wine Brands`

3. **Intră în Collection Item:**
   - **wine-image**: Bind to CMS > Wine Products > `bottle-image`
   - **wine-title**: Bind to CMS > Wine Products > `name`
   - **wine-desc**: Bind to CMS > Wine Products > `short-description` (sau `tasting-notes`)
   - **wine-award**: Bind to CMS > Wine Products > `highest-award`
   - **wine-award**: Conditional Visibility > `award-winner` equals `On`

4. **wine-meta** (text combinat):
   - Creează Text Block cu: `{Wine Type} • {Wine Style} • {Volume} • {Alcohol Content}%`
   - Sau creează elemente separate legate la fiecare câmp

5. **Preview Mode** - Selectează un brand și verifică vinurile

### 4. Adaugă Cod Custom (2 minute)

**Pagina Vinuri:**
- Page Settings > Custom Code > Inside <head> Tag > Adaugă CSS din `webflow-custom-code.md`
- Page Settings > Custom Code > Before </body> Tag > Adaugă JS din `webflow-custom-code.md`

**Wine Brands Template:**
- Page Settings > Custom Code > Before </body> Tag > Adaugă JS din `webflow-custom-code.md`

---

## ✅ Verificare Rapidă (2 minute)

- [ ] Pagina Vinuri afișează toate brandurile
- [ ] Wine Brands Template afișează doar vinurile brandului
- [ ] Butoanele duc la paginile corecte
- [ ] Responsive funcționează (testează pe mobile preview)
- [ ] Textul este lizibil pe fundaluri colorate

**Gata! 🎉**

---

## 📖 Pentru Detalii Complete

- Vezi `CHECKLIST-FINALIZARE-DESIGNER.md` pentru checklist complet
- Vezi `INSTRUCTIUNI-FINALIZARE-DESIGNER.md` pentru pași detaliați
- Vezi `webflow-custom-code.md` pentru codul complet

