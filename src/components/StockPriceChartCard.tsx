"use client";
import LineChartComponent, { DataPoint } from "@/components/LineChartComponent";
import clsxm from "@/lib/clsxm";
import { fetchStockInfo } from "@/services/fetchData";
import {
  Card,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Stack } from "@mui/system";

type StockPriceChartCardProps = {
  symbol: string;
  initPeriod?: string;
} & React.ComponentPropsWithoutRef<"div">;

interface StockPriceChart {
  quotations: DataPoint[];
}
export default function StockPriceChartCard({
  symbol,
  className,
  initPeriod,
  ...rest
}: StockPriceChartCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("1D");
  const [info, setInfo] = useState<StockPriceChart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      getStockPrice(symbol, period).then((info) => {
        setInfo(info);
        setIsLoading(false);
      });
    };
    fetchData();
  }, [symbol, period]);

  async function getStockPrice(_symbol: string, _period: string) {
    let info: StockPriceChart = await fetchStockInfo(_symbol, "price", _period);
    return info;
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <CircularProgress />
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return info === null ? (
    <Card>
      <CardContent>
        <Typography>ไม่พบข้อมูล</Typography>
      </CardContent>
    </Card>
  ) : (
    <Card className={clsxm([className])} {...rest}>
      <CardContent>
        <Stack
          direction={"row"}
          spacing={0.5}
          sx={{
            justifyContent: "flex-end",
            alignItems: "baseline",
          }}
        >
          <FormControl style={{ marginBottom: -32 }}>
            <InputLabel id="select-period">Period</InputLabel>
            <Select
              inputProps={{ "aria-label": "Without label" }}
              labelId="period-select-label"
              id="period-select"
              value={period}
              label="Period"
              onChange={(e) => {
                setPeriod(e.target.value as string);
              }}
            >
              <MenuItem value={"1D"}>1D</MenuItem>
              <MenuItem value={"1M"}>1M</MenuItem>
              <MenuItem value={"3M"}>3M</MenuItem>
              <MenuItem value={"1Y"}>1Y</MenuItem>
              <MenuItem value={"3Y"}>3Y</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <LineChartComponent
          period={period}
          data={info.quotations.filter((q: DataPoint) => {
            return q.price != null;
          })}
        />
      </CardContent>
    </Card>
  );
}
