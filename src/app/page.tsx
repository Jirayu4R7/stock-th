import CompanyCard from "@/components/CompanyCard";
import InputSymbol from "@/components/InputSymbol";
import StockInfoCard from "@/components/StockInfoCard";
import StockInfoDividendCard from "@/components/StockInfoDividendCard";
import StockInfoFinancialsCard from "@/components/StockInfoFinancialsCard";
import { Grid, Skeleton } from "@mui/material";
import { Suspense } from "react";
interface HomePageProps {
  searchParams?: {
    symbol?: string;
  };
}
export default async function Page({ searchParams }: HomePageProps) {
  const symbol = searchParams?.symbol;

  try {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputSymbol />
        </Grid>

        {symbol && (
          <>
            <Grid item xs={12}>
              <Suspense
                fallback={
                  <Skeleton variant="rounded" width={"100%"} height={"156px"} />
                }
              >
                <StockInfoCard symbol={symbol} />
              </Suspense>
            </Grid>
            <Grid item xs={12} md={6}>
              <Suspense
                fallback={
                  <Skeleton variant="rounded" width={"100%"} height={"156px"} />
                }
              >
                <StockInfoFinancialsCard symbol={symbol} />
              </Suspense>
            </Grid>
            <Grid item xs={12} md={6}>
              <Suspense
                fallback={
                  <Skeleton variant="rounded" width={"100%"} height={"156px"} />
                }
              >
                <StockInfoDividendCard symbol={symbol} />
              </Suspense>
            </Grid>
            <Grid item xs={12}>
              <Suspense
                fallback={
                  <Skeleton variant="rounded" width={"100%"} height={"156px"} />
                }
              >
                <CompanyCard symbol={symbol} />
              </Suspense>
            </Grid>
          </>
        )}
      </Grid>
    );
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return <p>Error fetching stock information</p>;
  }
}
