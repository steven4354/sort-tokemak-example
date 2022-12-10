export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function mapMonthToNumber(month: string): number {
  // use the indexOf method to find the position of the given month in the monthNames array
  const monthIndex = monthNames.indexOf(month);

  // return the index of the month in the monthNames array + 1 (to convert the index to a 1-based month number)
  return monthIndex + 1;
}
