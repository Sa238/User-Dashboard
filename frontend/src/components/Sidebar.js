import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Typography , Box
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Mail as InboxIcon,
  Group as CommunityIcon,
  AccountCircle as ProfileIcon,
  PostAdd as PostIcon,
  Bolt as BoostedIcon,
  Timeline as ActivityIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Help as HelpIcon
} from '@mui/icons-material';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <Box sx={{ 
      width: 250, 
      height: '100vh',
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      backgroundColor: 'background.paper'
    }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          MENU
        </Typography>
        <Divider />
      </Box>
      
      <List>
        <ListItem 
          button 
          selected={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem 
          button 
          selected={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        >
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary="Your Profile" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PostIcon />
          </ListItemIcon>
          <ListItemText primary="Post Schedules" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CommunityIcon />
          </ListItemIcon>
          <ListItemText primary="Community" />
        </ListItem>
      </List>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          ACCOUNTS
        </Typography>
      </Box>
      
      <List>
        <ListItem button>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText primary="Accounts" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PostIcon />
          </ListItemIcon>
          <ListItemText primary="My Posts" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BoostedIcon />
          </ListItemIcon>
          <ListItemText primary="Boosted Posts" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ActivityIcon />
          </ListItemIcon>
          <ListItemText primary="Activity" />
        </ListItem>
      </List>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          SUPPORT
        </Typography>
      </Box>
      
      <List>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText primary="Security" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Get Help" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;