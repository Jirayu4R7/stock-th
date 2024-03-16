import Grid from "@mui/system/Unstable_Grid/Grid";
import watchlistSymbols from "@/db/watchlistSymbols.json";
import StockPriceCard from "@/components/StockPriceCard";
import NextLink from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";

export default async function Page() {
  const watchlistSymbolsList = watchlistSymbols;
  return (
    <>
      <Grid container spacing={1}>
        {watchlistSymbolsList.map((symbol: string) => {
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
