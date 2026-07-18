import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Politique de confidentialité',
  description:
    'Comment Poilou collecte, utilise et protège vos données personnelles, conformément au RGPD et aux recommandations de la CNIL.',
  path: '/politique-confidentialite',
  noindex: true,
});

export default function ConfidentialitePage() {
  return (
    <div className="container-content py-12">
      <article className="prose-article max-w-reading">
        <h1 className="font-display text-h3 font-bold text-ink">Politique de confidentialité</h1>
        <p>
          Cette politique décrit comment {siteConfig.name} traite vos données personnelles, dans le respect
          du Règlement Général sur la Protection des Données (RGPD) et des recommandations de la CNIL.
        </p>

        <h2>Responsable du traitement</h2>
        <p>
          {/* TODO: compléter */}
          {siteConfig.legal.editor} — contact :{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>

        <h2>Données collectées</h2>
        <ul>
          <li>
            <strong>Formulaire de lead</strong> : adresse email et type d&apos;animal (chien/chat), avec votre
            consentement explicite.
          </li>
          <li>
            <strong>Mesure d&apos;audience et publicité</strong> : uniquement après votre consentement via le
            bandeau cookies (aucun cookie non essentiel n&apos;est déposé avant).
          </li>
        </ul>

        <h2>Finalités</h2>
        <ul>
          <li>Vous envoyer les guides et offres demandés.</li>
          <li>Améliorer le site (statistiques anonymisées, sous réserve de consentement).</li>
          <li>Financer le service via l&apos;affiliation (aucune donnée personnelle n&apos;est vendue).</li>
        </ul>

        <h2>Base légale</h2>
        <p>
          Le traitement repose sur votre <strong>consentement</strong> (article 6.1.a du RGPD), que vous
          pouvez retirer à tout moment.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Les données de contact sont conservées 3 ans à compter du dernier contact, puis supprimées.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition et de
          portabilité de vos données. Pour l&apos;exercer, écrivez à{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Vous pouvez également introduire une
          réclamation auprès de la CNIL (www.cnil.fr).
        </p>

        <h2>Cookies</h2>
        <p>
          Le bandeau de consentement vous permet d&apos;accepter, refuser ou personnaliser l&apos;usage des
          cookies de mesure d&apos;audience et de publicité. Le refus est aussi simple que l&apos;acceptation et
          votre choix est mémorisé. Aucun script publicitaire ou de suivi n&apos;est chargé tant que vous
          n&apos;avez pas donné votre accord.
        </p>
      </article>
    </div>
  );
}
