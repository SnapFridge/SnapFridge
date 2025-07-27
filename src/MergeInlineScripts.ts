/*
Merge inline scripts in a html file, and then append a hash to the CSP instead of using unsafe-inline.

1. Parse HTML and extract the content of inline scripts while simulataneously removing them
2. Combine all of it into one script tag and add it back to the HTML
4. Hash the content with sha256 and somehow add it to the current CSP (maybe a meta tag?)

*/

import glob from "tiny-glob";

type Metadata = {
  projectDir: string;
  distDir: string;
};

async function mergeInlineScripts({ distDir }: Metadata) {
  const htmlFiles = await glob(distDir + "/**/*.html", {
    filesOnly: true,
  });
}

export default mergeInlineScripts;
