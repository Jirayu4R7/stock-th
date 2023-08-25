import * as React from "react";
import { dateFormatCustom } from "@/utils/dateUtil";
import clsxm from "@/lib/clsxm";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { StockHighlightData } from "@/interface/StockHighlightData";
// import corporateActions from "@/db/corporate-actions.json";

import { findLatestXDAction } from "@/lib/dividendCalculate";
import { CoperateAction } from "@/interface/CoperateAction";

type StockInfoDividendCardProps = {
  data: StockHighlightData | null;
  corporateActions: Array<CoperateAction> | null;
} & React.ComponentPropsWithoutRef<"div">;

export default function StockInfoDividendCard({
  className,
  data,
  corporateActions,
  ...rest
}: StockInfoDividendCardProps) {
  const latestXD = findLatestXDAction(corporateActions);
  return (
    <Card className={clsxm(["", className])} {...rest}>
      <CardContent>
        <Grid>
          <Grid container>
            <Grid item>
              <Typography fontSize={18} fontWeight={600}>
                เงินปันผล
              </Typography>
            </Grid>
          </Grid>
          {/* <GridSection
            label="เงินปันผลในปีก่อนหน้า"
            value={`ปีละ ${dividendFrequency} ครั้ง`}
          /> */}
          <GridSection
            label="อัตราส่วนเงินปันผลตอบแทนย้อนหลัง 12 เดือน (%)"
            value={data?.dividendYield12M ?? "-"}
          />
          <GridSection
            label={
              latestXD?.isPaymented
                ? "เงินปันผล (บาท)"
                : "เงินปันผลครั้งต่อไป (บาท)"
            }
            value={latestXD?.dividend ?? "งดจ่ายปันผล"}
          />
          <GridSection
            label="วันปิดสมุดทะเบียนปันผล (XD)"
            value={
              latestXD ? dateFormatCustom(latestXD?.xdate, "D MMM BBBB") : "-"
            }
          />
          <GridSection
            label={
              latestXD?.isPaymented ? "วันจ่ายปันผล" : "วันจ่ายปันผลครั้งต่อไป"
            }
            value={
              latestXD
                ? dateFormatCustom(latestXD?.paymentDate, "D MMM BBBB")
                : "-"
            }
          />
        </Grid>
      </CardContent>
    </Card>
  );
}

function GridSection({
  label,
  value,
}: {
  label: string | null;
  value: string | number;
}) {
  return (
    <>
      <Grid container spacing={2} direction="row">
        <Grid item xs={8}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align="right">{value}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: 0.5, marginBottom: 0.5 }} />
    </>
  );
}
