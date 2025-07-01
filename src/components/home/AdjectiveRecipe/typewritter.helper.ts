import { useEffect, useRef, useState } from "react";

export default function useTypewriter(
  texts: string[],
  delayPerChar = 100,
  deleteDelay = 3000
) {
  const index = useRef({
    text: 0,
    texts: 0,
  }).current;
  const [displayTxt, setDisplayTxt] = useState("");
  const [typing, setTyping] = useState(true);

  function changeChar() {
    const text = texts[index.texts]!;
    setTimeout(() => {
      if (typing) {
        if (index.text < text.length) {
          const newTxt = text.slice(0, ++index.text);
          setDisplayTxt(newTxt);
        } else {
          setTimeout(() => {
            setTyping(false);
          }, deleteDelay);
        }
      } else {
        if (index.text > 0) {
          const newTxt = text.slice(0, --index.text);
          setDisplayTxt(newTxt);
        } else {
          setTyping(true);
          index.texts = (index.texts + 1) % texts.length;
        }
      }
    }, delayPerChar);
  }
  useEffect(changeChar, [displayTxt, typing, delayPerChar, deleteDelay, index, texts]);

  return displayTxt;
}
