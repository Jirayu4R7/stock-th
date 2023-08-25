import * as React from "react";

import clsxm from "@/lib/clsxm";
import { Box, Grid, Typography } from "@mui/material";
import { SectorInfo } from "@/interface/SectorInfo";

type SectorInfoListProps = {
  sectorList: Array<SectorInfo>;
} & React.ComponentPropsWithoutRef<"div">;

export default function SectorInfoList({
  className,
  sectorList: sectorList,
  ...rest
}: SectorInfoListProps) {
  const renderChange = (change: number, percentChange: number) => {
    const positiveChange = change > 0;
    const changeColor = positiveChange ? "success.main" : "error.main";

    return (
      <Box
        sx={{
          color: changeColor,
          display: "inline",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {positiveChange ? "+" : ""}
        {change}{" "}
        <Typography
          fontSize={10}
          mt={-1}
          fontWeight="light"
          variant={change > 0 ? "positive" : "negative"}
        >
          ({percentChange}%)
        </Typography>
      </Box>
    );
  };

  return (
    <Grid
      className={clsxm("", className)}
      container
      justifyContent="center"
      {...rest}
      columns={{ xs: 6, md: 12 }}
      spacing={0.5}
    >
      {/* <Stack
        direction="row"
        spacing={1}
        justifyContent="start"
        alignItems="center"
        sx={{ maxWidth: "100%", overflowX: "auto" }}
      > */}
      {sectorList
        .filter((value) => value.nameTH !== "SETCLMV")
        .map((sector) => (
          <Grid item xs={3} key={sector.symbol}>
            <Box minWidth={120} flexShrink={0}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                  minWidth: 72,
                }}
              >
                <Box
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    pb: 0,
                    fontWeight: "bold",
                  }}
                >
                  {sector.symbol}
                </Box>
                {renderChange(sector.change, sector.percentChange)}
                <Box sx={{ color: "text.primary", fontSize: 12 }}>
                  {sector.last}
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      {/* </Stack> */}
    </Grid>
  );
}
