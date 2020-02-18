import moment from 'moment';

export const addDays = (date, day) => {
  return moment(date)
    .add(day, 'day')
    .toDate();
};

export const addWeeks = (date, week) => {
  return moment(date)
    .add(week, 'week')
    .toDate();
};

export const addMonths = (date, month) => {
  return moment(date)
    .add(month, 'month')
    .toDate();
};

export const addYears = (date, year) => {
  return moment(date)
    .add(year, 'year')
    .toDate();
};

export const areIntervalsOverlapping = (interval1, interval2) => {
  return (
    (interval1.start <= interval2.start && interval1.end <= interval2.end) ||
    (interval2.start <= interval1.start && interval2.end <= interval1.end) ||
    (interval1.start <= interval2.start && interval1.end >= interval2.end) ||
    (interval2.start <= interval1.start && interval2.end >= interval1.end)
  );
};

export const startOfDay = date => {
  return moment(date)
    .startOf('day')
    .toDate();
};

export const endOfDay = date => {
  return moment(date)
    .endOf('day')
    .toDate();
};

export const startOfWeek = date => {
  return moment(date)
    .startOf('week')
    .toDate();
};

export const endOfWeek = date => {
  return moment(date)
    .endOf('week')
    .toDate();
};

export const startOfMonth = date => {
  return moment(date)
    .startOf('month')
    .toDate();
};

export const endOfMonth = date => {
  return moment(date)
    .endOf('month')
    .toDate();
};

export const isSameDay = (date1, date2) => {
  return moment(date1).isSame(moment(date2), 'day');
};

export const isSameWeek = (date1, date2) => {
  return moment(date1).isSame(moment(date2), 'week');
};

export const isSameMonth = (date1, date2) => {
  return moment(date1).isSame(moment(date2), 'month');
};

export const isSameYear = (date1, date2) => {
  return moment(date1).isSame(moment(date2), 'year');
};

export const differenceInCalendarDays = (date1, date2) => {
  return moment(date1).isSame(moment(date2), 'day');
};

export const differenceInCalendarWeeks = (date1, date2) => {
  return moment(date1).isSame(moment(date2), 'week');
};

export const differenceInCalendarMonths = (date1, date2) => {
  return moment(date1).isSame(moment(date2), 'month');
};

export const differenceInCalendarYears = (date1, date2) => {
  return moment(date1).isSame(moment(date2), 'year');
};

export const differenceInDays = (...args) => {
  return differenceInCalendarDays(...args);
};

export const min = array => {
  let min = Infinity;
  for (const date of array) {
    if (min > date) {
      min = date;
    }
  }

  return min;
};

export const max = array => {
  let max = -Infinity;
  for (const date of array) {
    if (max < date) {
      max = date;
    }
  }

  return max;
};

export const format = (date, format) => {
  return moment(date).format(format);
};

export const setMonth = (date, value) => {
  return moment(date)
    .month(value)
    .toDate();
};

export const setYear = (date, value) => {
  return moment(date)
    .year(value)
    .toDate();
};

export const isBefore = (date1, date2) => {
  return date1 < date2;
};

export const isAfter = (date1, date2) => {
  return date1 > date2;
};
