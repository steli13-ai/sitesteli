import React, { memo } from 'react';

const EmptyLayout = memo(function EmptyLayout({ children }) {
  return <>{children}</>;
});

export default EmptyLayout;
