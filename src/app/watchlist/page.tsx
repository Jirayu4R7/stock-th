import Grid from "@mui/system/Unstable_Grid/Grid";
import watchlistSymbolsDefault from "@/db/watchlistSymbols.json";
import StockPriceCard from "@/components/StockPriceCard";
import NextLink from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";

import { cookies } from "next/headers";
import { KEY_SYMBOL_LIST } from "@/constants";

export interface WatchSymbol {
  symbol: string;
  order?: number;
}

export default async function Page() {
  // const watchlistSymbolsList = watchlistSymbols;
  let watchlistSymbolsList: WatchSymbol[] = [];
  const watchlistSymbolsListString = cookies().get(KEY_SYMBOL_LIST)?.value;
  if (watchlistSymbolsListString) {
    watchlistSymbolsList = JSON.parse(
      watchlistSymbolsListString
    ) as WatchSymbol[];
  } else {
    watchlistSymbolsList = watchlistSymbolsDefault.map((symbol, index) => {
      return {
        symbol,
        order: index,
      };
    });
  }

  return (
    <>
      <Grid container spacing={1}>
        {watchlistSymbolsList.map(({ symbol }) => {
          return (
            <Grid key={symbol} xs={6} md={3}>
              <Suspense
                key={symbol}
                fallback={
                  <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                }
              >
                <NextLink
                  key={symbol}
                  href={{
                    pathname: "/",
                    query: { symbol: symbol },
                  }}
                >
                  <StockPriceCard symbol={symbol} />
                </NextLink>
              </Suspense>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
