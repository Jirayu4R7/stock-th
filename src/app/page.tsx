import CompanyCard from "@/components/CompanyCard";
import InputSymbol from "@/components/InputSymbol";
import StockInfoCard from "@/components/StockInfoCard";
import StockInfoDividendCard from "@/components/StockInfoDividendCard";
import StockInfoFinancialsCard from "@/components/StockInfoFinancialsCard";
import { fetchStockInfo } from "@/services/fetchData";
import { Grid } from "@mui/material";
interface HomePageProps {
  searchParams?: {
    symbol?: string;
  };
}
export default async function Page({ searchParams }: HomePageProps) {
  const symbol = searchParams?.symbol;

  try {
    const [companyData, stockInfo, stockHighlightData, corporateActions] =
      await Promise.all([
        fetchStockInfo(symbol, "company"),
        fetchStockInfo(symbol, "info"),
        fetchStockInfo(symbol, "highlight-data"),
        fetchStockInfo(symbol, "corporate-action"),
      ]);

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputSymbol />
        </Grid>

        {symbol && (
          <>
            <Grid item xs={12}>
              <StockInfoCard info={stockInfo} />
            </Grid>
            <Grid item xs={12} md={6}>
              <StockInfoFinancialsCard data={stockHighlightData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <StockInfoDividendCard
                data={stockHighlightData}
                corporateActions={corporateActions}
              />
            </Grid>
            <Grid item xs={12}>
              <CompanyCard profile={companyData} />
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
