import * as React from "react";

import clsxm from "@/lib/clsxm";
import { Box } from "@mui/material";
import { StockProfile } from "@/interface/StockProfile";

type CardStockProfileProps = {
  profile: StockProfile;
} & React.ComponentPropsWithoutRef<"div">;

export default function CardStockProfile({
  className,
  profile,
  ...rest
}: CardStockProfileProps) {
  return (
    <div className={clsxm(["", className])} {...rest}>
      {/* <Card>
          <Typography align="center">{profile.symbol}</Typography>
          <Typography align="center">{profile.name}</Typography>
      </Card> */}
      <Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
          }}
        >
          <Box sx={{ color: "text.secondary" }}>{profile.symbol}</Box>
          <Box
            sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}
          >
            98.3 K
          </Box>
          <Box
            sx={{
              color: "success.dark",
              display: "inline",
              fontWeight: "bold",
              mx: 0.5,
              fontSize: 14,
            }}
          >
            +18.77%
          </Box>
          <Box
            sx={{ color: "text.secondary", display: "inline", fontSize: 14 }}
          >
            vs. last week
          </Box>
        </Box>
      </Box>
    </div>
  );
}
