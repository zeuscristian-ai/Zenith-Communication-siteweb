# Groupe Zenith — site React
Par Zeus Cristian

## Structure

```text
.
├── src/
│   ├── components/         # Une section React par fichier
│   ├── data/content.js     # Textes, projets et services
│   ├── styles/global.css   # Direction artistique et responsive
│   ├── App.jsx             # Composition de la page
│   └── main.jsx            # Point d’entrée React
├── public/
│   ├── images/             # Images et vidéos
│   ├── fonts/              # Polices du site
│   └── vendor/             # Polices externes locales
├── docs/
│   ├── legacy-index.html   # Ancienne page compilée
│   ├── legacy-assets/      # Ancien bundle CSS/JavaScript
│   ├── legacy-api/         # Anciennes données hors ligne
│   └── legacy-scripts/     # Ancien script de traduction
├── PRODUCT.md              # Positionnement de Zenith
└── DESIGN.md               # Système visuel
```

## Lancer le site

Installer les dépendances puis démarrer le serveur :

```powershell
npm install
npm run dev
```

Puis ouvrir <http://127.0.0.1:5173/>.
