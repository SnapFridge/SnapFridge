import Image from "next/image";
import Icons from "../assets/icon.svg";

function Icon({ icon, color, size }) {
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
  const Icon = Icons[icon];

  return <Icon color={color} size={size} />;
}

export default Icon;
