const LEAP_YEARS = [3, 6, 8, 11, 14, 17, 19]

function splitFloat(num) {
  return [num - Math.floor(num), Math.floor(num)]
}

function isLeapYear(year) {
  const [cycles, re] = getCycles(year)
  return re + 1 in LEAP_YEARS
}

function getCycles(year) {
  year -= 1
  const [re, cycles] = splitFloat(year / 19)
  return [cycles, Math.round(re * 19)]
}

function getMonthsSinceCycle(num) {
  let months = 0
  for (let y = 1; y <= num; y++) {
    months += 12
    if (LEAP_YEARS.includes(y)) {
      months += 1
    }
  }
  return months
}

function getMonthsSinceBaharad(year) {
  const [cycles, re] = getCycles(year)
  return getMonthsSinceCycle(re) + (cycles * 235)
}

function getMoladTishrei(year) {
  const HOUR_AS_PARTS = 1080
  const DAY_AS_PARTS = HOUR_AS_PARTS * 24
  const WEEK_AS_PARTS = DAY_AS_PARTS * 7  // 181440
  const MONTH_AS_PARTS = (DAY_AS_PARTS * 29) + (HOUR_AS_PARTS * 12) + 793

  // Remainder of MONTH after removal of the entire weeks. (Week Modulo)
  const REMNANT_MONTH = MONTH_AS_PARTS % WEEK_AS_PARTS  // 39673

  // Molad "Baharad": (2 days. 5 hours. 204 parts )
  const BAHARAD = (DAY_AS_PARTS * 2) + (HOUR_AS_PARTS * 5) + 204;  // 57444

  // Molad Tishrei as parts.
  let mtParts = BAHARAD + (getMonthsSinceBaharad(year) * REMNANT_MONTH);

  // Molad Tishrei after Week Modulo:
  mtParts = mtParts % WEEK_AS_PARTS;

  let re, dayMt, hoursMt, partsMt;
  [re, dayMt] = splitFloat(mtParts / DAY_AS_PARTS);
  [re, hoursMt] = splitFloat(re * 24);
  partsMt = re * 1080;

  return [Math.round(dayMt), Math.round(hoursMt), Math.round(partsMt)];
}

function getRh(year) {
  let [dayMt, hoursMt, partsMt] = getMoladTishrei(year)

  if (dayMt == 3 && isLeapYear(year) == false) {
    if (hoursMt >= 10 || (hoursMt == 9 && partsMt >= 204)) {
      dayMt += 1
    }
  } else if (dayMt == 2 && isLeapYear(year - 1) == true) {
    if (hoursMt >= 16 || (hoursMt == 15 && partsMt >= 589)) {
      dayMt += 1
    }
  } else if (hoursMt >= 18) {
    dayMt += 1
  }

  if (dayMt == 1 || dayMt == 4 || dayMt == 6) {
    dayMt += 1
  }

  if (dayMt == 7) {
    dayMt = 0
  }

  return dayMt
}

function getYearType(year) {

  let diff = getRh(year + 1) - getRh(year)

  if (diff < 0) diff += 7
  diff = diff % 7

  if (isLeapYear(year)) {
    if (diff == 5) return 'ח'
    if (diff == 6) return 'כ'
    if (diff == 0) return 'ש'
  } else {
    if (diff == 3) return 'ח'
    if (diff == 4) return 'כ'
    if (diff == 5) return 'ש'
  }
}

function getYearLength(year) {
  let len = 354
  const type = getYearType(year)
  if (type == 'ח') len -= 1
  if (type == 'ש') len += 1
  if (isLeapYear(year)) len += 30
  return len
}

console.log(getYearLength(5782)) // 384
console.log(getMoladTishrei(5782)) //(3, 5, 497)
console.log(getYearType(5782)) // כ
console.log(getRh(5782)) // 3
console.log(getCycles(5782)) // 3
console.log(getMonthsSinceCycle(5782)) // 3
console.log(getMonthsSinceBaharad(5782)) // 3









