import * as React from "react";
import { dateDisplay } from "@/utils/dateUtil";

import clsxm from "@/lib/clsxm";
import { StockInfo } from "@/interface/StockInfo";
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

type StockInfoCardProps = {
  info: StockInfo | null;
} & React.ComponentPropsWithoutRef<"div">;

export default function StockInfoCard({
  className,
  info,
  ...rest
}: StockInfoCardProps) {
  return info === null ? (
    <Typography>ไม่พบข้อมูล</Typography>
  ) : (
    <div className={clsxm(["", className])} {...rest}>
      <Card>
        <CardContent>
          <Typography align="right" fontSize={12}>
            ข้อมูลล่าสุด {dateDisplay(info.marketDateTime)}{" "}
          </Typography>
          <Stack
            direction={{ sm: "column", md: "row" }}
            justifyContent="space-between"
          >
            <Stack direction={"column"}>
              <Typography fontWeight={700} fontSize={20}>
                {info.symbol}
              </Typography>
              <Typography fontSize={18}>{info.nameTH}</Typography>
            </Stack>
            <Divider sx={{ display: { xs: "block", md: "none" } }} />
            <Stack
              direction={"column"}
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
            >
              <Stack direction={"row"}>
                <Typography pr={0.4} fontSize={14} alignSelf={"self-end"}>
                  ล่าสุด{" "}
                </Typography>
                <Typography
                  variant={info.change! >= 0 ? "positive" : "negative"}
                >
                  {info.last}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="baseline"
                justifyContent={{ xs: "flex-start", md: "flex-end" }}
              >
                {/* <Typography pr={0.4} fontSize={14} alignSelf={"self-end"}>
                  เปลี่ยนแปลง {info.change}
                </Typography> */}
                <Typography
                  fontSize={14}
                  variant={info.change! >= 0 ? "positive" : "negative"}
                >
                  ({info.percentChange?.toFixed(2)}%)
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* <Divider sx={{ display: { xs: "none", md: "block" } }} /> */}
          <Divider sx={{ display: { xs: "block", md: "block" } }} />
          <Stack
            sx={{ pt: 0.2 }}
            direction={"row"}
            spacing={2}
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems="flex-end"
          >
            <Typography>เปิด {info.open} </Typography>
            <Stack direction={"row"}>
              <Typography pr={0.4}>สูงสุด</Typography>
              <Typography variant="positive">{info.high} </Typography>
            </Stack>
            <Stack direction={"row"}>
              <Typography pr={0.4}>ต่ำสุด</Typography>
              <Typography variant="negative"> {info.low} </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
