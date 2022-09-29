import { Divider, ListItem, Typography, Box } from '@mui/material';
import React from 'react';
import ClientBasicInfo from '../../components/profile/client/ClientBasicInfo';
import ClientPicture from '../../components/profile/client/ClientPicture';
import ClientUserInfo from '../../components/profile/client/ClientUserInfo';
import JobFeedback from '../../components/profile/client/JobFeedback';
import About from '../../components/profile/freelancer/About';
import Education from '../../components/profile/freelancer/Education';
import Experience from '../../components/profile/freelancer/Experience';
import Language from '../../components/profile/freelancer/Language';
import Skills from '../../components/profile/freelancer/Skills';

export default function FreelancerProfile() {
  return (
    <>
      <ListItem>
        <Typography ml={1}> Client profile </Typography>
      </ListItem>
      <Divider />
      <Box padding="5% 15% 10%" display="flex">
        <Box padding="10px" width='40%'>
          <ClientPicture />
          <ClientBasicInfo />
          <ClientUserInfo />
          <JobFeedback />
        </Box>
        <Box width='60%'>
          <About />
          <Skills />
          <Experience />
          <Education />
          <Language />
        </Box>

      </Box>
    </>
  )
}
