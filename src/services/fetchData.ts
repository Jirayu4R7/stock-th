"use server";

import stockHighlightDataDummy from "@/db/stock-highlight-data.json";
import stockProfileDataDummy from "@/db/stock-profile.json";
import stockInfoDataDummy from "@/db/stock-info.json";
import companyProfileDataDummy from "@/db/company-profile.json";
import corporateActionsDataDummy from "@/db/corporate-actions.json";
import sectorIndexDataDummy from "@/db/sector-info.json";

import stockList from "@/db/stock-list.json";
import { StockSymbol } from "@/interface/StockSymbol";

const HEADER_REQUEST = {
  Accept: "application/json, text/plain, */*",
  Referer: "https://www.set.or.th",
};

const MODE: string = process.env.MODE || "DEV";
const HOST_API_URL: string =
  process.env.HOST_API_URL || "http://localhost:3000";

export const fetchStockSymbolList = async () => {
  const symbols: StockSymbol[] = stockList.securitySymbols
    .filter((value) => value.securityType === "S")
    .map((item) => item);
  return symbols;
};

const fetchData = async (url: string, cache: RequestCache) => {
  try {
    const response = await fetch(url, {
      headers: HEADER_REQUEST,
      cache: cache,
    });

    if (!response.ok) {
      const errorMessage = `Network response was not ok - Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // console.log(error);
    throw new Error("Error fetching data: " + error?.toString());
  }
};

type path_type =
  | "highlight-data"
  | "profile"
  | "info"
  | "corporate-action"
  | "company";
export const fetchStockInfo = async (
  symbol: string = "AOT",
  path: path_type = "profile"
) => {
  switch (MODE) {
    case "PROD": {
      let cache: RequestCache = "force-cache";
      if (path === "info") {
        cache = "no-cache";
      }
      const API_URL = `${HOST_API_URL}/set/info?symbol=${symbol}&path=${path}`;
      return fetchData(API_URL, cache);
    }
    default: {
      let data = null;
      switch (path) {
        case "highlight-data":
          data = stockHighlightDataDummy;
          break;
        case "profile":
          data = stockProfileDataDummy;
          break;
        case "info":
          data = stockInfoDataDummy;
          break;
        case "corporate-action":
          data = corporateActionsDataDummy;
          break;
        case "company":
          data = companyProfileDataDummy;
          break;
        default:
          data = null;
      }
      return data;
    }
  }
};

export const fetchSectorIndex = async () => {
  switch (MODE) {
    case "PROD": {
      try {
        const API_URL = `${HOST_API_URL}/set/index`;
        const response = await fetch(API_URL, {
          headers: HEADER_REQUEST,
        });

        if (!response.ok) {
          const errorMessage = `Network response was not ok - Status: ${response.status}`;
          throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error("error");
      }
      break;
    }
    default: {
      return sectorIndexDataDummy;
    }
  }
};
