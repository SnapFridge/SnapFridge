import Image from "next/image";
import * as Icons from 'lucide-react'

// All the icons we used
type Icon = "Logo" | "SquareChevronDown" | "Github" | "Moon" | "Sun" | "Mail" | "Sparkles"

// Had to do this to build the page
interface Props extends React.ComponentProps<"img"> {
  icon: Icon;
  color?: string;
  size?: number;
}

export default function Icon({ icon, color, size=24, ...delegated }: Props) {
  if (icon === "Logo") {
    return (
      <Image {...delegated}
        priority={true}
        src="/Logo.avif"
        alt="Logo"
        width={size}
        height={size}
      />
    );
  }
  const IconComponent: Icons.LucideIcon = Icons[icon];
  return <IconComponent color={color} size={size}/>
}
