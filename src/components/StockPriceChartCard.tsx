import LineChartComponent from "@/components/LineChartComponent";
import clsxm from "@/lib/clsxm";
import { fetchStockInfo } from "@/services/fetchData";
import { Card, Typography } from "@mui/material";

type StockPriceChartCardProps = {
  symbol: string;
} & React.ComponentPropsWithoutRef<"div">;
export default async function StockPriceChartCard({
  symbol,
  className,
  ...rest
}: StockPriceChartCardProps) {
  const info = await fetchStockInfo(symbol, "price");
  return info === null ? (
    <Typography>ไม่พบข้อมูล</Typography>
  ) : (
    <Card className={clsxm(["", className])} {...rest}>
      <LineChartComponent data={info.quotations} />
    </Card>
  );
}
