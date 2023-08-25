import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Autocomplete,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import CompanyCard from "@/components/CompanyCard";
import StockInfoDividendCard from "@/components/StockInfoDividendCard";
import StockInfoFinancialsCard from "@/components/StockInfoFinancialsCard";
import {
  fetchStockInfo,
  fetchSectorIndex,
  fetchStockSymbolList,
} from "@/services/fetchData";
import { StockHighlightData } from "@/interface/StockHighlightData";
import { CompanyProfile } from "@/interface/CompanyProfile";
import { CoperateAction } from "@/interface/CoperateAction";
// import { SectorInfo } from "@/interface/SectorInfo";
import SectorInfoList from "@/components/SectorInfoList";
import StockInfoCard from "@/components/StockInfoCard";
import { StockInfo } from "@/interface/StockInfo";
import { Box } from "@mui/system";

const DEFAULT_SYMBOL = "AOT";

export default function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qSymbol =
    queryParams.get("symbol")?.toLocaleUpperCase() || DEFAULT_SYMBOL;

  const [loading, setLoading] = useState(true);
  const [symbols, setSymbols] = useState<Array<string>>([]);
  const [symbol, setSymbol] = useState<string | null>(DEFAULT_SYMBOL);
  const [stockHighlightData, setStockHighlightData] =
    useState<StockHighlightData | null>(null);
  // const [stockProfileData, setStockProfileData] =
  //   useState<StockHighlightData | null>(null);
  const [corporateActions, setCorporateActions] = useState<
    Array<CoperateAction>
  >([]);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(
    null
  );
  const [sectorInfoListData, setSectorInfoListData] = useState<any | null>(
    null
  );
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);

  useEffect(() => {
    setLoading(true);
    setSymbols(fetchStockSymbolList());
    // setSymbol(qSymbol);
    Promise.all([
      fetchStockInfo(symbol || DEFAULT_SYMBOL, "company"),
      fetchStockInfo(symbol || DEFAULT_SYMBOL, "highlight-data"),
      // fetchStockInfo(symbol || DEFAULT_SYMBOL, "profile"),
      fetchStockInfo(symbol || DEFAULT_SYMBOL, "corporate-action"),
      fetchStockInfo(symbol || DEFAULT_SYMBOL, "info"),
      fetchSectorIndex(),
    ])
      .then(
        ([
          companyData,
          highlightData,
          // profileData,
          corporateActionData,
          stockInfoData,
          sectorIndexData,
        ]) => {
          if (companyData) {
            setCompanyProfile(companyData);
          }
          if (highlightData) {
            setStockHighlightData(highlightData);
          }
          // if (profileData) {
          //   setStockProfileData(profileData);
          // }
          if (corporateActionData) {
            setCorporateActions(corporateActionData);
          }
          if (stockInfoData) {
            setStockInfo(stockInfoData);
          }
          if (sectorIndexData) {
            setSectorInfoListData(sectorIndexData);
          }
        }
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [qSymbol, symbol]);

  return (
    <div>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={1} columns={12}>
          <Grid item xs={12}>
            <SectorInfoList
              sectorList={sectorInfoListData.indexIndustrySectors}
            />
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Autocomplete
                  disablePortal
                  id="symbols-box"
                  onChange={(_event, newValue) => {
                    setSymbol(newValue);
                  }}
                  options={symbols}
                  renderInput={(params) => (
                    <TextField {...params} label="" placeholder="ค้นหาหุ้น" />
                  )}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <StockInfoCard info={stockInfo} />
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              spacing={{ xs: 1, md: 1 }}
              columns={12}
            >
              <Grid item xs={12} md={6}>
                <StockInfoFinancialsCard data={stockHighlightData} />
              </Grid>
              <Grid item xs={12} md={6}>
                <StockInfoDividendCard
                  data={stockHighlightData}
                  corporateActions={corporateActions}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CompanyCard profile={companyProfile} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
