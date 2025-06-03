import * as React from "react";

export default function useTypewriter(
  texts: string[],
  delayPerCharacter = 100,
  delayPerState = 3000
) {
  const [currentText, setCurrentText] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [typing, setTyping] = React.useState(false);

  React.useEffect(() => {
    const text = texts[currentText];

    if (!text) return setCurrentText(0);

    window.setTimeout(() => {
      if (typing) {
        if (index - 1 < text.length) {
          const newText = text.slice(0, index);
          setDisplayText(newText);
          setIndex(index + 1);
        } else {
          window.setTimeout(() => setTyping(false), delayPerState);
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
    }, delayPerCharacter);
  }, [index, typing, currentText]);

  return displayText;
}
