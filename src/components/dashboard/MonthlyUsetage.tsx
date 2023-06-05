import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowDownRight, IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '../shared/DashboardCard';

const YearlyBreakup = () => {
  // chart color

  const [data, setData] = useState({
    currentData: {
      total: 0,
      Day: 0,
      Month: 0
    },
    oldData: {
        Day: 0,
        Month: 0
    }
  })

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;
  const errorlight = '#fdede8';
  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [data.oldData.Month, data.currentData.Month]

  const getD = async () => {
    const res = await fetch("/api/getUsetage")
    const data = await res.json()
    setData(data)
  }

  useEffect(() => {
      getD()
  })

  const more = data.oldData.Month === 0 ? 1 : data.oldData.Month
  const less = data.currentData.Month === 0 ? 1 : data.currentData.Month

  return (
    <DashboardCard title="ยอดใช้งานรายเดือน">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {data.currentData.Month} ครั้ง
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
          { data.currentData.Month > data.oldData.Month ? 
          <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
            <IconArrowUpLeft width={20} color="#39B69A" />
          </Avatar>
          :
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar> }
            <Typography variant="subtitle2" fontWeight="600">
              { data.currentData.Month > data.oldData.Month ? `+${((data.currentData.Month - data.oldData.Month) / more ) * 100}%` : `-${((data.oldData.Month - data.currentData.Month) / less) * 100}%` }
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              เดือนก่อน
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                เดือนก่อน
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                ปัจจุบัน
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
