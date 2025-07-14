import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Avatar, 
  Card, 
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  useTheme
} from '@mui/material';
import Sidebar from './Sidebar';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import { Doughnut, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import axios from 'axios';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const theme = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h6">Loading dashboard data...</Typography>
    </Box>
  );

  // Follower growth chart data
  const followerGrowthData = {
    labels: stats.followerGrowth.map(item => item.country),
    datasets: [
      {
        data: stats.followerGrowth.map(item => item.percentage),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.error.main,
          theme.palette.warning.main,
          theme.palette.info.main,
          theme.palette.success.main
        ],
        borderWidth: 1,
      }
    ]
  };

  // Engagement chart data
  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Likes',
        data: [12000, 19000, 15000, 21000, 18000, 25000, 22000],
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Comments',
        data: [3000, 5000, 4000, 7000, 6000, 8000, 5000],
        backgroundColor: theme.palette.secondary.main,
      }
    ]
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: theme.palette.background.default
      }}>
        {activeTab === 'overview' ? (
          <>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              Dashboard Overview
            </Typography>
            
            <Grid container spacing={3}>
              {/* Stats Cards */}
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard 
                  title="Followers" 
                  value={stats.followers.count} 
                  change={stats.followers.change} 
                  icon="👥"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard 
                  title="Likes" 
                  value={stats.likes.count} 
                  change={stats.likes.change} 
                  icon="👍"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard 
                  title="Comments" 
                  value={stats.comments.count} 
                  change={stats.comments.change} 
                  icon="💬"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard 
                  title="Reach" 
                  value={stats.reach.count} 
                  change={stats.reach.change} 
                  icon="👀"
                />
              </Grid>
              
              {/* Charts Section */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Weekly Engagement
                  </Typography>
                  <Bar 
                    data={engagementData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }}
                  />
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Audience Demographics
                  </Typography>
                  <Doughnut 
                    data={followerGrowthData}
                    options={{
                      responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                    }}
                  />
                </Paper>
              </Grid>
              
              {/* Recent Activities */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2 }}>
                  <RecentActivity activities={stats.recentActivities} />
                </Paper>
              </Grid>
              
              {/* Quick Stats */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Quick Stats
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Posts This Week:</Typography>
                    <Typography fontWeight="bold">12</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Engagement Rate:</Typography>
                    <Typography fontWeight="bold">4.8%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>New Followers:</Typography>
                    <Typography fontWeight="bold" color="success.main">+1,240</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Profile Visits:</Typography>
                    <Typography fontWeight="bold">8,542</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              Your Profile
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar 
                        sx={{ width: 80, height: 80, fontSize: '2rem' }}
                        src={user.avatar || ''}
                      >
                        {user.username?.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <EditIcon />
                      </IconButton>
                    }
                    title={user.username}
                    subheader="Social Media Influencer"
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        Joined {new Date(user.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {stats.followers.count.toLocaleString()} followers
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Account Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Username</Typography>
                      <Typography variant="body1">{user.username}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Email</Typography>
                      <Typography variant="body1">{user.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Account Created</Typography>
                      <Typography variant="body1">
                        {new Date(user.date).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Last Login</Typography>
                      <Typography variant="body1">
                        {new Date().toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" gutterBottom>
                    Social Media Statistics
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="subtitle2">Followers</Typography>
                      <Typography variant="h6">
                        {stats.followers.count.toLocaleString()}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color={stats.followers.change >= 0 ? 'success.main' : 'error.main'}
                      >
                        {stats.followers.change >= 0 ? '+' : ''}{stats.followers.change}%
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="subtitle2">Likes</Typography>
                      <Typography variant="h6">
                        {stats.likes.count.toLocaleString()}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color={stats.likes.change >= 0 ? 'success.main' : 'error.main'}
                      >
                        {stats.likes.change >= 0 ? '+' : ''}{stats.likes.change}%
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="subtitle2">Comments</Typography>
                      <Typography variant="h6">
                        {stats.comments.count.toLocaleString()}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color={stats.comments.change >= 0 ? 'success.main' : 'error.main'}
                      >
                        {stats.comments.change >= 0 ? '+' : ''}{stats.comments.change}%
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="subtitle2">Reach</Typography>
                      <Typography variant="h6">
                        {stats.reach.count.toLocaleString()}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color={stats.reach.change >= 0 ? 'success.main' : 'error.main'}
                      >
                        {stats.reach.change >= 0 ? '+' : ''}{stats.reach.change}%
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;