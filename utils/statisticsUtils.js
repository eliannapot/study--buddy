import dayjs from 'dayjs';

export const parseXPLog = (xpLogStrings) => {
  return xpLogStrings.map(entry => {
    const timestamp = entry.slice(0, 24);           // 0–23 (inclusive)
    const xp = parseInt(entry.slice(25, 26), 10);    // 25th character
    return {
      timestamp,
      xp,
    };
  }).filter(entry => !isNaN(entry.xp));
};

export const getXPStats = (xpEntries) => {
  const now = dayjs();
  const today = now.startOf('day');
  const thisWeek = now.subtract(7, 'day');
  const lastMonday = now.startOf('week').add(1, 'day'); 

  let totalXP = 0;
  let todayXP = 0;
  let weekXP = 0;
  let thisWeekXP = 0;

  xpEntries.forEach(({ timestamp, xp }) => {
    const entryTime = dayjs(timestamp);
    if (isNaN(xp) || !entryTime.isValid()) return;

    totalXP += xp;

    if (entryTime.isAfter(today)) {
      todayXP += xp;
    }

    if (entryTime.isAfter(thisWeek)) {
      weekXP += xp;
    }

    if (entryTime.isAfter(lastMonday)) {
      thisWeekXP += xp;
    }
  });

  return {
    total: totalXP,
    today: todayXP,
    week: weekXP,
    thisWeek: thisWeekXP,
  };
};