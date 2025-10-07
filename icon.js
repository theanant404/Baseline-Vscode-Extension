/** @format */

// Browser SVG Icons for better visual representation

// Chrome SVG Icon
const ChromeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" height="48" width="48">
  <defs>
    <linearGradient id="a" x1="3.2173" y1="15" x2="44.7812" y2="15" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#d93025" />
      <stop offset="1" stop-color="#ea4335" />
    </linearGradient>
    <linearGradient id="b" x1="20.7219" y1="47.6791" x2="41.5039" y2="11.6837" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fcc934" />
      <stop offset="1" stop-color="#fbbc04" />
    </linearGradient>
    <linearGradient id="c" x1="26.5981" y1="46.5015" x2="5.8161" y2="10.506" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1e8e3e" />
      <stop offset="1" stop-color="#34a853" />
    </linearGradient>
  </defs>
  <circle cx="24" cy="23.9947" r="12" style="fill:#fff" />
  <path d="M3.2154,36A24,24,0,1,0,12,3.2154,24,24,0,0,0,3.2154,36ZM34.3923,18A12,12,0,1,1,18,13.6077,12,12,0,0,1,34.3923,18Z" style="fill:none" />
  <path d="M24,12H44.7812a23.9939,23.9939,0,0,0-41.5639.0029L13.6079,30l.0093-.0024A11.9852,11.9852,0,0,1,24,12Z" style="fill:url(#a)" />
  <circle cx="24" cy="24" r="9.5" style="fill:#1a73e8" />
  <path d="M34.3913,30.0029,24.0007,48A23.994,23.994,0,0,0,44.78,12.0031H23.9989l-.0025.0093A11.985,11.985,0,0,1,34.3913,30.0029Z" style="fill:url(#b)" />
  <path d="M13.6086,30.0031,3.218,12.006A23.994,23.994,0,0,0,24.0025,48L34.3931,30.0029l-.0067-.0068a11.9852,11.9852,0,0,1-20.7778.007Z" style="fill:url(#c)" />
</svg>
`;

// Firefox SVG Icon
const FirefoxIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="16" width="16">
  <path d="M44,24c0,11.04-8.96,20-20,20S4,35.04,4,24S12.96,4,24,4S44,12.96,44,24z" fill="#FF7139"/>
  <path d="M33.52,33.25c-1.56,1.47-3.65,2.37-5.95,2.37c-4.83,0-8.75-3.92-8.75-8.75c0-1.4,0.33-2.72,0.92-3.89 c0.7-1.39,1.83-2.53,3.22-3.23C23.72,19.33,25.04,19,26.44,19c4.83,0,8.75,3.92,8.75,8.75C35.19,29.6,34.64,31.57,33.52,33.25z" fill="#FFAD00"/>
  <path d="M24,4c11.04,0,20,8.96,20,20c0,11.04-8.96,20-20,20S4,35.04,4,24C4,12.96,12.96,4,24,4 M24,2 C11.85,2,2,11.85,2,24s9.85,22,22,22s22-9.85,22-22S36.15,2,24,2L24,2z" fill="#FF5722"/>
</svg>
`;

// Safari SVG Icon
const SafariIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="16" width="16">
  <circle cx="24" cy="24" r="20" fill="#1976D2"/>
  <circle cx="24" cy="24" r="16" fill="#42A5F5"/>
  <circle cx="24" cy="24" r="12" fill="#E3F2FD"/>
  <path d="M24 8 L26 22 L24 24 L22 22 Z" fill="#1976D2"/>
  <path d="M24 40 L22 26 L24 24 L26 26 Z" fill="#1976D2"/>
  <path d="M8 24 L22 22 L24 24 L22 26 Z" fill="#1976D2"/>
  <path d="M40 24 L26 26 L24 24 L26 22 Z" fill="#1976D2"/>
</svg>
`;

// Edge SVG Icon
const EdgeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="16" width="16">
  <path d="M24,4C35.05,4,44,12.95,44,24c0,11.05-8.95,20-20,20S4,35.05,4,24C4,12.95,12.95,4,24,4z" fill="#0078D4"/>
  <path d="M24,12c6.63,0,12,5.37,12,12c0,6.63-5.37,12-12,12s-12-5.37-12-12C12,17.37,17.37,12,24,12z" fill="#40E0D0"/>
  <path d="M24,16c4.42,0,8,3.58,8,8c0,4.42-3.58,8-8,8s-8-3.58-8-8C16,19.58,19.58,16,24,16z" fill="#0078D4"/>
</svg>
`;

const BrowserIcons = {
  chrome: "",
  chrome_android: "📱",
  firefox: "🦊",
  firefox_android: "🦊",
  safari: "🧭",
  safari_ios: "🧭",
  edge: "🔷",
  unknown: "🌐",
};

// Browser names for display
const BrowserNames = {
  chrome: "Chrome",
  chrome_android: "Chrome Android",
  firefox: "Firefox",
  firefox_android: "Firefox Android",
  safari: "Safari",
  safari_ios: "Safari iOS",
  edge: "Edge",
};

// Status icons
const StatusIcons = {
  supported: "✅",
  not_supported: "❌",
  unknown: "❓",
  widely: "🟢",
  limited: "🟡",
  unavailable: "🔴",
};

// For webview HTML - better browser representation with actual brand colors
const WebviewBrowserConfig = {
  chrome: {
    name: "Chrome",
    backgroundColor: "#4285f4",
    color: "white",
    fallback: "C",
  },
  firefox: {
    name: "Firefox",
    backgroundColor: "#ff7139",
    color: "white",
    fallback: "F",
  },
  safari: {
    name: "Safari",
    backgroundColor: "#1976d2",
    color: "white",
    fallback: "S",
  },
  edge: {
    name: "Edge",
    backgroundColor: "#0078d4",
    color: "white",
    fallback: "E",
  },
};

module.exports = {
  ChromeIcon,
  FirefoxIcon,
  SafariIcon,
  EdgeIcon,
  BrowserIcons,
  BrowserNames,
  StatusIcons,
  WebviewBrowserConfig,
};
