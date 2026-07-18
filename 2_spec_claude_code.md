# PROJET.md — Spec para Claude Code : Site "Assurance Animaux"

# IMPORTATE 
- Usa o tailwind.config.js e o tokens.css da pasta design-tokens como o design system do projeto. Segue o PROJET.md e aplica estes tokens em todos os componentes. Usa os prints como referência visual 

## 1\. Objetivo do projeto

Construir um site de conteúdo \+ comparação de **assurance santé pour animaux** (mutuelle chien/chat) para o mercado francês, otimizado para SEO e conversão (afiliados \+ captação de leads). Rápido, mobile-first, conforme RGPD/CNIL.

## 2\. Stack técnica (obrigatória)

- **Next.js 14** (App Router) \+ **TypeScript**  
- **Tailwind CSS** para estilos (usar os design tokens fornecidos — ver secção 4\)  
- **Conteúdo em MDX** (ficheiros locais em `/content`), com `contentlayer` OU parsing próprio via `gray-matter` \+ `next-mdx-remote`. Sem base de dados.  
- **Deploy: Vercel** (free tier). Otimizar para Core Web Vitals.  
- Sem dependências pesadas desnecessárias. Prioridade a performance e simplicidade.

## 3\. Estrutura de pastas

/app

  /layout.tsx            \# layout raiz, \<head\>, fontes, CMP de cookies

  /page.tsx              \# Homepage

  /comparatif/page.tsx   \# Página comparador

  /guides/page.tsx       \# Índice do blog

  /guides/\[slug\]/page.tsx\# Artigo individual (renderiza MDX)

  /a-propos/page.tsx     \# E-E-A-T: sobre \+ autor

  /mentions-legales/page.tsx

  /politique-confidentialite/page.tsx

  /sitemap.ts            \# sitemap dinâmico

  /robots.ts

/components

  Hero.tsx, CtaButton.tsx, OfferCard.tsx, ComparisonTable.tsx,

  AffiliateBox.tsx, LeadForm.tsx, Faq.tsx, ArticleCard.tsx,

  AuthorBio.tsx, TrustBar.tsx, StickyMobileCta.tsx, CookieConsent.tsx

/content

  /guides/\*.mdx          \# artigos

  /data/offers.ts        \# dados das seguradoras (nome, nota, preço, link afiliado)

  /data/author.ts        \# dados do autor

/lib

  mdx.ts                 \# leitura/parsing de MDX

  seo.ts                 \# helper de metadata \+ JSON-LD

/public/images

## 4\. Design system

Usar os **design tokens exportados do Claude Design** (cores hex, tipografia, espaçamentos, raios). Colocar em `tailwind.config.ts` como tema. Se os tokens ainda não existirem, usar estes placeholders e deixar fácil de trocar:

- Cores: `primary` (verde-confiança), `accent` (coral CTA), `bg` (claro), `text` (cinza-escuro).  
- Fonte: Inter ou Poppins via `next/font`.  
- Botões: min-height 48px, raio 8-12px, estado hover/pressed.  
- Componentes devem espelhar o design gerado no Claude Design.

## 5\. Componentes-chave (regras de conversão)

- **CtaButton**: variante primária na cor `accent`, alto contraste, texto de ação ("Obtenir un devis gratuit", "Comparer les offres"). Prop para link de afiliado com `rel="sponsored nofollow"` e `target="_blank"`.  
- **ComparisonTable**: recebe array de `offers`, linhas alternadas, badge "Meilleur choix", coluna final com CtaButton por linha. Responsiva (vira cards em mobile).  
- **AffiliateBox**: caixa "💡 Notre recommandation" para inserir no meio de artigos MDX (exportar como componente MDX).  
- **LeadForm**: email \+ tipo de animal (chien/chat). Ao submeter, guarda o lead (por ora, POST para uma API route `/api/lead` que só faz console.log/armazena em ficheiro — deixar TODO para integrar depois). **Checkbox de consentimento RGPD obrigatório** antes de submeter.  
- **StickyMobileCta**: barra fixa no fundo em mobile com CTA primário.  
- **CookieConsent (CMP)**: banner conforme CNIL — bloquear scripts de ads/analytics ATÉ o consentimento. Opções "Accepter / Refuser / Personnaliser". Guardar escolha.  
- **AuthorBio** e **TrustBar**: sinais de E-E-A-T e prova social.

