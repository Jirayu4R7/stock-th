import { CoperateAction } from "@/interface/CoperateAction";
import dayjs from "dayjs";
export function countXDObjectsWithPreviousYearPayment(data: any[]): number {
  const currentYear = new Date().getFullYear();
  let count = 0;

  for (const item of data) {
    const paymentDateYear = new Date(item.paymentDate).getFullYear();
    if (item.type === "XD" && paymentDateYear === currentYear - 1) {
      count++;
    }
  }

  return count;
}

export function findLatestXDAction(
  data: CoperateAction[] | null
): CoperateAction | null {
  let latestXDObject: CoperateAction | null = null;

  const filteredData = data?.filter((value) => value.type === "XD");

  if (filteredData?.length === 0) {
    latestXDObject = null;
  } else {
    latestXDObject = filteredData?.reduce((max_dt, dt) => {
      const currentDate = new Date(dt.xdate);
      const maxDate = new Date(max_dt.xdate);
      return currentDate > maxDate ? dt : max_dt;
    });
  }

  if (latestXDObject !== null) {
    const isPaymented = dayjs().isAfter(dayjs(latestXDObject.paymentDate));
    latestXDObject.isPaymented = isPaymented;
  }

  return latestXDObject;
}

export function findPaymentDate(data: any[]): Date | null {
  let latestObject = null;

  for (const item of data) {
    if (
      !latestObject ||
      (new Date(item.xdate) > new Date(latestObject.xdate) &&
        item.type === "XD")
    ) {
      latestObject = item;
    }
  }

  return latestObject.paymentDate;
}
