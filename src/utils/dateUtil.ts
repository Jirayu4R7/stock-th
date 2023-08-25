import { default as dayjs } from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra.js";
import duration from "dayjs/plugin/duration.js";
import "dayjs/locale/th";

dayjs.extend(duration);
dayjs.extend(buddhistEra);

export function dateDisplay(
  _value: dayjs.ConfigType,
  _format: string = "DD MMMM BBBB HH:mm:ss"
): string {
  return dayjs(_value).locale("th").format(_format);
}

export function checkDatePast(_value: dayjs.ConfigType): boolean {
  const isPast: boolean = dayjs().isAfter(dayjs(_value));
  return isPast;
}

export function dateDuration(_value: dayjs.ConfigType): string {
  const duration = dayjs.duration(dayjs(_value).diff(new Date()));
  let stringTime: string = "";

  if (duration.days() > 0) {
    stringTime = duration.format("D วัน  HH:mm:ss");
  } else {
    stringTime = duration.format("HH:mm:ss");
  }

  return stringTime;
}

export function dateTHResult(_value: dayjs.ConfigType): string {
  return dayjs(_value).locale("th").format("dddd DD/MM/BBBB");
}

export function dateFormatCustom(
  _value: dayjs.ConfigType,
  _format: string = "DD/MM/BBBB"
): string {
  return dayjs(_value).locale("th").format(_format);
}
