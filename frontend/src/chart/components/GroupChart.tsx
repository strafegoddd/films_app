import { Box, Button, Container } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
// import { axisClasses } from "@mui/x-charts/Axis";
import * as React from "react";
import SettingChart from "./SettingChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { tGroup } from "../groupdata";

type GroupChartProps = {
  data: tGroup;
};

function GroupChart({ data }: GroupChartProps) {
  const [series, setSeries] = React.useState({
    "Максимальный рейтинг": true,
    "Средний рейтинг": false,
    "Минимальный рейтинг": false,
  });

  const [isBar, setIsBar] = React.useState(true);

  let seriesY = Object.entries(series)
    .filter((item) => item[1] == true)
    .map((item: any) => {
      return { dataKey: item[0], label: item[0] };
    });

  const chartSetting = {
    height: 500,
    yAxis: [
      {
        label: "Рейтинг",
      },
    ],
    // sx: {
    //   [`.${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: "translate(-10px, 0)",
    //   },
    // },
  };

  return (
    <Container maxWidth="lg">
      {isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "Группа" }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: "bottom", horizontal: "center" },
            },
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "Группа" }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: "bottom", horizontal: "center" },
            },
          }}
          {...chartSetting}
        />
      )}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={() => setIsBar(!isBar)}
          sx={{ mb: 2 }}
        >
          {isBar ? 'Показать линейную диаграмму' : 'Показать столбчатую диаграмму'}
        </Button>
      </Box>
      <SettingChart series={series} setSeries={setSeries} />
    </Container>
  );
}

export default GroupChart;
