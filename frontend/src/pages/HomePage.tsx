import React, { useEffect, useState } from 'react';
import { useProject } from '../context/ProjectContext';
import ProjectsList from '../components/PortfolioList';
import UploadDialog from '../components/UploadDialog';
import { Box } from '@mui/material';
import { Project } from '../types';

const HomePage: React.FC = () => {
  const [project, setProject] = useState<Project | undefined>(undefined)
  return (
    <div>
      <div>
        <Box sx={{ position: "fixed", bottom: "2em", right: "2em", zIndex: 999 }}>
          <UploadDialog />
        </Box>
        <ProjectsList />
      </div>
    </div>
  );
};

export default HomePage;
