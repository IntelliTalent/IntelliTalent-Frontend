import { useEffect, useState } from "react";

// eslint-disable-next-line no-undef
let recognition: SpeechRecognition | null = null;
if ("webkitSpeechRecognition" in window) {
  // eslint-disable-next-line no-undef
  recognition = new webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!recognition) return;

    // eslint-disable-next-line no-undef
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setText(event.results[0][0].transcript);
      recognition?.stop();
    };
  }, []);

  const startListening = () => {
    setText("");
    recognition?.start();
  };

  const stopListening = () => {
    recognition?.stop();
  };

  return { text, startListening, stopListening };
};

export default useSpeechRecognition;
