// ERP visual editor origin (e.g. https://erp.clickmasters.pk) may frame the
// site so page edits can be made in place. Without it, framing stays same-origin.
const editorOrigin = /^https:\/\/[a-z0-9.-]+(:\d+)?$/i.test(process.env.CMS_EDITOR_ORIGIN ?? '')
  ? process.env.CMS_EDITOR_ORIGIN
  : '';

const securityHeaders = [
  // X-Frame-Options can't allow-list an origin; CSP frame-ancestors covers it then.
  ...(editorOrigin ? [] : [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }]),
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https:",
      "connect-src 'self' https:",
      "frame-src 'self' https:",
      `frame-ancestors 'self'${editorOrigin ? ` ${editorOrigin}` : ''}`,
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; '),
  },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ['192.168.88.61', '192.168.88.62', '192.168.34.54'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // Files in /public are served with max-age=0 by default, so every page
      // view revalidates the logo, hero images and background videos. Their
      // names are not content-hashed, so cache for a week (not "immutable") and
      // allow serving a stale copy while revalidating in the background.
      {
        source: '/:dir(media|assets)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/service',
        permanent: true,
      },
      {
        source: '/services/:slug',
        destination: '/service/:slug',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'www.magnific.com',
      },
    ],
    // Serve modern formats and cap generated widths at 1920px (no 2048/3840
    // variants), so hero images stay small on every device.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
