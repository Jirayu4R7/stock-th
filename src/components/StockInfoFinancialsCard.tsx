import * as React from "react";

import clsxm from "@/lib/clsxm";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { StockHighlightData } from "@/interface/StockHighlightData";
import { displayNumber } from "@/lib/currency";

type StockInfoFinancialsProps = {
  data: StockHighlightData | null;
} & React.ComponentPropsWithoutRef<"div">;

export default function StockInfoFinancialsCard({
  className,
  data,
  ...rest
}: StockInfoFinancialsProps) {
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
          <GridSection label="P/E" value={data.peRatio} />
          <GridSection label="P/BV" value={data.pbRatio} />
          <GridSection
            label="มูลค่าตามราคาตลาด (ล้าน)"
            value={`${displayNumber(data.marketCap / 1000000)}`}
          />
          <GridSection
            label="สัดส่วนหุ้นของผู้ถือหุ้นรายย่อย"
            value={data.percentFreeFloat.toFixed(2)}
          />
          {/* <GridSection label="EPS" value={data.marketCap} /> */}
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
