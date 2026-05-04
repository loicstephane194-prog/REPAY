# REPAY

> Votre abonnement Spotify ou Crunchyroll payé en FCFA, par moi.

Site vitrine statique pour **REPAY**, un service étudiant qui permet aux personnes sans carte bancaire internationale de payer leurs abonnements Spotify et Crunchyroll en FCFA via **Orange Money** ou **MTN Mobile Money**.

---

## Aperçu

- Présentation du service et des tarifs
- Processus en 4 étapes claires
- Boutons de contact directs (WhatsApp + Email) avec messages pré-remplis
- Section confidentialité / disclaimer
- Section "À propos" avec l'histoire du fondateur

## Stack technique

- HTML5 / CSS3 / JavaScript vanilla — aucune dépendance externe
- Compatible GitHub Pages (site 100 % statique)
- Responsive mobile-first
- Animations au défilement (IntersectionObserver)

## Structure

```
repay/
├── index.html
├── style.css
├── script.js
└── logo images/
    ├── spotify logo.png
    ├── cruchyroll logo.png
    ├── orange money logo.png
    └── mobile money logo.png
```

## Configuration

Tous les paramètres modifiables sont regroupés en haut de `script.js` :

```js
const WHATSAPP_NUMBER = "237697308033"; // numéro sans le +
const EMAIL_ADDRESS   = "loicstephane194@gmail.com";

const PRICES = {
  spotify:     { individuel: { fcfa: 4000 } },
  crunchyroll: { megafan:    { fcfa: 3500 } },
};
```

Pour changer un prix, modifier un contact ou ajouter une formule : éditez uniquement cette section.

## Déploiement

Le site est hébergé gratuitement sur **GitHub Pages**.

Pour le déployer vous-même :
1. Forkez ce dépôt
2. Allez dans **Settings → Pages**
3. Source : `main` / `/ (root)`
4. Votre site sera disponible sur `https://votre-pseudo.github.io/repay/`

## Auteur

**Loïc** — étudiant, fondateur de REPAY.

> Ce projet est un début. La suite se construit avec vous.

---

*Les logos Spotify, Crunchyroll, Orange Money et MTN sont la propriété de leurs détenteurs respectifs.*
