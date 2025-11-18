import { useEffect } from 'react';

export function useFocusTrap(containerRef, isOpen, onClose) {
  useEffect(() => {
    if (!isOpen || !containerRef?.current) return;

    const container = containerRef.current;
    const focusableSelectors = [
      'a[href]','area[href]','input:not([disabled])','select:not([disabled])','textarea:not([disabled])',
      'button:not([disabled])','[tabindex]:not([tabindex="-1"])'
    ];

    const getFocusable = () => Array.from(container.querySelectorAll(focusableSelectors.join(',')));

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const prevActive = document.activeElement;
    const focusable = getFocusable();
    (focusable[0] || container).focus();
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (prevActive && prevActive.focus) prevActive.focus();
    };
  }, [containerRef, isOpen, onClose]);
}

export default useFocusTrap;
