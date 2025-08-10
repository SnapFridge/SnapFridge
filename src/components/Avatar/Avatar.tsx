"use client";

import Link from "@components/Link";
import { useUser } from "@components/UserProvider";
import VisuallyHidden from "@components/VisuallyHidden";
import { css } from "@pigment-css/react";
import { CircleUser } from "lucide-react";
import { Avatar } from "radix-ui";

function AvatarLink({ ...delegated }) {
  const u = useUser();

  return (
    <Avatar.Root {...delegated} asChild>
      <Link href={u ? "/dashboard" : "/login"}>
        <VisuallyHidden>Go to dashboard</VisuallyHidden>
        <Avatar.Image
          className={UserAvatar}
          src={u?.user_metadata["avatar_url"] as string}
          alt="User image"
          crossOrigin=""
        />
        <Avatar.Fallback className={UserAvatar} asChild>
          <CircleUser aria-hidden color="var(--text-950)" />
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
