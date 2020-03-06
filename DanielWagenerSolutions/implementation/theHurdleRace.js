function hurdleRace(k, height) {
  return Math.max(...height) > k ? Math.max(...height) - k : 0;
}
