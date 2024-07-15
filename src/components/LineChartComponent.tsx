"use client";
import { ChartsTooltip, ChartsYAxis } from "@mui/x-charts";
import { LinePlot, AreaPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { Box } from "@mui/material";
import { dateDisplay } from "@/utils/dateUtil";

import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";

export interface DataPoint {
  datetime: string;
  localDatetime: string;
  price: number;
  volume?: number | null;
  value?: number | null;
}

// Sample data
// const data: DataPoint[] = [
//   {
//     datetime: "2024-04-17T00:00:00+07:00",
//     localDatetime: "2024-04-17T00:00:00",
//     price: 18.8,
//     volume: 16119888,
//     value: 305438187.4,
//   },
//   {
//     datetime: "2024-04-18T00:00:00+07:00",
//     localDatetime: "2024-04-18T00:00:00",
//     price: 17.4,
//     volume: 14032741,
//     value: 243261858.3,
//   },
// ]

export default function LineChartComponent({ data }: { data: DataPoint[] }) {
  const xAxisData = data.map((point) => new Date(point.localDatetime));
  const seriesData = data.map((point) => {
    return point.price;
  });

  const [yAxisMax, yAxisMin] = [
    Math.max(...seriesData),
    Math.min(...seriesData),
  ];

  let color =
    seriesData[0] <= seriesData[seriesData.length - 1] ? "#5DF591" : "#F95D5D";

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Paper sx={{ width: "100%", height: 300 }} elevation={3}> */}
      <ResponsiveChartContainer
        height={320}
        xAxis={[
          {
            data: xAxisData,
            scaleType: "time",
            id: "x-axis-date",
            valueFormatter: (date) => {
              // return dateDisplay(date, "DD-MM-YYYY");
              return dateDisplay(date, "HH:mm");
            },
          },
        ]}
        series={[
          {
            type: "line",
            data: seriesData,
            area: true,
            color: color,
            yAxisKey: "y-axis-price",
          },
        ]}
        yAxis={[
          {
            id: "y-axis-price",
            scaleType: "log",
            max: yAxisMax + Math.abs(yAxisMax - yAxisMin) * 0.3,
            min: yAxisMin - Math.abs(yAxisMax - yAxisMin) * 0.3,
          },
        ]}
      >
        <LinePlot />
        <AreaPlot
          style={{
            fill: color,
            fillOpacity: 0.3,
          }}
        />
        <ChartsTooltip />
        <ChartsXAxis position="bottom" axisId="x-axis-date" resize="y" />
        <ChartsYAxis axisId={"y-axis-price"} />
      </ResponsiveChartContainer>
      {/* </Paper> */}
      {/* <Container>
        <Typography variant="h4" gutterBottom>
          Price Line Chart
        </Typography>
        <LineChart
          xAxis={[
            {
              id: "date",
              data: xAxisData,
              scaleType: "time",
              dataKey: "localDatetime",
              valueFormatter: (date) => {
                return dateDisplay(date, "DD-MM-YYYY");
              },
            },
          ]}
          series={[
            {
              data: seriesData,
              showMark: false,
            },
          ]}
          width={500}
          height={300}
        />
      </Container> */}
    </Box>
  );
}
