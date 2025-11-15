# Cod Custom JavaScript și CSS pentru Webflow

## CSS pentru Smooth Scroll

### Adăugare în Page Settings > Custom Code > Inside <head> Tag

```css
<style>
  html { 
    scroll-behavior: smooth; 
  }
  
  /* Responsive fine-tuning pentru pagină Vinuri */
  @media(max-width: 767px) {
    .brand-title { 
      font-size: 1.5rem; 
    }
    .brand-desc { 
      font-size: 0.95rem; 
    }
    .brand-page-title {
      font-size: 2rem;
    }
  }
</style>
```

## JavaScript pentru Pagina Vinuri

### Adăugare în Page Settings > Custom Code > Before </body> Tag (pagina Vinuri)

```javascript
<script>
  // Smooth scroll behavior și fade-in animations pentru brand sections
  document.addEventListener('DOMContentLoaded', function() {
    // Fade-in animation pentru brand sections la scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    // Aplică animation la brand sections
    document.querySelectorAll('.brand-section').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
      observer.observe(el);
    });
  });
</script>
```

## JavaScript pentru Wine Brands Template

### Adăugare în Page Settings > Custom Code > Before </body> Tag (Wine Brands Template)

```javascript
<script>
  // Fade-in animation pentru wine items la scroll
  document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    }, observerOptions);
    
    // Aplică animation la wine items
    document.querySelectorAll('.wine-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-20px)';
      el.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
      observer.observe(el);
    });
  });
</script>
```

## JavaScript pentru Dropdown Vintage (Opțional - Implementare Ulerioară)

### Adăugare în Page Settings > Custom Code > Before </body> Tag (Wine Product Detail Template)

```javascript
<script>
  // Dropdown vintage switching (dacă implementat)
  document.addEventListener('DOMContentLoaded', function() {
    const vintageSelects = document.querySelectorAll('.vintage-select');
    
    vintageSelects.forEach(select => {
      // Populare opțiuni dinamic (dacă nu sunt populate manual)
      const wineItem = select.closest('.wine-item');
      if (wineItem) {
        const years = Array.from(wineItem.querySelectorAll('.vintage-desc'))
          .map(desc => desc.getAttribute('data-year'))
          .filter(year => year)
          .sort((a, b) => b - a); // Sortare descrescătoare
        
        if (years.length > 0 && select.options.length === 0) {
          years.forEach(year => {
            const opt = document.createElement('option');
            opt.value = year;
            opt.textContent = year;
            select.appendChild(opt);
          });
        }
      }
      
      // Event listener pentru schimbare
      select.addEventListener('change', (e) => {
        const year = e.target.value;
        const wineItem = e.target.closest('.wine-item');
        
        if (!wineItem) return;
        
        // Ascunde toate descrierile vintage, arată doar cea selectată
        wineItem.querySelectorAll('.vintage-desc').forEach(descEl => {
          descEl.style.display = (descEl.getAttribute('data-year') === year) 
            ? 'block' 
            : 'none';
        });
      });
    });
  });
</script>
```

## JavaScript pentru Finsweet CMS Filter (Opțional - Dacă se implementează filtrare)

### Adăugare în Project Settings > Custom Code > Footer Code

```html
<script src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js"></script>
```

### Atribute HTML pentru filtrare (adăugate prin Embed în Designer):

**Pe containerul listei:**
```html
<div class="wine-list" fs-cmsfilter-element="list">
```

**Pe fiecare .wine-item (prin Embed):**
```html
<span fs-cmsfilter-field="Wine Type" fs-cmsfilter-value="[Field: Wine Type]" style="display:none;"></span>
```

**Butoane filtrare:**
```html
<button fs-cmsfilter-element="trigger" fs-cmsfilter-target="Wine Type" fs-cmsfilter-value="White">Albe</button>
<button fs-cmsfilter-element="trigger" fs-cmsfilter-target="Wine Type" fs-cmsfilter-value="Red">Roșii</button>
<button fs-cmsfilter-element="reset">Toate</button>
```

## CSS Custom Properties pentru Brand Color (Opțional)

### Adăugare prin Embed în .brand-page-header

```html
<div class="brand-page-header" style="--brand-color: [Field: Brand Color]; background-color: var(--brand-color);">
```

## Notă Importantă

- Codul CSS trebuie adăugat în Page Settings > Custom Code > Inside <head> Tag pentru fiecare pagină
- Codul JavaScript trebuie adăugat în Page Settings > Custom Code > Before </body> Tag
- Pentru cod global (smooth scroll CSS), poate fi adăugat în Project Settings > Custom Code > Head Code

