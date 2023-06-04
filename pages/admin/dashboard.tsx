import type { ReactElement } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';

// components
import SalesOverview from '../../src/components/dashboard/SalesOverview';
import YearlyBreakup from '../../src/components/dashboard/MonthlyUsetage';
import RecentTransactions from '../../src/components/dashboard/RecentUsetage';
import MonthlyEarnings from '../../src/components/dashboard/DailyUsetage';

export default function Dashboard() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <RecentTransactions />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
