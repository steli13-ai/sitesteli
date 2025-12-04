import React from 'react';

export default function StructuredData({ data }) {
  if (!data) return null;
  const json = typeof data === 'string' ? data : JSON.stringify(data);
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
