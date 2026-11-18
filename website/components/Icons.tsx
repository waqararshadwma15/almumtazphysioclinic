import type { IconName } from "@/lib/site";

const common = {
  width: 28, height: 28, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const, "aria-hidden": true,
};

const paths: Record<IconName, React.ReactNode> = {
  neck: (<><circle cx="12" cy="5.5" r="3" /><path d="M10.5 8.5v3M13.5 8.5v3M6 20c0-4 2.5-7.5 6-7.5s6 3.5 6 7.5" /><path d="M16.5 4.5l2-1M17 7h2.2" /></>),
  back: (<><path d="M12 3v18" /><rect x="9.5" y="4" width="5" height="3" rx="1" /><rect x="9.5" y="9" width="5" height="3" rx="1" /><rect x="9.5" y="14" width="5" height="3" rx="1" /></>),
  shoulder: (<><circle cx="8" cy="5" r="2.5" /><path d="M8 8v6M8 9.5l6 -2.5l3 -3" /><path d="M8 14l-2 7M8 14l2 7" /><path d="M18 9.5a3 3 0 0 1 0 4" /></>),
  elbow: (<><path d="M4 7l7 7 6-9" /><circle cx="11" cy="14" r="2" /><path d="M17 5l2-2M19 6h2" /></>),
  knee: (<><path d="M9 3l1 8-3 10" /><path d="M10 11l5 10" /><circle cx="10" cy="11" r="2.2" /></>),
  ankle: (<><path d="M9 3v13c0 2 1 4 3 4h7" /><path d="M13 3v11" /><circle cx="12" cy="16" r="1.6" /></>),
  joint: (<><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="17" r="2.5" /><path d="M9 9l6 6" /><path d="M17 4v3M20 7h-3" /></>),
  sport: (<><circle cx="14" cy="4.5" r="2" /><path d="M13 7l-3 5 4 2-2 7M10 12l-4 1M13 7l4 3 3-1" /></>),
  stroke: (<><path d="M12 4c-4 0-7 2.5-7 6 0 2 1 3.4 2.5 4.3V19h4v-2h1.5c3 0 5-2 5-5 0-4.5-2.5-8-6-8z" /><path d="M11 8l2 2-2 2 2 2" /></>),
  face: (<><circle cx="12" cy="12" r="8.5" /><circle cx="9" cy="10" r=".6" fill="currentColor" /><path d="M14 10h2M8.5 15c1.5 1 3.5 1 5 0" /></>),
  child: (<><circle cx="12" cy="5" r="2.3" /><path d="M12 7.5v7M7.5 10l4.5 1 4.5-1M12 14.5l-2.5 5.5M12 14.5l2.5 5.5" /></>),
};

export function ServiceIcon({ name }: { name: IconName }) {
  return <svg {...common}>{paths[name]}</svg>;
}

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.86 9.86 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29z" />
    </svg>
  );
}

const ui = { ...common, width: 22, height: 22 };
export const PinIcon = () => (<svg {...ui}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const ClockIcon = () => (<svg {...ui}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const PhoneIcon = () => (<svg {...ui}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>);
export const MailIcon = () => (<svg {...ui}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>);
export const HospitalIcon = () => (<svg {...ui}><path d="M4 21V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16" /><path d="M12 8v6M9 11h6M3 21h18" /></svg>);
export const UserIcon = () => (<svg {...ui}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>);
export const FamilyIcon = () => (<svg {...ui}><circle cx="8" cy="6" r="2.5" /><circle cx="16.5" cy="9" r="2" /><path d="M4 21v-6a4 4 0 0 1 8 0v6M13.5 21v-4a3 3 0 0 1 6 0v4" /></svg>);
export const FacebookIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.25-1.5 1.5-1.5h1.6V4.4A21 21 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" /></svg>);

export const InstagramIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>);
