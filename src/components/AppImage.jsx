import React from 'react';

function AppImage({
  src,
  alt = 'Imagine',
  className = '',
  width,
  height,
  sizes,
  priority = false,
  decoding = 'async',
  loading,
  // Optional responsive image inputs
  srcSet,
  sources, // [{ srcSet, type, sizes }]
  /*
    Optionally pass intrinsic aspect ratio to avoid CLS
    e.g. aspectRatio: width / height
  */
  aspectRatio,
  ...props
}) {
  const resolvedLoading = priority ? 'eager' : (loading || 'lazy');
  const fetchPriority = priority ? 'high' : 'auto';

  const style = aspectRatio && !width && !height
    ? { aspectRatio, ...props.style }
    : props.style;

  // If we have <source> definitions, render a <picture>
  if (Array.isArray(sources) && sources.length > 0) {
    return (
      <picture>
        {sources.map((s, idx) => (
          <source key={idx} srcSet={s.srcSet} type={s.type} sizes={s.sizes || sizes} />
        ))}
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
          srcSet={srcSet}
          style={style}
          onError={(e) => {
            if (e?.target?.src?.includes('/assets/images/no_image.png')) return;
            e.target.src = '/assets/images/no_image.png';
          }}
          {...props}
        />
      </picture>
    );
  }

  // Fallback to plain <img> with optional srcSet
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
      srcSet={srcSet}
      style={style}
      onError={(e) => {
        if (e?.target?.src?.includes('/assets/images/no_image.png')) return;
        e.target.src = '/assets/images/no_image.png';
      }}
      {...props}
    />
  );
}

export default AppImage;
