"use client";

import { Avatar } from "radix-ui";
import { useUserImage } from "./hooks.helper";
import { css } from "@pigment-css/react";
import Icon from "@components/Icon";
import VisuallyHidden from "@components/VisuallyHidden";
import Link from "@components/Link";

function User() {
  const userImage = useUserImage();

  return (
    <Avatar.Root asChild>
      <Link href="/user">
        <VisuallyHidden>Login or go to user page</VisuallyHidden>
        <Avatar.Image className={UserAvatar} src={userImage} alt="User image" />
        <Avatar.Fallback className={UserAvatar} asChild>
          <Icon icon="CircleUser" color="var(--text-950)" size={28} />
        </Avatar.Fallback>
      </Link>
    </Avatar.Root>
  );
}

const UserAvatar = css({
  borderRadius: "50%",
  height: "28px",
});

export default User;
