import * as React from "react";

import clsxm from "@/lib/clsxm";
import { StockProfile } from "@/interface/StockProfile";
import StockProfileCard from "@/components/StockProfileCard";
import { Grid, Stack } from "@mui/material";

type StockProfileListProps = {
  stockList: Array<StockProfile>;
} & React.ComponentPropsWithoutRef<"div">;

export default function StockProfileList({
  className,
  stockList,
  ...rest
}: StockProfileListProps) {
  return (
    <div className={clsxm(["", className])} {...rest}>
      <Stack direction={"row"} spacing={1}>
        {stockList.map((stock) => (
          <StockProfileCard key={stock.symbol} profile={stock} />
        ))}
      </Stack>
    </div>
  );
}
