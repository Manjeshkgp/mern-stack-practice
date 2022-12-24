import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Chart, BarSeries,Tooltip } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import {
    ArgumentAxis,
    ValueAxis,
  } from '@devexpress/dx-react-chart-material-ui';
  import { EventTracker } from '@devexpress/dx-react-chart';
  import { scaleBand } from '@devexpress/dx-chart-core';
  import { ArgumentScale } from '@devexpress/dx-react-chart';
import dayjs from 'dayjs';
const TransactionChart = ({data}) => {
    const chartData = data.map((item)=>{
        item.month = dayjs().month(item._id-1).format("MMMM");
        return item;
      })
  return (
    <Paper sx={{margin:10}}>
      <Chart data={chartData}>
      <ArgumentScale factory={scaleBand}/>
          <ArgumentAxis />
          <ValueAxis />
        <BarSeries valueField="totalExpenses" argumentField="month"/>
        <Animation/>
        <EventTracker/>
        <Tooltip />
      </Chart>
    </Paper>
  );
};

export default TransactionChart;
