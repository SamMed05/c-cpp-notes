import React, { useState } from 'react';
import styles from './Spoiler.module.css';

export default function Spoiler({ children }) {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div 
      className={`${styles.spoiler} ${revealed ? styles.revealed : ''}`}
      onClick={() => setRevealed(!revealed)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setRevealed(!revealed);
        }
      }}
    >
      {children}
      {!revealed && <div className={styles.hint}>Click to reveal hint</div>}
    </div>
  );
}
