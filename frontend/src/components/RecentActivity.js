import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const RecentActivity = ({ activities }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Recent Activities
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={`${activity.name} ${activity.action}`}
                secondary={`${activity.date} - ${activity.platform}`}
              />
            </ListItem>
            {index < activities.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default RecentActivity;