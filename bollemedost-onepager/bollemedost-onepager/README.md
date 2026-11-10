# Bolleindekset – datadrevet one-pager

En responsiv one-pager om offentligt annoncerede priser på bolle med ost hos seks caféer i Københavnsområdet.

## Lokalt
Åbn `index.html` i browseren, eller brug Live Server i VS Code. Projektet kræver ingen installation eller backend.

## Offentliggørelse på GitHub Pages
1. Opret et offentligt GitHub-repository, og upload `index.html`, `styles.css` og `script.js` til repository-roden.
2. Åbn repositoryets **Settings → Pages**.
3. Vælg **Deploy from a branch**, branch `main`, folder `/ (root)`, og gem.
4. Når GitHub har publiceret siden, kan URL'en indsættes i PDF-dokumentationens felt "Link til løsning".

## Data
Priserne er aflæst fra virksomhedernes egne menukort den 10. november 2026. Den originale kilde for hver række er linket direkte fra hjemmesidens dataliste. Udvalget er ikke repræsentativt. Variation i størrelse, ost og service er ikke standardiseret.

## Pivottabel
Den interaktive pivottabel grupperer observationerne efter bydel eller prisniveau og beregner enten antal caféer eller gennemsnitspris. Den genereres i `script.js` uden eksterne biblioteker.

## Tilgængelighed
Responsivt layout, semantiske HTML-elementer, native select-felter, synlige fokusrammer, skip-link og reduceret animation ved systemindstilling. Diagrammets tal kan også aflæses i tabel og kildeoversigt.
