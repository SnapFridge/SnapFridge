"use client";

import React from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import dynamic from 'next/dynamic';

const ThemeSwitcher = dynamic(() => import('@components/ThemeSwitcher'), {
  ssr: false
});

export default function Page() {
  return (
    <>
      <ThemeSwitcher></ThemeSwitcher>
    </>
  );
}
