import * as React from 'react';
import { Box, Divider, Paper, Typography, Rating, Avatar, styled } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SeeMoreBox } from '../../../commonStyle/CommonStyle';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 6,
  margin: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#fbbc05' : '#308fe8',
  },
}));


const clientFeedback = [{
  name: 'Perry Lance',
  value: 3,
  date: '2020-03-12',
  description: 'Delivered good work on this Node JS development project and I enjoyed working with him. His skills were reasonably strong. I enjoyed working with him.'
},
{
  name: 'Akira Suzuki',
  value: 5,
  date: '2020-03-12',
  description: 'Delivered good work on this Node JS development project and I enjoyed working with him. His skills were reasonably strong. I enjoyed working with him.'
},
{
  name: 'Perry Lance',
  value: 5,
  date: '2020-03-12',
  description: 'Delivered good work on this Node JS development project and I enjoyed working with him. His skills were reasonably strong. I enjoyed working with him.'
}];

export default function JobFeedback() {
  return (
    <Paper style={{ marginBottom: '20px', border: '1px solid #cccccc' }}>
      <Box style={{ padding: '20px' }}>
        <Typography style={{ fontSize: '20px' }}>
          Job feedback
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1, marginRight: '3%' }}>
            <BorderLinearProgress variant="determinate" value={100} />
            <BorderLinearProgress variant="determinate" value={80} />
            <BorderLinearProgress variant="determinate" value={30} />
            <BorderLinearProgress variant="determinate" value={60} />
            <BorderLinearProgress variant="determinate" value={10} />
          </Box>
          <Box>
            <Typography fontSize='48px' color='#757575'>4.3</Typography>
            <Rating size='small' value={3} readOnly />
            <Typography>58 reviews</Typography>
          </Box>
        </Box>
        <Divider />
        {
          clientFeedback.map((item, index) => {
            return (
              <Box key={index}>
                <Box style={{ display: 'flex', width: 'fit-content', margin: '10px' }}>
                  <Avatar style={{ marginRight: '10px' }} />
                  <Box>
                    <Typography fontSize='15px' >{item.name}</Typography>
                    <Box sx={{ display: 'flex' }}>
                      <Rating size="small" value={item.value} readOnly style={{ marginRight: '10px' }} />
                      <Typography fontSize='12px' color='#757575'>{item.date}</Typography>
                    </Box>
                  </Box>
                </Box >
                <Box>{item.description}</Box>
              </Box>
            )

          })
        }
      </Box>
      <SeeMoreBox >
        <Typography justifyContent='center'>See more</Typography>
        <KeyboardArrowDownIcon />
      </SeeMoreBox>
    </Paper>
  )
}
