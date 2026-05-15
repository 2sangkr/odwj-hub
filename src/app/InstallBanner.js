'use client';
import { useEffect, useState } from 'react';
import styles from './InstallBanner.module.css';

export default function InstallBanner() {
  const [prompt, setPrompt]       = useState(null);
  const [isIos, setIsIos]         = useState(false);
  const [showIosTip, setShowIosTip] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    setIsIos(ios);

    const handler = (e) => { e.preventDefault(); setPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleClick = async () => {
    if (isIos) { setShowIosTip(v => !v); return; }
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setPrompt(null);
  };

  if (installed) return null;
  if (!isIos && !prompt) return null;

  return (
    <div className={styles.wrap}>
      <button className={styles.card} onClick={handleClick}>
        <span className={styles.emoji}>📲</span>
        <span className={styles.label}>홈에 추가</span>
      </button>
      {showIosTip && (
        <div className={styles.tip}>
          Safari 하단 공유 버튼 →<br />"홈 화면에 추가"
        </div>
      )}
    </div>
  );
}
