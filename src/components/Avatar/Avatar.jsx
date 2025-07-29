"use client";

import { Avatar } from "radix-ui";
import useUser from "@components/User";
import { css } from "@pigment-css/react";
import Icon from "@components/Icon";
import VisuallyHidden from "@components/VisuallyHidden";
import Link from "@components/Link";

function AvatarLink({ ...delegated }) {
  const user = useUser();

  return (
    <Avatar.Root {...delegated} asChild>
      <Link href="/dashboard">
        <VisuallyHidden>Go to dashboard</VisuallyHidden>
        <Avatar.Image
          className={UserAvatar}
          src={user?.user_metadata["avatar_url"]}
          alt="User image"
          crossOrigin=""
        />
        <Avatar.Fallback className={UserAvatar} asChild>
          <Icon icon="CircleUser" color="var(--text-950)" size={24} />
        </Avatar.Fallback>
      </Link>
    </Avatar.Root>
  );
}

const UserAvatar = css({
  borderRadius: "50%",
  width: "24px",
  height: "24px",
});

export default AvatarLink;
