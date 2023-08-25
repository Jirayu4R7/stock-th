import stockHighlightDataDummy from "@/db/stock-highlight-data.json";
import stockProfileDataDummy from "@/db/stock-profile.json";
import stockInfoDataDummy from "@/db/stock-info.json";
import companyProfileDataDummy from "@/db/company-profile.json";
import corporateActionsDataDummy from "@/db/corporate-actions.json";
import sectorIndexDataDummy from "@/db/sector-info.json";

import stockList from "@/db/stock-list.json";

const HEADER_REQUEST = {
  "sec-ch-ua":
    '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
  Accept: "application/json, text/plain, */*",
  Referer: "https://www.set.or.th",
  "sec-ch-ua-mobile": "?0",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203",
  "sec-ch-ua-platform": '"macOS"',
};

const MODE: string = import.meta.env.VITE_MODE;
const HOST_API_URL: string = import.meta.env.VITE_HOST_API_URL;

export const fetchStockSymbolList = () => {
  const symbols: string[] = stockList.securitySymbols
    .filter((value) => value.securityType === "S")
    .map((item) => item.symbol);
  return symbols;
};

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: HEADER_REQUEST,
    });

    if (!response.ok) {
      const errorMessage = `Network response was not ok - Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error fetching data: " + error?.toString());
  }
};

export const fetchStockInfo = async (
  symbol: string = "AOT",
  path: string = "profile"
) => {
  switch (MODE) {
    case "PROD": {
      const API_URL = `${HOST_API_URL}/set/info?symbol=${symbol}&path=${path}`;
      return fetchData(API_URL);
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
