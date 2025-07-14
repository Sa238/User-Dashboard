import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Avatar
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const StatsCard = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Avatar sx={{ 
            bgcolor: isPositive ? 'success.light' : 'error.light',
            width: 40, 
            height: 40 
          }}>
            {icon}
          </Avatar>
        </Box>
        <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
          {value.toLocaleString()}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          color: isPositive ? 'success.main' : 'error.main'
        }}>
          {isPositive ? <ArrowUpward /> : <ArrowDownward />}
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'} from last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;