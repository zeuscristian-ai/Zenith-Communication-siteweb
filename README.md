# Zenith Communication — base du site

Cette base contient une copie statique compilée du site de référence. Elle a été
réorganisée pour faciliter son adaptation au projet Zenith Communication.

## Structure

```text
.
├── index.html              # Page principale
├── assets/
│   ├── css/site.css        # Styles compilés
│   ├── js/site.js          # Application React compilée
│   └── fonts/              # Polices propres au site
├── images/
│   ├── hero/               # Images principales
│   ├── case-studies/       # Projets et réalisations
│   ├── logos/              # Logos clients
│   ├── service-examples/   # Visuels des services
│   ├── journal/            # Images des articles
│   └── videos/             # Vidéos
├── api/                    # Données JSON capturées pour le mode hors ligne
├── vendor/                 # Ressources de fournisseurs externes
└── docs/                   # Documentation de la copie initiale
```

## Lancer le site

Depuis la racine du projet :

```powershell
python -m http.server 8001 --bind 127.0.0.1
```

Puis ouvrir <http://127.0.0.1:8001/>.

## Traduction française

La traduction de l’interface est automatisée dans :

```text
scripts/translate-fr.mjs
```

Pour la réappliquer :

```powershell
node scripts/translate-fr.mjs
```

## Important

Le fichier `assets/js/site.js` est un bundle React déjà compilé : ce n'est pas le
code source React original. Les textes et les composants pourront être adaptés,
mais une reconstruction en vrais fichiers source sera plus confortable pour une
refonte importante.
