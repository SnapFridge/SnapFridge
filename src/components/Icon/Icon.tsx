import * as React from "react";
import Image from "next/image";
import * as Icons from "react-feather";

interface Props extends React.PropsWithChildren {
  icon: string;
  color: string;
  size: number;
}

function Icon(
  { icon, color, size }: Props,
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
