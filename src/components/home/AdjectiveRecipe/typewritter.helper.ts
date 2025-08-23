import { useEffect, useRef, useState } from "react";

function useTypewriter(texts: string[]) {
  const index = useRef({
    text: 0,
    texts: 0,
  }).current;
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: displayText is required
  useEffect(() => {
    const delayPerChar = 100;
    const deleteDelay = 2750;
    const text = texts[index.texts]!;
    setTimeout(() => {
      if (typing) {
        if (index.text < text.length) {
          const newTxt = text.slice(0, ++index.text);
          setDisplayText(newTxt);
        } else {
          setTimeout(() => {
            setTyping(false);
          }, deleteDelay);
        }
      } else {
        if (index.text > 0) {
          const newTxt = text.slice(0, --index.text);
          setDisplayText(newTxt);
        } else {
          setTyping(true);
          index.texts = (index.texts + 1) % texts.length;
        }
      }
    }, delayPerChar);
  }, [displayText, typing, index, texts]);

  return displayText;
}

export default useTypewriter;
