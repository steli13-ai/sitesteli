// Centralized logger with environment awareness & optional Sentry forwarding
// In development: normal console output with prefix
// In production: console output (can be muted later) + Sentry capture for warn/error

let sentry; // lazy reference after monitoring init
const prefix = '[Mate cu succes]';
const isProd = import.meta.env.PROD;

function forwardToSentry(level, args) {
  if (!isProd || !sentry) return;
  try {
    if (level === 'error') {
      // Capture first arg if it's an Error otherwise create one
      const first = args[0];
      if (first instanceof Error) {
        sentry.captureException(first);
      } else {
        sentry.captureException(new Error(typeof first === 'string' ? first : 'Logger error'));
      }
    } else if (level === 'warn') {
      sentry.captureMessage(String(args[0] ?? 'Logger warning'), 'warning');
    } else if (level === 'info') {
      // Optionally skip info to reduce noise
    }
  } catch {
    /* ignore */
  }
}

// Attempt dynamic import of Sentry only if DSN present (mirrors monitoring init)
if (isProd && import.meta.env.VITE_SENTRY_DSN) {
  import('@sentry/react').then(mod => { sentry = mod; }).catch(() => {});
}

function redact(value) {
  try {
    let str = typeof value === 'string' ? value : JSON.stringify(value);
    // Redact emails
    str = str.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]');
    // Redact bearer/api tokens (simple heuristic)
    str = str.replace(/(bearer\s+)[a-z0-9-_\.]+/gi, '$1[redacted-token]');
    str = str.replace(/(api[_-]?key|token|secret)\s*[:=]\s*"?[a-z0-9-_\.]+"?/gi, '$1: [redacted]');
    // Redact phone numbers (basic patterns)
    str = str.replace(/\b\+?\d[\d\s().-]{7,}\b/g, '[redacted-phone]');
    // Cap excessively long payloads
    if (str.length > 2000) str = str.slice(0, 2000) + '…[truncated]';
    return str;
  } catch {
    return typeof value === 'string' ? value : '[object]';
  }
}

function formatArgs(args) {
  return args.map(a => redact(a));
}

export const logger = {
  info: (...args) => {
    if (import.meta.env.DEV) console.info(prefix, ...args);
    forwardToSentry('info', args);
  },
  warn: (...args) => {
    if (import.meta.env.DEV) console.warn(prefix, ...formatArgs(args));
    forwardToSentry('warn', args);
  },
  error: (...args) => {
    const redacted = formatArgs(args);
    if (import.meta.env.DEV) console.error(prefix, ...redacted);
    forwardToSentry('error', redacted);
  }
};

export default logger;
