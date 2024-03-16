import clsxm from "@/lib/clsxm";
// import { StockInfo } from "@/interface/StockInfo";
import { Card, CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import "./style.css";
import { fetchStockInfo } from "@/services/fetchData";

type StockPriceCardProps = {
  // info: StockInfo | null;
  symbol: string;
} & React.ComponentPropsWithoutRef<"div">;

const Triangle = ({
  className,
  type,
}: {
  type?: "down" | "up";
} & React.ComponentPropsWithoutRef<"div">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    fill="currentColor"
    viewBox="0 -1 10 9"
    className={clsxm([className])}
    style={{ transform: type === "down" ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <path
      data-v-5b653890=""
      fillRule="evenodd"
      d="M4.61576 0.96018L0.683252 5.67916C0.411864 6.00482 0.643443 6.49925 1.06736 6.49925H8.93232C9.35624 6.49925 9.58782 6.00482 9.31643 5.67916L5.38398 0.960182C5.18408 0.720305 4.81565 0.720304 4.61576 0.96018Z"
    />
  </svg>
);

export default async function StockPriceCard({
  symbol,
  className,
  ...rest
}: StockPriceCardProps) {
  const info = await fetchStockInfo(symbol, "info");
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
                {/* {info.change! >= 0 ? "🟢" : "🔴"} */}
                {info.change! >= 0 ? <Triangle /> : <Triangle type="down" />}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
