import React, {useState, useEffect} from 'react';
import styles from './ExCount.module.css';

let counter = 0;
export default function ExCount({children}) {
  const [index] = useState(() => ++counter);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`excount-${index}`) === 'done')
      setDone(true);
  }, [index]);

  useEffect(() => {
    // decrement counter when this ExCount unmounts
    return () => {
      counter = Math.max(0, counter - 1);
    };
  }, []);

  const toggle = () => {
    const newDone = !done;
    setDone(newDone);
    localStorage.setItem(`excount-${index}`, newDone ? 'done' : 'pending');
  };

  return (
    <div className={styles.exercise}>
      <div
        className={`${styles.circle} ${done ? styles.done : ''}`}
        onClick={toggle}
      >
        {index}
      </div>
      <div className={styles.title}>{children}</div>
    </div>
  );
}
