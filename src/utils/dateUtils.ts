import dayjs from "dayjs";

export interface DateUtilsInterface {
  format(timestamp: Date): string;
}

export class DateUtils implements DateUtilsInterface {
  format(timestamp: Date): string {
    return dayjs(timestamp).format("DD/MM/YY");
  }
}
