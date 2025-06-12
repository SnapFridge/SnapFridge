import * as Icons from 'lucide-react';
import { type ComponentProps } from 'react';

// All the icons we used
type Icon = "Logo" | "Github" | "SquareChevronDown" | "Moon" | "Sun" | "Mail" | "Sparkles"
interface Props extends ComponentProps<"svg"> {
  icon: Icon;
  color?: string;
  size?: number;
}

export default function Icon({ icon, color = "var(--text-950)", size = 24, 
  ...delegated }: Props) {
  switch(icon) {
    case "Logo":
      return (
        <svg 
          width={size} 
          height={size / 64 * 46} 
          viewBox="0 0 64 46" 
          xmlns="http://www.w3.org/2000/svg"
          {...delegated}>
          <rect y="6" width="64" height="40" rx="6" ry="6.3" fill="#154f5d"/>
          <circle cx="7" cy="13.2" r="2" fill="#fff"/>
          <circle cx="32" cy="26.5" r="16.5" fill="#fff"/>
          <circle cx="32" cy="26.5" r="14" fill="#154f5d"/>
          <path d="M27.4 18h9.2q1.6.2 1.8 1.8v6H25.6v-6q.1-1.6 1.8-1.8m9.2 17h-9.2c-1 0-1.8-.9-1.8-1.8v-6h12.8v6q-.1 1.6-1.8 1.7" fill="#a1c9cb"/>
          <g fill="#154f5d">
            <rect x="27.357" y="20.773" width=".97318" height="3.2" rx=".97318" ry=".53333"/>
            <rect x="27.371" y="28.455" width=".95773" height="4" rx=".5" ry=".49289"/>
            <path d="m22 0h20c5.54 0 6 6 6 6h-32c0.048 0 0.46-6 6-6z" strokeLinejoin="round" strokeWidth=".73666"/>
            <path d="m8.3607 3.7h2.341c0.87504 0 1.5795 0.41327 1.5795 0.92662v1.3734h-5.5v-1.3734c0-0.51335 0.70445-0.92662 1.5795-0.92662z" strokeLinejoin="round" strokeWidth=".12076"/>
          </g>
        </svg>
      )
    case "Github":
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg" 
          {...delegated}>
          <path fill={color} d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
  }
  const LucideIcon: Icons.LucideIcon = Icons[icon];
  return <LucideIcon color={color} size={size} {...delegated}/>
}
