// Simple per-route meta builder using react-helmet
import { Helmet } from 'react-helmet';

export function Meta({ title, description, canonical, og = {}, twitter = {} }) {
  const fullTitle = title ? `${title} | Mate cu Succes` : 'Mate cu Succes';
  return (
    <Helmet>
      {fullTitle && <title>{fullTitle}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {/* Open Graph */}
      {og.title && <meta property="og:title" content={og.title} />}
      {og.description && <meta property="og:description" content={og.description} />}
      {og.type && <meta property="og:type" content={og.type} />}
      {og.url && <meta property="og:url" content={og.url} />}
      {og.image && <meta property="og:image" content={og.image} />}
      {/* Twitter Card */}
      {twitter.card && <meta name="twitter:card" content={twitter.card} />}
      {twitter.title && <meta name="twitter:title" content={twitter.title} />}
      {twitter.description && <meta name="twitter:description" content={twitter.description} />}
      {twitter.image && <meta name="twitter:image" content={twitter.image} />}
    </Helmet>
  );
}
