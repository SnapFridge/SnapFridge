"use client";

import { Theme } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';


interface Props {
  children: React.ReactNode,
}

function RadixThemeWrapper({ children }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  const appearance = resolvedTheme === 'dark' ? 'dark' : 'light'

  return (
    <Theme 
      appearance={appearance}
      accentColor="blue"
      grayColor="gray"
      radius="medium"
      scaling="100%"
    >
      {children}
    </Theme>
  )
}

export default RadixThemeWrapper;