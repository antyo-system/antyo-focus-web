// Simpan total fokus hari ini (dalam detik)
export function saveFocusDuration(seconds) {
  const today = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem('focusDurations')) || {};
  data[today] = (data[today] || 0) + seconds;
  localStorage.setItem('focusDurations', JSON.stringify(data));
}

// Ambil durasi fokus hari ini (dalam detik)
export function getTodayFocusDuration() {
  const today = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem('focusDurations')) || {};
  return data[today] || 0;
}

// Ambil semua data durasi
export function getAllFocusDurations() {
  return JSON.parse(localStorage.getItem('focusDurations')) || {};
}

// Hitung streak: berapa hari berturut-turut user fokus >= 60 menit
export function getStreakCount(minSeconds = 3600) {
  const data = JSON.parse(localStorage.getItem('focusDurations')) || {};
  let streak = 0;

  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const value = data[key] || 0;

    if (value >= minSeconds) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
