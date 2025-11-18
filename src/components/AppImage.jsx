import React from 'react';

function Image({
  src,
  alt = 'Imagine',
  className = '',
  width,
  height,
  sizes,
  priority = false,
  decoding = 'async',
  loading,
  ...props
}) {
  const resolvedLoading = priority ? 'eager' : (loading || 'lazy');
  const fetchPriority = priority ? 'high' : 'auto';

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      loading={resolvedLoading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onError={(e) => {
        if (e?.target?.src?.includes('/assets/images/no_image.png')) return;
        e.target.src = '/assets/images/no_image.png';
      }}
      {...props}
    />
  );
}

export default Image;
