import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return <IconBase {...props}><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></IconBase>;
}

export function UploadIcon(props: IconProps) {
  return <IconBase {...props}><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></IconBase>;
}

export function CameraIcon(props: IconProps) {
  return <IconBase {...props}><path d="M4 8h3l1.5-2h7L17 8h3v10H4z" /><circle cx="12" cy="13" r="3" /></IconBase>;
}

export function ShieldCheckIcon(props: IconProps) {
  return <IconBase {...props}><path d="M12 3 5 6v5c0 4.4 2.8 7.8 7 10 4.2-2.2 7-5.6 7-10V6z" /><path d="m9 12 2 2 4-4" /></IconBase>;
}

export function StarIcon(props: IconProps) {
  return <IconBase {...props}><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /></IconBase>;
}

export function CheckIcon(props: IconProps) {
  return <IconBase {...props}><path d="m5 12 4 4L19 6" /></IconBase>;
}

export function ArrowRightIcon(props: IconProps) {
  return <IconBase {...props}><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></IconBase>;
}

export function MapPinIcon(props: IconProps) {
  return <IconBase {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></IconBase>;
}

export function ClockIcon(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></IconBase>;
}

export function ImageIcon(props: IconProps) {
  return <IconBase {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5L5 20" /></IconBase>;
}

export function DollarIcon(props: IconProps) {
  return <IconBase {...props}><path d="M12 2v20" /><path d="M17 6.5c-1-1-2.7-1.5-5-1.5-3 0-5 1.4-5 3.5S9 12 12 12s5 1.4 5 3.5S15 19 12 19c-2.3 0-4-.5-5-1.5" /></IconBase>;
}

export function BriefcaseIcon(props: IconProps) {
  return <IconBase {...props}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5h6v2" /><path d="M3 12h18" /></IconBase>;
}
