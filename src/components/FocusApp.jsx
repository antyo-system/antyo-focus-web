import { useState, useEffect } from 'react';
import { saveFocusDuration, getTodayFocusDuration } from '../utils/focusStorage';
import FocusChart from './FocusChart';

const FocusApp = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 menit dalam detik
  const [isRunning, setIsRunning] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(Math.floor(getTodayFocusDuration() / 60));

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert("🎉 Fokus selesai! Kamu dapat 10 XP!");

      saveFocusDuration(25 * 60);
      setTodayMinutes(Math.floor(getTodayFocusDuration() / 60));

      // Tambah XP + Update Level
      setXp(prevXp => {
        const newXp = prevXp + 10;
        setLevel(Math.floor(newXp / 100) + 1);
        return newXp;
      });

      // Tambah jumlah sesi selesai
      setSessionsCompleted(prev => {
        const updated = prev + 1;

        // Cek apakah misi harian tercapai
        if (updated === 4) {
          alert("🎯 Misi Harian Tercapai! +50 XP!");
          setXp(prev => {
            const newXp = prev + 50;
            setLevel(Math.floor(newXp / 100) + 1);
            return newXp;
          });
        }

        return updated;
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
    <div style={{ textAlign: 'center', marginTop: '3rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>ANTYO Focus MVP</h2>
      
      <h1 style={{ fontSize: '4rem', margin: '1rem 0' }}>{formatTime(timeLeft)}</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setIsRunning(true)} style={{ margin: '0 5px' }}>Start</button>
        <button onClick={() => setIsRunning(false)} style={{ margin: '0 5px' }}>Pause</button>
        <button onClick={reset} style={{ margin: '0 5px' }}>Reset</button>
      </div>

      <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
        Level: <strong>{level}</strong> | XP: <strong>{xp}</strong>
      </p>
      <p style={{ fontSize: '0.95rem', color: '#666' }}>
        Misi Harian: <strong>{sessionsCompleted} / 4</strong> sesi selesai
      </p>
      <p style={{ fontSize: '1rem', marginTop: '1rem' }}>
        Fokus Hari Ini: <strong>{todayMinutes}</strong> menit
      </p>

      <FocusChart />
    </div>
  );
};

export default FocusApp;
