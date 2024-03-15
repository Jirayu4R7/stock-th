// import StockInfoCard from "@/components/StockInfoCard";
import { fetchStockInfo } from "@/services/fetchData";
import Grid from "@mui/system/Unstable_Grid/Grid";
import watchlistSymbols from "@/db/watchlistSymbols.json";
import StockPriceCard from "@/components/StockPriceCard";
import NextLink from "next/link";

export default async function Page() {
  const watchlist = await Promise.all(
    watchlistSymbols.map((symbol) => fetchStockInfo(symbol, "info"))
  );

  return (
    <>
      <Grid container spacing={1}>
        {watchlist
          .sort((a, b) => b.change - a.change)
          .map((info) => {
            return (
              <>
                <Grid key={info.symbol} xs={6} md={3}>
                  <NextLink
                    key={info.symbol}
                    href={{
                      pathname: "/",
                      query: { symbol: info.symbol },
                    }}
                  >
                    <StockPriceCard info={info} />
                  </NextLink>
                </Grid>
              </>
            );
          })}
      </Grid>
    </>
  );
}
