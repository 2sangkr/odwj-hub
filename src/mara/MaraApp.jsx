"use client";

import { useState } from "react";
import { OrderProvider } from "./store/orderStore";
import HomeScreen from "./screens/HomeScreen";
import RevealScreen from "./screens/RevealScreen";
import StepScreen from "./screens/StepScreen";
import ResultScreen from "./screens/ResultScreen";
import MyRecordsScreen from "./screens/MyRecordsScreen";

export default function MaraApp() {
  const [screen, setScreen] = useState("home");

  const handleStart = (mode) => {
    if (mode === "random") setScreen("spin");
    else setScreen("step");
  };

  return (
    <OrderProvider>
      {screen === "home"    && <HomeScreen onStart={handleStart} onRecords={() => setScreen("records")} />}
      {screen === "spin"    && <RevealScreen onDone={() => setScreen("result")} />}
      {screen === "step"    && <StepScreen onDone={() => setScreen("result")} />}
      {screen === "result"  && (
        <ResultScreen
          onRestart={() => setScreen("home")}
          onRecords={() => setScreen("records")}
        />
      )}
      {screen === "records" && <MyRecordsScreen onBack={() => setScreen("home")} />}
    </OrderProvider>
  );
}
