import { useEffect, useRef, useState } from "react";

function useTypewriter(texts: string[]) {
  const idx = useRef({
    text: 0,
    texts: 0,
  }).current;
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: displayText is required
  useEffect(() => {
    const delayPerChar = 100;
    const deleteDelay = 2750;
    const text = texts[idx.texts]!;
    setTimeout(() => {
      if (typing) {
        if (idx.text < text.length) {
          const newTxt = text.slice(0, ++idx.text);
          setDisplayText(newTxt);
        } else {
          setTimeout(() => {
            setTyping(false);
          }, deleteDelay);
        }
      } else {
        if (idx.text > 0) {
          const newTxt = text.slice(0, --idx.text);
          setDisplayText(newTxt);
        } else {
          setTyping(true);
          idx.texts = (idx.texts + 1) % texts.length;
        }
      }
    }, delayPerChar);
  }, [displayText, typing, idx, texts]);

  return displayText;
}

export default useTypewriter;
