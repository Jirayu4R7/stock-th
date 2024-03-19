import * as React from "react";

import clsxm from "@/lib/clsxm";
import { fetchStockInfo } from "@/services/fetchData";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { StockHighlightData } from "@/interface/StockHighlightData";

type StockInfoFinancialsProps = {
  // data: StockHighlightData | null;
  symbol: string;
} & React.ComponentPropsWithoutRef<"div">;

export default async function StockInfoFinancialsCard({
  className,
  symbol,
  ...rest
}: StockInfoFinancialsProps) {
  const data: StockHighlightData = await fetchStockInfo(
    symbol,
    "highlight-data"
  );
  return (
    <Card className={clsxm(["", className])} {...rest}>
      <CardContent>
        <Grid>
          <Grid container>
            <Grid item>
              <Typography fontSize={18} fontWeight={600}>
                การเงิน
              </Typography>
            </Grid>
          </Grid>
          <GridSection label="P/E" value={data?.peRatio ?? "-"} />
          <GridSection label="P/BV" value={data?.pbRatio ?? "-"} />
          <GridSection
            label="มูลค่าตามราคาตลาด (พันล้าน)"
            value={`${Intl.NumberFormat("th-TH").format(
              (data?.marketCap ?? 0) / 1000000000
            )}`}
          />
          <GridSection
            label="สัดส่วนหุ้นของผู้ถือหุ้นรายย่อย"
            value={data?.percentFreeFloat.toFixed(2) ?? "-"}
          />
          {/* <GridSection label="EPS" value={data?.marketCap} /> */}
        </Grid>
      </CardContent>
    </Card>
  );
}

function GridSection({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">{value}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: 0.5, marginBottom: 0.5 }} />
    </>
  );
}
