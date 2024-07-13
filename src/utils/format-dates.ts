import {
  format,
  getTime,
  formatDistanceToNow,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  formatDistance,
  Locale,
} from "date-fns";
import { enUS, tr } from "date-fns/locale";

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDay(date: InputValue, newFormat?: string) {
  const fm = newFormat || "d";

  return date ? format(new Date(date), fm) : "";
}
export function fMonth(date: InputValue, newFormat?: string) {
  const fm = newFormat || "MMM";

  return date ? format(new Date(date), fm) : "";
}

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || "p";

  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

export function isBetween(
  inputDate: Date | string | number,
  startDate: Date,
  endDate: Date
) {
  const date = new Date(inputDate);

  const results =
    new Date(date.toDateString()) >= new Date(startDate.toDateString()) &&
    new Date(date.toDateString()) <= new Date(endDate.toDateString());

  return results;
}

export function isAfter(startDate: Date | null, endDate: Date | null) {
  const results =
    startDate && endDate
      ? new Date(startDate).getTime() > new Date(endDate).getTime()
      : false;

  return results;
}
function stringToLocale(locale: string): Locale {
  switch (locale) {
    case "tr":
      return tr;
    case "en":
      return enUS;
    default:
      return enUS;
  }
}
export function getDurationSince(
  date: Date | string,
  locale: string,
  today: string,
  ago: string
): string {
  const currentDate = new Date();

  const yearsDifference = differenceInYears(currentDate, date);
  const monthsDifference = differenceInMonths(currentDate, date);
  const daysDifference = differenceInDays(currentDate, date);

  if (yearsDifference > 0) {
    return (
      formatDistance(date, currentDate, { locale: stringToLocale(locale) }) +
      ` ${ago}`
    );
  } else if (monthsDifference > 0) {
    return formatDistance(date, currentDate) + ` ${ago}`;
  } else if (daysDifference > 0) {
    return formatDistance(date, currentDate) + ` ${ago}`;
  } else {
    return today;
  }
}
