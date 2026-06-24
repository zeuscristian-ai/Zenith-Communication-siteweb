import { readFile, writeFile } from "node:fs/promises";

const files = [
  "index.html",
  "assets/js/site.js",
  "api/blog",
  "api/case-studies",
];

const phrases = new Map([
  ["View ", "Voir "],
  ["Unfold — Agency for the Intelligent Era", "Unfold — Agence de l’ère intelligente"],
  [
    "Unfold merges timeless design principles with intelligent systems to shape the next generation of brands.",
    "Unfold associe des principes de design intemporels à des systèmes intelligents pour façonner la prochaine génération de marques.",
  ],
  ["Agency for the Intelligent Era", "Agence de l’ère intelligente"],
  ["Shaping the next generation of brands.", "Nous façonnons la prochaine génération de marques."],
  ["Selected Works", "Projets sélectionnés"],
  ["View Project", "Voir le projet"],
  ["VIEW PROJECT", "VOIR LE PROJET"],
  ["View All →", "Tout voir →"],
  ["ALL PROJECTS", "TOUS LES PROJETS"],
  ["The Studio, Augmented.", "Le studio, augmenté."],
  [
    "We pioneered the integration of AI into every phase of the design process — not to replace craft, but to multiply it. More exploration, faster iteration, better outcomes.",
    "Nous intégrons l’IA à chaque étape du processus créatif, non pour remplacer le savoir-faire, mais pour l’amplifier. Plus d’exploration, des itérations plus rapides et de meilleurs résultats.",
  ],
  ["MORE CONCEPTS EXPLORED", "PLUS DE PISTES EXPLORÉES"],
  ["FASTER FROM BRIEF TO DELIVERY", "DU BRIEF À LA LIVRAISON, PLUS VITE"],
  ["MORE IMPACT", "PLUS D’IMPACT"],
  ["Every industry. One standard.", "Tous les secteurs. Une seule exigence."],
  ["Every industry.", "Tous les secteurs."],
  [
    "We bring deep domain expertise to the industries that are shaping the future — from blockchain protocols to healthcare systems.",
    "Nous mettons notre expertise au service des secteurs qui façonnent l’avenir, des protocoles blockchain aux systèmes de santé.",
  ],
  ["They grow up so fast", "Ils grandissent si vite"],
  [
    "We partner with companies early. Some of them go on to do incredible things.",
    "Nous accompagnons les entreprises dès leurs débuts. Certaines accomplissent ensuite des choses remarquables.",
  ],
  [
    "Strategy-first identities that communicate your brand's vision with precision and purpose.",
    "Des identités guidées par la stratégie, conçues pour exprimer votre vision avec précision et intention.",
  ],
  [
    "Thoughtful UX and beautiful UI that users love and businesses rely on.",
    "Une expérience utilisateur réfléchie et des interfaces soignées, appréciées des utilisateurs et utiles aux entreprises.",
  ],
  [
    "Custom visual language that speaks directly to your audience and sets you apart.",
    "Un langage visuel sur mesure qui parle à votre audience et vous distingue.",
  ],
  [
    "Your 24/7 sales representative — high-converting websites that work while you sleep.",
    "Votre commercial disponible 24 h/24 : des sites performants qui travaillent même pendant votre sommeil.",
  ],
  [
    "Extending your digital brand into the physical world with tactile precision.",
    "Nous prolongeons votre marque numérique dans le monde physique avec précision.",
  ],
  ["Have a project in mind?", "Vous avez un projet en tête ?"],
  ["The Studio, Augmented.", "Le studio, augmenté."],
  ["The Studio,", "Le studio,"],
  ["Augmented.", "augmenté."],
  ["FASTER FROM BRIEF TO DELIVERY", "DU BRIEF À LA LIVRAISON, PLUS VITE"],
  ["Faster from brief to delivery", "Du brief à la livraison, plus vite"],
  ["VIEW IDENTITÉ DE MARQUE →", "VOIR L’IDENTITÉ DE MARQUE →"],
  ["VIEW DESIGN PRODUIT →", "VOIR LE DESIGN PRODUIT →"],
  ["VIEW ILLUSTRATION →", "VOIR L’ILLUSTRATION →"],
  ["VIEW DESIGN WEB →", "VOIR LE DESIGN WEB →"],
  ["VIEW PRINT ET PACKAGING →", "VOIR LE PRINT ET PACKAGING →"],
  ["View Brand Design", "Voir l’identité de marque"],
  ["View Product Design", "Voir le design produit"],
  ["View Illustration", "Voir l’illustration"],
  ["View Web Design", "Voir le design web"],
  ["View Print & Packaging", "Voir le print et packaging"],
  ["View Identité de marque", "Voir l’identité de marque"],
  ["View Design produit", "Voir le design produit"],
  ["View Design web", "Voir le design web"],
  ["View Print et packaging", "Voir le print et packaging"],
  ["Willing to Refer", "Recommandation"],
  ["Acquired by Autodesk", "Racheté par Autodesk"],
  ["AI-powered VFX platform acquired by Autodesk, May 2024", "Plateforme VFX propulsée par l’IA, rachetée par Autodesk en mai 2024"],
  ["Acquired by Automattic for $125M", "Racheté par Automattic pour 125 M$"],
  ["Universal messaging app acquired by Automattic, April 2024", "Application de messagerie universelle rachetée par Automattic en avril 2024"],
  ["Acquired by Stripe", "Racheté par Stripe"],
  ["Web3 wallet infrastructure acquired by Stripe, June 2025", "Infrastructure de portefeuille Web3 rachetée par Stripe en juin 2025"],
  ["Raised $900M Series C", "Levée de 900 M$ en série C"],
  ["AI video generation platform valued at $4B+, backed by Amazon & a16z", "Plateforme de génération vidéo par IA valorisée à plus de 4 Md$, soutenue par Amazon et a16z"],
  ["$1B valuation — Series C", "Valorisation de 1 Md$, série C"],
  ["Restaurant tech platform reaches unicorn status, May 2025", "La plateforme technologique pour restaurants devient une licorne en mai 2025"],
  ["Raised $75M Series C", "Levée de 75 M$ en série C"],
  ["Workflow documentation platform valued at $1.3B, Nov 2025", "Plateforme de documentation des processus valorisée à 1,3 Md$ en novembre 2025"],
  ["$775M investment from Tether", "Investissement de 775 M$ par Tether"],
  ["Video platform went public via SPAC, major Tether investment Dec 2024", "Plateforme vidéo introduite en bourse via une SPAC, avec un investissement majeur de Tether en décembre 2024"],
  ["Raised $40M Series B", "Levée de 40 M$ en série B"],
  ["AI video platform backed by CRV, Sequoia, and Y Combinator", "Plateforme vidéo IA soutenue par CRV, Sequoia et Y Combinator"],
  [
    "\"Unfold doesn't just design interfaces. They architect the soul of the product. It's rare to see such restraint in a noisy world.\"",
    "« Unfold ne se contente pas de concevoir des interfaces. L’équipe façonne l’âme du produit avec une maîtrise rare dans un monde saturé. »",
  ],
  ["Unfold Named to Dribbble's Best Shots of the Year", "Unfold sélectionné parmi les meilleurs projets de l’année sur Dribbble"],
  [
    "Two recognitions, one announcement: we've been selected for Dribbble's annual \"Best Shots of the Year\" editorial and listed in the new Dribbble Select Branding Agencies directory.",
    "Deux reconnaissances : notre travail figure dans la sélection annuelle des meilleurs projets Dribbble et dans le nouveau répertoire Dribbble Select des agences de branding.",
  ],
  [
    "Two recognitions, one announcement: we've been selected for Dribbble's annual \\\"Best Shots of the Year\\\" editorial and listed in the new Dribbble Select Branding Agencies directory.",
    "Deux reconnaissances : notre travail figure dans la sélection annuelle des meilleurs projets Dribbble et dans le nouveau répertoire Dribbble Select des agences de branding.",
  ],
  ["Logomark on the Right? What Designers Should Know About Logo Layout", "Logomark à droite : ce que les designers doivent savoir sur la composition d’un logo"],
  [
    "Most logo usage guides show the logomark on the left. But what happens when you flip it? Understanding when and why to position a logomark on the right side of a logotype.",
    "La plupart des chartes placent le symbole à gauche. Voici quand et pourquoi le positionner à droite du logotype.",
  ],
  ["Using different styles of icons on a website — yay or nay?", "Mélanger plusieurs styles d’icônes sur un site : bonne ou mauvaise idée ?"],
  [
    "Can you mix outline icons with filled ones on the same website? Here's when mixing icon styles works, when it doesn't, and how to make the right call.",
    "Peut-on mélanger des icônes filaires et pleines sur un même site ? Voici comment faire le bon choix.",
  ],
  ["Based in Sarasota, FL. Operating globally. Defining the digital vernacular.", "Basés à Sarasota, nous travaillons partout dans le monde et façonnons les nouveaux codes numériques."],
  ["All rights reserved", "Tous droits réservés"],
  ["Timeless Design Principles", "Principes de design intemporels"],
  ["Design Principles", "Principes de design"],
  ["Shaping the Next Generation of Brands", "Façonner la prochaine génération de marques"],
  ["the Next Generation of Brands", "la prochaine génération de marques"],
  ["READ REVIEWS", "LIRE LES AVIS"],
  ["RATED ON CLUTCH", "NOTÉ SUR CLUTCH"],
  ["WILLING TO REFER", "RECOMMANDATION"],
  ["CLIENT MILESTONES", "RÉUSSITES DE NOS CLIENTS"],
  ["INDUSTRIES WE SERVE", "SECTEURS QUE NOUS ACCOMPAGNONS"],
  ["AI-FORWARD DESIGN", "DESIGN AUGMENTÉ PAR L’IA"],
  ["WHAT WE DO", "NOTRE SAVOIR-FAIRE"],
  ["ALL SERVICES", "TOUS LES SERVICES"],
  ["VIEW BRAND DESIGN →", "VOIR LE BRAND DESIGN →"],
  ["VIEW PRODUCT DESIGN →", "VOIR LE PRODUCT DESIGN →"],
  ["VIEW ILLUSTRATION →", "VOIR L’ILLUSTRATION →"],
  ["VIEW WEB DESIGN →", "VOIR LE WEB DESIGN →"],
  ["VIEW PRINT & PACKAGING →", "VOIR LE PRINT ET PACKAGING →"],
  ["BLOCKCHAIN HACKATHON", "HACKATHON BLOCKCHAIN"],
  ["BRAND & PLATFORM DESIGN", "IDENTITÉ ET DESIGN DE PLATEFORME"],
  ["FINTECH ARCHITECTURE", "ARCHITECTURE FINTECH"],
  ["AI & NEUROSCIENCE", "IA ET NEUROSCIENCES"],
  ["OUT-OF-HOME MEDIA", "AFFICHAGE EXTÉRIEUR"],
  ["ENTERTAINMENT PLATFORM", "PLATEFORME DE DIVERTISSEMENT"],
  ["BLOCKCHAIN & DIGITAL CURRENCY", "BLOCKCHAIN ET MONNAIE NUMÉRIQUE"],
  ["CRYPTO WALLET", "PORTEFEUILLE CRYPTO"],
  ["CRYPTO TRADING PLATFORM", "PLATEFORME D’ÉCHANGE CRYPTO"],
  ["HEALTHCARE & PHARMA", "SANTÉ ET PHARMA"],
  ["EVENT & CONFERENCE DESIGN", "DESIGN ÉVÉNEMENTIEL"],
  ["CRYPTO & HACKATHON", "CRYPTO ET HACKATHON"],
  ["HEALTHCARE", "SANTÉ"],
  [
    "Solana is an intuitive blockchain known for its speed and efficiency. Solana Summer Camp was their annual hackathon with 18,000 participants and 750 projects submitted.",
    "Solana est une blockchain reconnue pour sa rapidité et son efficacité. Son hackathon annuel Summer Camp a réuni 18 000 participants et 750 projets.",
  ],
  [
    "A complete rebrand and end-to-end design for the creator platform challenging the status quo. Logo, website, mobile app, TV app, and marketing collateral — all Unfold.",
    "Une refonte complète de la marque et de la plateforme dédiée aux créateurs : logo, site web, application mobile, application TV et supports marketing.",
  ],
  [
    "Reimagining the liquidity vectors for a decentralized future. A study in absolute precision.",
    "Repenser les flux de liquidité pour un avenir décentralisé, avec une précision absolue.",
  ],
  [
    "Designing the brand and product experience for AI-generated functional music. Where neuroscience meets sound design.",
    "Concevoir la marque et l’expérience produit d’une musique fonctionnelle générée par IA, à la rencontre des neurosciences et du design sonore.",
  ],
  [
    "Modernizing America's largest outdoor advertising company. Digital transformation meets physical presence.",
    "Moderniser le leader américain de l’affichage extérieur, à la rencontre de la transformation numérique et de la présence physique.",
  ],
  [
    "Designing the streaming experience for NBCUniversal's flagship platform. Where content meets craft.",
    "Concevoir l’expérience de streaming de la plateforme phare de NBCUniversal, là où le contenu rencontre le savoir-faire.",
  ],
  [
    "Secure and effortless storage for crypto assets. Designed for mobile use and on the go. We took SafePal from concept to Web3 hero with a complete brand overhaul.",
    "Un stockage simple et sécurisé des actifs numériques, pensé pour le mobile. Une refonte complète qui a fait passer SafePal du concept à une référence du Web3.",
  ],
  [
    "A cyberpunk-inspired brand identity, illustration system, and marketing website for a peer-to-peer digital asset swapping platform. Dark, vivid, and unmistakably futuristic.",
    "Une identité inspirée du cyberpunk, un système d’illustrations et un site marketing pour une plateforme d’échange d’actifs numériques entre particuliers.",
  ],
  [
    "Redefining healthcare branding for a modern medical provider. A clean, trustworthy identity system designed to put patients first.",
    "Redéfinir l’identité d’un acteur moderne de la santé avec un système clair, rassurant et centré sur les patients.",
  ],
  [
    "Designing the visual identity and product experience for Facebook's ambitious global cryptocurrency initiative. A stablecoin built to bank the unbanked.",
    "Concevoir l’identité visuelle et l’expérience produit de l’ambitieux projet mondial de cryptomonnaie de Facebook, une monnaie stable pensée pour rendre les services financiers plus accessibles.",
  ],
  [
    "Custom illustrations and UI/UX design for Merck's Chronic Cough app — a digital health tool that humanizes clinical tracking through empathetic design.",
    "Des illustrations sur mesure et un design UI/UX pour l’application Chronic Cough de Merck, un outil de santé numérique qui humanise le suivi clinique.",
  ],
  [
    "Designing a compassionate companion app for Merck's Keytruda cancer treatment patients. A mobile experience that helps patients track symptoms, manage treatment schedules, and communicate with their care team.",
    "Concevoir une application d’accompagnement bienveillante pour les patients traités avec Keytruda, afin de suivre les symptômes, organiser les soins et communiquer avec l’équipe médicale.",
  ],
  [
    "Creating the visual identity and complete event experience for Solana's flagship developer conference — Breakpoint 2022 in Lisbon. From branding to wayfinding, merchandise to digital assets.",
    "Créer l’identité visuelle et l’expérience complète de Breakpoint 2022 à Lisbonne, la conférence phare de Solana, de la signalétique aux produits dérivés et contenus numériques.",
  ],
  [
    "Event branding and digital experience for Solana's flagship hackathon. Bold, energetic identity built to rally thousands of developers.",
    "Une identité événementielle et une expérience numérique audacieuses pour le hackathon phare de Solana, pensées pour fédérer des milliers de développeurs.",
  ],
]);

