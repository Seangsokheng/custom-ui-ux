import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { theme } from '../guest/theme';

const Dashboard: React.FC = () => {
    // Fictional data
    const totalMembers = 2587;
    const totalPosts = 1742;
    const totalClubs = 45;
    const pendingItems = 23;
  
    const membershipStatus = [
      { name: 'Active', value: 65, color: '#10B981' },
      { name: 'Inactive', value: 35, color: '#EF4444' },
      { name: 'Pending', value: 15, color: '#F59E0B' }
    ];
  
    const genderDistribution = [
      { name: 'Male', value: 65, color: '#3B82F6' },
      { name: 'Female', value: 35, color: '#10B981' }
    ];
  
    const DashboardCard = ({ 
      title, 
      value, 
      difference, 
      icon 
    }: { 
      title: string, 
      value: number, 
      difference: number, 
      icon: React.ReactNode 
    }) => (
      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            <Typography color="success.main" variant="body2">
              {difference} new today
            </Typography>
          </Box>
          {icon}
        </CardContent>
      </Card>
    );
  
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f4f4' }}>
          <Grid container spacing={3}>
            {/* Top Cards */}
            <Grid item xs={12} md={3}>
              <DashboardCard 
                title="Total Members" 
                value={totalMembers} 
                difference={12} 
                icon={<Box component="svg" sx={{ height: 50, width: 50, color: 'primary.main' }}>
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.5 17c0-2.757-2.243-5-5-5s-5 2.243-5 5h10zM16.5 17c0 2.761 2.239 5 5 5s5-2.239 5-5h-10z" />
                </Box>}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardCard 
                title="Total Posts" 
                value={totalPosts} 
                difference={12} 
                icon={<Box component="svg" sx={{ height: 50, width: 50, color: 'pink.main' }}>
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm3 1h8v8H6V5zm8 10v2H4v-2h10zM14 5v8h2V5h-2z" clipRule="evenodd" />
                </Box>}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardCard 
                title="Total Clubs" 
                value={totalClubs} 
                difference={12} 
                icon={<Box component="svg" sx={{ height: 50, width: 50, color: 'warning.main' }}>
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </Box>}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardCard 
                title="Pending" 
                value={pendingItems} 
                difference={12} 
                icon={<Box component="svg" sx={{ height: 50, width: 50, color: 'error.main' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </Box>}
              />
            </Grid>
  
            {/* Charts */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Membership Status
                  </Typography>
                  <Box sx={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={membershipStatus}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {membershipStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    {membershipStatus.map((status) => (
                      <Box key={status.name} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 16, 
                            height: 16, 
                            backgroundColor: status.color, 
                            mr: 1 
                          }} 
                        />
                        <Typography>{status.name}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Gender Distribution
                  </Typography>
                  <Box sx={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={genderDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {genderDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    {genderDistribution.map((gender) => (
                      <Box key={gender.name} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 16, 
                            height: 16, 
                            backgroundColor: gender.color, 
                            mr: 1 
                          }} 
                        />
                        <Typography>{gender.name}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    );
  };
  
  export default Dashboard;