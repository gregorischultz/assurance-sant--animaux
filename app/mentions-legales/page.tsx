import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description: 'Mentions légales du site Poilou, comparateur d’assurance santé chien et chat.',
  path: '/mentions-legales',
  noindex: true,
});

export default function MentionsLegalesPage() {
  const { legal } = siteConfig;
  return (
    <div className="container-content py-12">
      <article className="prose-article max-w-reading">
        <h1 className="font-display text-h3 font-bold text-ink">Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          {/* TODO: compléter avec les informations réelles de l'auto-entrepreneur */}
          Le site <strong>{siteConfig.name}</strong> est édité par {legal.editor}.
          <br />
          SIRET : {legal.siret}
          <br />
          Adresse : {legal.address}
          <br />
          Contact : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>

        <h2>Directeur de la publication</h2>
        <p>{legal.editor}</p>

        <h2>Hébergeur</h2>
        <p>
          {legal.hostName}
          <br />
          {legal.hostAddress}
        </p>

        <h2 id="affiliation">Liens d&apos;affiliation</h2>
        <p>
          {siteConfig.name} est un service gratuit financé par des liens d&apos;affiliation. Lorsque vous
          souscrivez une offre via l&apos;un de nos liens, nous pouvons percevoir une commission de la part
          de l&apos;assureur, <strong>sans aucun surcoût pour vous</strong>. Cette rémunération n&apos;influence
          pas notre classement, qui reste fondé sur le rapport garanties/prix.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus (textes, comparatifs, éléments graphiques) présents sur ce site est
          protégé par le droit d&apos;auteur. Toute reproduction sans autorisation est interdite.
        </p>

        <h2>Responsabilité</h2>
        <p>
          Les informations fournies le sont à titre indicatif et ne constituent pas un conseil en assurance
          personnalisé. Vérifiez toujours les conditions générales de l&apos;assureur avant de souscrire.
        </p>
      </article>
    </div>
  );
}
