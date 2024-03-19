import * as React from "react";
import { dateDisplay } from "@/utils/dateUtil";

import clsxm from "@/lib/clsxm";
import { fetchStockInfo } from "@/services/fetchData";
import { StockInfo } from "@/interface/StockInfo";
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

type StockInfoCardProps = {
  symbol: string;
  showTime?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

export default async function StockInfoCard({
  className,
  symbol,
  showTime = true,
  ...rest
}: StockInfoCardProps) {
  const info: StockInfo = await fetchStockInfo(symbol, "info");
  return info === null ? (
    <Typography>ไม่พบข้อมูล</Typography>
  ) : (
    <div className={clsxm(["", className])} {...rest}>
      <Card>
        <CardContent>
          {showTime && (
            <Typography align="right" fontSize={12}>
              ข้อมูลล่าสุด {dateDisplay(info.marketDateTime)}{" "}
            </Typography>
          )}

          <Stack
            direction={{ sm: "column", md: "row" }}
            justifyContent="space-between"
          >
            <Stack direction={"column"}>
              <Typography fontWeight={700} fontSize={18}>
                {info.symbol}
              </Typography>
              <Typography fontSize={16} fontWeight={300}>
                {info.nameTH}
              </Typography>
            </Stack>
            <Divider sx={{ display: { xs: "block", md: "none" } }} />
            {/* last price */}
            <Stack
              direction={"column"}
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
            >
              <Stack
                direction={"row"}
                alignItems="baseline"
                justifyContent={{ xs: "flex-start", md: "flex-end" }}
              >
                <Typography pr={0.4} fontSize={14} alignSelf={"self-end"}>
                  ล่าสุด
                </Typography>
                <Typography
                  fontSize={16}
                  variant={info.change! >= 0 ? "positive" : "negative"}
                >
                  {info.last}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: "flex-start", md: "flex-end" }}
              >
                <Typography
                  pr={0.4}
                  fontSize={14}
                  variant={info.change! >= 0 ? "positive" : "negative"}
                >
                  {info.change}
                </Typography>
                <Typography
                  fontSize={12}
                  variant={info.change! >= 0 ? "positive" : "negative"}
                >
                  ({info.percentChange?.toFixed(2)}%)
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ display: { xs: "block", md: "block" } }} />
          <Stack
            sx={{ pt: 0.2 }}
            direction={"row"}
            spacing={2}
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems="flex-end"
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Typography pr={0.4} fontSize={14}>
                เปิด
              </Typography>
              <Typography>{info.open} </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography pr={0.4} fontSize={14}>
                สูงสุด
              </Typography>
              <Typography variant="positive">{info.high} </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography pr={0.4} fontSize={14}>
                ต่ำสุด
              </Typography>
              <Typography variant="negative"> {info.low} </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
