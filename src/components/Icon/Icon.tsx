import Image from "next/image";
import * as Icons from "react-feather";

function Icon(
  { icon, color, size }: { icon: string; color: string; size: number },
) {
  if (icon === "logo") {
    return (
      <Image
        src="/Logo.png"
        alt="Logo"
        width={size}
        height={size}
      />
    );
  }
  const IconComponent = Icons[icon];

  return <IconComponent color={color} size={size} />;
}

export default Icon;