## 6\. SEO técnico (crítico)

Implementar em todas as páginas:

- `generateMetadata` por página: title, description, canonical, Open Graph, Twitter card.  
- **JSON-LD structured data**: `Organization` (global), `Article` \+ `BreadcrumbList` (guias), `FAQPage` (onde houver FAQ), `Product`/`Review` na tabela de comparação se aplicável.  
- `hreflang` preparado para `fr-FR` (e fácil de estender para `fr-CH`).  
- `sitemap.ts` dinâmico (inclui todos os guias) \+ `robots.ts`.  
- URLs limpas e semânticas: `/guides/meilleure-assurance-chat-2026`.  
- Imagens via `next/image` (lazy, tamanhos responsivos, alt descritivo).  
- Headings semânticos (um H1 por página).  
- Performance: Core Web Vitals verde — fontes com `display: swap`, sem JS desnecessário, CSS mínimo.

## 7\. Sistema de conteúdo (MDX)

Cada artigo em `/content/guides/*.mdx` com frontmatter:

\---

title: "Meilleure assurance chat 2026 : comparatif complet"

description: "..."

slug: "meilleure-assurance-chat-2026"

date: "2026-07-15"

author: "gregori"        \# referencia /content/data/author.ts

category: "chat"

intent: "commercial"      \# informational | commercial

cover: "/images/..."

faq:                      \# gera JSON-LD FAQPage

  \- q: "..."

    a: "..."

\---

- Componentes disponíveis dentro do MDX: `<AffiliateBox>`, `<ComparisonTable>`, `<LeadForm>`, `<Callout>`.  
- A página de artigo gera automaticamente: sommaire (índice a partir dos H2/H3), bio do autor no fim, CTAs, JSON-LD.

## 8\. Monetização (deixar plugável)

- `/content/data/offers.ts`: lista de seguradoras com `{ name, rating, priceFrom, franchise, plafond, delaiCarence, affiliateUrl, badge? }`. Links de afiliado centralizados aqui para trocar fácil.  
- Todos os links de afiliado com `rel="sponsored nofollow"`.  
- Divulgação de afiliado visível ("Cet article contient des liens affiliés") nos artigos comerciais.  
- Placeholder de slot AdSense (componente `<AdSlot>`) que só carrega após consentimento de cookies — desativado por padrão, ativar depois da aprovação.

## 9\. Conformidade legal (FR)

- Páginas `mentions-legales` e `politique-confidentialite` (templates a preencher — deixar TODOs com os campos: nome, SIRET auto-entrepreneur, contato, hébergeur Vercel).  
- CMP de cookies conforme CNIL (ver componente CookieConsent).  
- Formulários com consentimento explícito \+ finalidade clara.

## 10\. Ordem de execução sugerida

1. Setup: Next.js \+ TS \+ Tailwind \+ fontes \+ tokens no `tailwind.config`.  
2. Layout raiz \+ CookieConsent \+ rodapé \+ header/nav.  
3. Componentes base (CtaButton, OfferCard, ComparisonTable, AffiliateBox, LeadForm, Faq, TrustBar, AuthorBio, StickyMobileCta).  
4. Homepage montando os componentes.  
5. Sistema MDX \+ página de artigo `[slug]` \+ índice `/guides`.  
6. Página `/comparatif`.  
7. SEO: metadata, JSON-LD, sitemap, robots.  
8. Páginas legais \+ `/a-propos`.  
9. Otimização de performance (Lighthouse) \+ teste mobile.  
10. `README` com instruções de deploy na Vercel.

## 11\. Critérios de "pronto"

- Lighthouse: Performance, SEO e Best Practices ≥ 90 em mobile.  
- Todos os CTAs funcionam e abrem o link de afiliado corretamente.  
- Formulário de lead valida consentimento RGPD.  
- Cookies bloqueiam ads/analytics até consentimento.  
- 1 artigo de exemplo em MDX renderiza com sommaire, tabela, caixa de afiliado, FAQ e JSON-LD válido.  
- Deploy funcional na Vercel.

---

**Nota para o Claude Code:** gera código completo e funcional (sem pseudocódigo), com tratamento de erros e variáveis de ambiente onde necessário. Prioriza a segurança dos dados dos utilizadores (consentimento, sem tracking antes do opt-in). Comenta em português onde ajudar.  
