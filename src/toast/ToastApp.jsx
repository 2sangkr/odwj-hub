"use client";

import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";
import { getToast } from "./data/toastData";

export default function ToastApp() {
  const [screen, setScreen] = useState("home");
  const [situation, setSituation] = useState(null);
  const [phrase, setPhrase] = useState(null);

  function handleSelect(sit) {
    setSituation(sit);
    setPhrase(getToast(sit.id));
    setScreen("result");
  }

  function handleReroll() {
    setPhrase(getToast(situation.id));
  }

  return (
    <>
      {screen === "home" && <HomeScreen onSelect={handleSelect} />}
      {screen === "result" && (
        <ResultScreen
          situation={situation}
          phrase={phrase}
          onReroll={handleReroll}
          onBack={() => setScreen("home")}
        />
      )}
    </>
  );
}
