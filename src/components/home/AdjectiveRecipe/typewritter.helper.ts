import { useEffect, useState } from "react";

export default function useTypewriter(
  texts: string[],
  delayPerCharacter = 100,
  delayPerState = 3000
) {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    const text = texts[currentText];

    if (!text) {
      setCurrentText(0);
      return;
    }
    setInitial(false);

    window.setTimeout(
      () => {
        if (typing) {
          if (index - 1 < text.length) {
            const newText = text.slice(0, index);
            setDisplayText(newText);
            setIndex(index + 1);
          } else {
            window.setTimeout(() => {
              setTyping(false);
            }, delayPerState);
          }
        } else {
          if (index >= 0) {
            const newText = text.slice(0, index);
            setDisplayText(newText);
            setIndex(index - 1);
          } else {
            setIndex(0);
            setTyping(true);
            setCurrentText(currentText + 1);
          }
        }
      },
      initial ? 0 : delayPerCharacter
    );
  }, [index, typing, currentText, delayPerCharacter, delayPerState, initial, texts]);

  return displayText;
}
