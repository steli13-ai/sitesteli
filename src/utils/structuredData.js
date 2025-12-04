export function buildOrganization({ name = 'Mate cu Succes', url = 'https://matecusucces.ro/', logo = 'https://matecusucces.ro/assets/images/logo-512.png', sameAs = [] } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    sameAs,
  };
}

export function buildWebSite({ name = 'Mate cu Succes', url = 'https://matecusucces.ro/' } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildCourse({ name, description, providerName = 'Mate cu Succes', providerUrl = 'https://matecusucces.ro/' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: providerName,
      sameAs: providerUrl,
    },
  };
}

export function buildItemList({ items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items?.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item,
    })) || [],
  };
}

export function buildOffer({ name, price, priceCurrency = 'RON', url }) {
  return {
    '@type': 'Offer',
    name,
    price,
    priceCurrency,
    url,
    availability: 'https://schema.org/InStock',
  };
}
