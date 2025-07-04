import { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
  setIsRunning(false);
  alert("🎉 Fokus selesai! Kamu dapat 10 XP!");

  // Tambah XP dan update level
  setXp(prevXp => {
    const newXp = prevXp + 10;
    setLevel(Math.floor(newXp / 100) + 1);
    return newXp;
  });
}

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <div style={{ marginBottom: '1rem' }}>
  <p style={{ fontSize: '1.2rem' }}>Level: {level}</p>
  <p style={{ fontSize: '1rem' }}>XP: {xp}</p>
</div>

      <h1 style={{ fontSize: '3rem' }}>{formatTime(timeLeft)}</h1>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