const tokens = new Map([
  ["Case Studies", "Réalisations"],
  ["Services", "Services"],
  ["Partner with us", "Travaillons ensemble"],
  ["Agency", "Agence"],
  ["for the", "de l’ère"],
  ["Intelligent", "intelligente"],
  ["Era", ""],
  ["Capabilities", "Expertises"],
  ["Brand Design", "Identité de marque"],
  ["Product Design", "Design produit"],
  ["Web Design", "Design web"],
  ["Print & Packaging", "Print et packaging"],
  ["Insights", "Actualités"],
  ["Home", "Accueil"],
  ["Work", "Projets"],
  ["Agency", "Agence"],
  ["Journal", "Journal"],
  ["Tools", "Outils"],
  ["Start a Project", "Démarrer un projet"],
  ["Sitemap", "Plan du site"],
  ["SITEMAP", "PLAN DU SITE"],
  ["SOCIAL", "RÉSEAUX"],
  ["QUALITY", "QUALITÉ"],
  ["SCHEDULE", "DÉLAIS"],
  ["STARTUPS", "STARTUPS"],
  ["ESTABLISHED", "ENTREPRISES ÉTABLIES"],
  ["ENTERPRISE", "GRANDS GROUPES"],
  ["MOM & POP SHOPS", "COMMERCES INDÉPENDANTS"],
  ["LOCAL BUSINESSES", "ENTREPRISES LOCALES"],
  ["Health", "Santé"],
  ["Real Estate", "Immobilier"],
  ["Education", "Éducation"],
  ["Medical", "Médical"],
  ["Entertainment", "Divertissement"],
  ["Blockchain Hackathon", "Hackathon blockchain"],
  ["Brand & Platform Design", "Identité et plateforme"],
  ["Fintech Architecture", "Architecture fintech"],
  ["AI & Neuroscience", "IA et neurosciences"],
  ["Out-of-Home Media", "Affichage extérieur"],
  ["Entertainment Platform", "Plateforme de divertissement"],
  ["Blockchain & Digital Currency", "Blockchain et monnaie numérique"],
  ["Crypto Wallet", "Portefeuille crypto"],
  ["Crypto Trading Platform", "Plateforme d’échange crypto"],
  ["Healthcare & Pharma", "Santé et pharma"],
  ["Event & Conference Design", "Design événementiel"],
  ["Crypto & Hackathon", "Crypto et hackathon"],
  ["Healthcare", "Santé"],
  ["ACQUIRED", "ACQUISITION"],
  ["Acquired", "Acquisition"],
  ["VALUATION", "VALORISATION"],
  ["Valuation", "Valorisation"],
  ["SERIES B", "SÉRIE B"],
  ["Series B", "Série B"],
  ["UNICORN", "LICORNE"],
  ["Unicorn", "Licorne"],
  ["ALL PROJECTS", "TOUS LES PROJETS"],
  ["All Projects", "Tous les projets"],
  ["ALL SERVICES", "TOUS LES SERVICES"],
  ["All Services", "Tous les services"],
  ["SERVICES", "SERVICES"],
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceToken(content, source, target) {
  const escaped = escapeRegExp(source);
  content = content.replace(new RegExp(`([\"'])${escaped}\\1`, "g"), (_, quote) => `${quote}${target}${quote}`);
  content = content.replace(new RegExp(`>${escaped}<`, "g"), `>${target}<`);
  return content;
}

for (const file of files) {
  let content = await readFile(file, "utf8");

  for (const [source, target] of phrases) {
    content = content.split(source).join(target);
  }

  for (const [source, target] of tokens) {
    content = replaceToken(content, source, target);
  }

  await writeFile(file, content, "utf8");
  console.log(`Traduit : ${file}`);
}

let index = await readFile("index.html", "utf8");
index = index.replace('<html lang="en">', '<html lang="fr">');
await writeFile("index.html", index, "utf8");
