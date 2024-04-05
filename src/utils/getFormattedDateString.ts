const getFormattedDateString = (date: Date) =>
  date.toISOString().split('T').join(' ').slice(0, -1);

export default getFormattedDateString;
