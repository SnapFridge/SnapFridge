import VisuallyHidden from "@components/VisuallyHidden";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface Props extends ComponentPropsWithoutRef<"svg"> {
  icon: "Github" | "Logo" | "Google";
  color?: string;
  size?: number;
  ariaHidden?: boolean;
  description?: string;
}

function Icon({
  icon,
  color = "var(--text-950)",
  size = 24,
  ariaHidden = true,
  description,
  ...delegated
}: Props) {
  // TODO: Figure out the type
  let IconSVG: ReactNode;
  switch (icon) {
    case "Logo":
      IconSVG = (
        <svg
          width={size}
          height={(size / 64) * 46}
          viewBox="0 0 64 46"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
          {...delegated}
        >
          <title>Logo</title>
          <g strokeLinejoin="round" fill="#154f5d">
            <rect width="64" height="40" y="6" ry="6.5" rx="6.5" />
            <path d="M22 0h20c5.5 0 6 6 6 6H16s.5-6 6-6M8.4 3.7h2.3q1.5 0 1.6 1V6H6.8V4.6q.1-.8 1.6-.9" />
            <circle fill="#fff" cx="7" cy="13.2" r="2" />
            <circle stroke="#fff" strokeWidth="2.25" cx="32" cy="27" r="14.5" />
            <rect
              width="13"
              height="17.8"
              x="25.5"
              y="18.1"
              rx="2"
              ry="2"
              fill="#a1c9cb"
            />
            <path d="M25.5 26.4h13v1.2h-13z" />
            <rect width="1" height="3.2" x="27.5" y="21.4" rx=".5" ry=".5" />
            <rect width="1" height="4" x="27.5" y="29" rx=".5" ry=".5" />
          </g>
        </svg>
      );
      break;
    case "Github":
      IconSVG = (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
          {...delegated}
        >
          <title>Github</title>
          <path
            fill={color}
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      );
      break;
    case "Google": {
      IconSVG = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 48 48"
        >
          <title>Google</title>
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
      );
      break;
    }
  }
  return (
    <>
      {IconSVG}
      {description && <VisuallyHidden>{description}</VisuallyHidden>}
    </>
  );
}

export default Icon;
