export interface StockInfo {
  symbol: string | null | undefined;
  sign: string | null | undefined;
  prior: number | null | undefined;
  last: number | null | undefined;
  open: number | null | undefined;
  high: number | null | undefined;
  low: number | null | undefined;
  average: number | null | undefined;
  floor: number | null | undefined;
  ceiling: number | null | undefined;
  change: number | null | undefined;
  percentChange: number | null | undefined;
  totalVolume: number | null | undefined;
  totalValue: number | null | undefined;
  trVolume: number | null | undefined;
  trValue: number | null | undefined;
  aomVolume: number | null | undefined;
  aomValue: number | null | undefined;
  bids: Bid[];
  offers: Offer[];
  marketStatus: string | null | undefined;
  marketDateTime: string | null | undefined;
  securityType: string | null | undefined;
  tickSize: number | null | undefined;
  nameEN: string | null | undefined;
  nameTH: string | null | undefined;
  marketName: string | null | undefined;
  industryName: string | null | undefined;
  sectorName: string | null | undefined;
  isNPG: boolean | null | undefined;
  high52Weeks: number | null | undefined;
  low52Weeks: number | null | undefined;
  par: number | null | undefined;
  marketCap: number | null | undefined;
  inav: number | null | undefined;
  exercisePrice: number | null | undefined;
  exerciseRatio: string | null | undefined;
  maturityDate: Date | null | undefined;
  lastTradingDate: Date | null | undefined;
  underlying: string | null | undefined;
  pbRatio: number | null | undefined;
  nvdrNetVolume: number | null | undefined;
  dividendYield: number | null | undefined;
}

export interface Bid {
  volume: number | null | undefined;
  price: string | null | undefined;
}

export interface Offer {
  volume: number | null | undefined;
  price: string | null | undefined;
}
