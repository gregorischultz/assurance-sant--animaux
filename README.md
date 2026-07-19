# Poilou — Comparateur d'assurance santé chien & chat

Site de contenu + comparaison d'**assurance santé pour animaux** (mutuelle chien/chat) pour le marché français. Optimisé SEO et conversion (affiliation + captation de leads), rapide, mobile-first et conforme RGPD/CNIL.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** avec les design tokens du projet (`design-tokens/`) portés dans `tailwind.config.ts`
- **Contenu en MDX** (`/content/guides/*.mdx`) via `gray-matter` + `next-mdx-remote` (pas de base de données)
- Polices **Poppins** + **Inter** via `next/font` (`display: swap`)
- Déploiement cible : **Vercel**

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # sert le build
```

## Structure

```
app/
  layout.tsx                  # layout racine : polices, header/footer, CMP cookies, JSON-LD global
  page.tsx                    # Homepage
  comparatif/page.tsx         # Comparateur (filtres animal / budget / âge)
  guides/page.tsx             # Index des guides (filtre par catégorie)
  guides/[slug]/page.tsx      # Article MDX (sommaire, bio auteur, FAQ, JSON-LD)
  a-propos/page.tsx           # E-E-A-T : méthodologie + équipe
  mentions-legales/page.tsx
  politique-confidentialite/page.tsx
  api/lead/route.ts           # POST lead (validation + consentement RGPD)
  sitemap.ts / robots.ts      # SEO
components/                    # Hero, CtaButton, OfferCard, ComparisonTable, LeadForm, CookieConsent…
content/
  guides/*.mdx                # articles
  data/offers.ts              # assureurs + liens d'affiliation
  data/author.ts              # auteurs (E-E-A-T)
lib/
  mdx.ts                      # parsing MDX + sommaire (TOC)
  seo.ts                      # metadata + JSON-LD (Organization, Article, FAQ, Breadcrumb, ItemList)
  site.ts                     # config globale du site
design-tokens/                # tokens source (CSS, Tailwind, JSON) + maquettes de référence
```

## Contenu : ajouter un guide

Créez `content/guides/mon-slug.mdx` avec ce frontmatter :

```mdx
---
title: "Titre du guide"
description: "Meta description (~155 caractères)."
slug: "mon-slug"
date: "2026-07-15"
author: "gregori"          # référence content/data/author.ts
category: "chien"           # chien | chat | general
intent: "commercial"        # informational | commercial
cover: "/images/guides/xxx.jpg"
faq:
  - q: "Question ?"
    a: "Réponse."
---
```

Composants disponibles dans le MDX : `<AffiliateBox offerId="kozoo" />`, `<ComparisonTable top={4} />` (ou `ids={['kozoo','dalma']}`), `<LeadForm />`, `<Callout tone="tip" title="…">…</Callout>`.

Le sommaire (H2/H3), la bio auteur, la FAQ et le JSON-LD sont générés automatiquement.

## Monétisation

- Les assureurs et **liens d'affiliation** sont centralisés dans `content/data/offers.ts` (champ `affiliateUrl`) — **source unique de vérité**. Renseignez chaque `affiliateUrl` (vide `''` par défaut) quand vous disposez des liens des programmes.
- **Feature flag affiliation** : tant que `NEXT_PUBLIC_AFFILIATES_ENABLED` n'est pas `true`, tous les éléments d'affiliation sont masqués — blocs `<AffiliateBox>`, boutons « Obtenir un devis » / « Voir l'offre », colonne CTA de `<ComparisonTable>` et mention de divulgation « liens d'affiliation ». Un CTA n'apparaît que si le flag est actif **et** que l'`affiliateUrl` de l'offre est renseignée (voir `lib/flags.ts`).
- Tous les liens d'affiliation portent `rel="sponsored nofollow"` et `target="_blank"`.
- `<AdSlot />` (AdSense) ne charge **rien** avant consentement cookies. Activez-le via `NEXT_PUBLIC_ADS_ENABLED=true` une fois le compte AdSense validé.

### Activer l'affiliation

1. Renseignez les `affiliateUrl` réelles dans `content/data/offers.ts`.
2. **En local** : ajoutez `NEXT_PUBLIC_AFFILIATES_ENABLED=true` dans `.env.local`, puis relancez `npm run dev`.
3. **Sur Vercel** : **Settings → Environment Variables** → ajoutez `NEXT_PUBLIC_AFFILIATES_ENABLED` = `true` (Production/Preview selon le besoin).
4. ⚠️ Les variables `NEXT_PUBLIC_*` sont **inlinées au build** : il faut **redéployer** (Deployments → ⋯ → Redeploy, ou un nouveau push) pour que le changement prenne effet.
5. Pour tout désactiver : repassez la variable à `false` (ou supprimez-la) puis redéployez.

## Conformité RGPD / CNIL

- CMP `CookieConsent` : aucun script ads/analytics avant consentement, choix « Accepter / Refuser / Personnaliser » à granularité égale, choix mémorisé.
- `LeadForm` : case de consentement **obligatoire** avant envoi.
- Pages `mentions-legales` et `politique-confidentialite` : **TODO** à compléter (SIRET, nom, adresse de l'auto-entrepreneur) dans `lib/site.ts` → `siteConfig.legal`.

## Variables d'environnement

| Variable | Rôle | Défaut |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique de production | `https://poilou.fr` |
| `NEXT_PUBLIC_ADS_ENABLED` | Active les emplacements AdSense | `false` |
| `NEXT_PUBLIC_AFFILIATES_ENABLED` | Affiche blocs/CTA/divulgation d'affiliation (redéploiement requis) | `false` |

Créez un `.env.local` (non commité) pour le développement.

## Déploiement Vercel

1. Poussez le dépôt sur GitHub/GitLab.
2. Sur [vercel.com](https://vercel.com) → **New Project** → importez le dépôt (Next.js détecté automatiquement).
3. Définissez les variables d'environnement (au minimum `NEXT_PUBLIC_SITE_URL` avec votre domaine).
4. **Deploy**. Vercel exécute `npm run build` et sert le site sur le CDN.
5. Ajoutez votre domaine dans **Settings → Domains**.

> Note : sur Vercel, le système de fichiers est en lecture seule. L'API `/api/lead` journalise les leads (`console.log`, visibles dans les logs Vercel) ; la persistance dans `data/leads.json` ne fonctionne qu'en local. **TODO** : brancher un ESP/CRM (Brevo, Mailchimp…) dans `app/api/lead/route.ts`.

## Images

Voir `public/images/README.md` pour la liste des visuels à fournir (logo, OG, couvertures). En leur absence, des placeholders s'affichent (aucune image cassée).

## Critères de « prêt »

- [x] Build de production sans erreur, pages en SSG/statique
- [x] CTAs d'affiliation `rel="sponsored nofollow"` + `target="_blank"`
- [x] `LeadForm` bloque l'envoi sans consentement RGPD
- [x] Cookies : ads/analytics bloqués avant opt-in
- [x] Article MDX avec sommaire, tableau, AffiliateBox, FAQ et JSON-LD (Article + FAQPage + Breadcrumb)
- [x] Sitemap dynamique + robots
- [ ] Compléter les mentions légales (SIRET, hébergeur) avant mise en ligne
- [ ] Fournir les images (logo, OG, couvertures)
