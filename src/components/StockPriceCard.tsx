import clsxm from "@/lib/clsxm";
import { StockInfo } from "@/interface/StockInfo";
import { Card, CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";

type StockPriceCardProps = {
  info: StockInfo | null;
} & React.ComponentPropsWithoutRef<"div">;

export default function StockPriceCard({
  info,
  className,
  ...rest
}: StockPriceCardProps) {
  return info === null ? (
    <Typography>ไม่พบข้อมูล</Typography>
  ) : (
    <div className={clsxm(["", className])} {...rest}>
      <Card variant="outlined">
        <CardContent
          sx={{
            "&:last-child": {
              paddingBottom: "16px",
            },
            textDecoration: "none",
          }}
        >
          <Stack direction={"row"}>
            <Stack direction={"column"} flex="1">
              <Typography
                fontWeight={600}
                variant={info.change! >= 0 ? "positive" : "negative"}
              >
                {info.last?.toFixed(2)}
              </Typography>
              <Typography
                fontSize={14}
                variant={info.change! >= 0 ? "positive" : "negative"}
              >
                {info.change}
              </Typography>
              <Typography
                fontSize={14}
                variant={info.change! >= 0 ? "positive" : "negative"}
              >
                {info.percentChange?.toFixed(2)}%
              </Typography>
            </Stack>
            <Stack
              direction={"column"}
              justifyContent="space-around"
              alignItems="center"
            >
              <Typography fontWeight={700} variant="subtitle2">
                {info.symbol}
              </Typography>
              <Typography
                fontSize={20}
                variant={info.change! >= 0 ? "positive" : "negative"}
              >
                {info.change! >= 0 ? "🟢" : "🔴"}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
