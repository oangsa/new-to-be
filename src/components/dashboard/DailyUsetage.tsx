import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';
import { IconArrowUpLeft } from '@tabler/icons-react';
const MonthlyEarnings = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  const successlight = theme.palette.success.light;
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart: any = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

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

  const getD = async () => {
    const res = await fetch("/api/getUsetage")
    const data = await res.json()
    setData(data)
  }

  useEffect(() => {
      getD()
  })
  const more = data.oldData.Day === 0 ? 1 : data.oldData.Day
  const less = data.currentData.Day === 0 ? 1 : data.currentData.Day
  return (
    <DashboardCard
      title="การเข้าใช้งานรายวัน"
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {data.currentData.Day} ครั้ง
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          { data.currentData.Day > data.oldData.Day ? 
          <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
            <IconArrowUpLeft width={20} color="#39B69A" />
          </Avatar>
          :
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar> }
          
          <Typography variant="subtitle2" fontWeight="600">
          { data.currentData.Day > data.oldData.Day ? `+${((data.currentData.Day - data.oldData.Day) / more ) * 100}%` : `-${((data.oldData.Day - data.currentData.Day) / less) * 100}%` }
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            จากเมื่อวาน
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
