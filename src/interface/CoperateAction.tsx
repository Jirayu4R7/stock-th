export interface CoperateAction {
  symbol: string;
  name: string;
  caType: string;
  type: string;
  bookCloseDate: Date | null | undefined;
  recordDate: string;
  remark: string | null | undefined;
  paymentDate: string;
  beginOperation: string;
  endOperation: string;
  sourceOfDividend: string;
  dividend: number;
  currency: string;
  ratio: number | null | undefined;
  dividendType: string;
  xdate: string;
  isPaymented: boolean | null;
}
