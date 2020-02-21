function dayOfProgrammer(year) {
  const gregorian = year > 1918;
  const switchover = year === 1918;

  const gregorianLeapYear = () => {
    if (!(year % 400)) {
      return true;
    }

    if (!(year % 4) && year % 100) {
      return true;
    }

    return false;
  };

  const julianLeapYear = year % 4 || gregorian ? false : true;

  const leapYear = (gregorian && gregorianLeapYear()) || julianLeapYear;

  const months = [
    31,
    switchover ? 15 : leapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];

  const { month, day } = months.reduce((acc, val, index) => {
    // RETURN EARLY if we've already found our Programmer Day and our accumulator is no longer a number
    if (isNaN(acc)) {
      return acc;
    }
    // Otherwise...

    // Add this month's days to accumulator
    acc = acc + val;

    if (acc < 256) {
      return acc;
    }

    // If the Programmer day is in this month, return this object:
    return {
      month: index + 1,
      day: val - (acc - 256)
    };
  }, 0);

  return `${day}.0${month}.${year}`;
  // As it turns out, the month is always going to be September. For better or worse, I let my algorithm figure that out for me.
}
