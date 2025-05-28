import Image from "next/image";
import Icons from "../assets/icon.svg";

function Icon(
  { icon, color, size }: { icon: string; color: string; size: number },
) {
  if (icon === "logo") {
    return (
      <Image
        src="/logo.png"
        alt="Logo"
        width={24}
        height={24}
      />
    );
  }
  const IconComponent = Icons[icon];

  return <IconComponent color={color} size={size} />;
}

export default Icon;
