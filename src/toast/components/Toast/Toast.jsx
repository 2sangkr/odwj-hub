"use client";

import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = setTimeout(() => setVisible(false), 2200);
    const done = setTimeout(() => onDone(), 2700);
    return () => { clearTimeout(hide); clearTimeout(done); };
  }, [onDone]);

  return (
    <div className={`${styles.toast} ${visible ? styles.show : styles.hide}`}>
      {message}
    </div>
  );
}
