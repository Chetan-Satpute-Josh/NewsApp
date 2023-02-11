import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const isToday = (date: Date): boolean => {
  const today = new Date();

  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return date.toISOString() === today.toISOString();
};

export const formatDate = (date: Date): string => {
  const dayjsDate = dayjs(date);

  if (isToday(date)) {
    return `${dayjsDate.fromNow(true)} ago`;
  }

  return dayjsDate.format('ll');
};
