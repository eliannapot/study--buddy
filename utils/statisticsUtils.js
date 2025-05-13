import dayjs from 'dayjs';

export const getXPStats = (xpLog) => {
  const now = dayjs();
  const today = now.startOf('day');
  const thisWeek = now.subtract(7, 'day');

  let totalXP = 0;
  let todayXP = 0;
  let weekXP = 0;

  xpLog.forEach(entry => {
    const entryTime = dayjs(entry.timestamp);
    totalXP += entry.xp;

    if (entryTime.isAfter(today)) {
      todayXP += entry.xp;
    }

    if (entryTime.isAfter(thisWeek)) {
      weekXP += entry.xp;
    }
  });

  return {
    total: totalXP,
    today: todayXP,
    week: weekXP,
  };
};
