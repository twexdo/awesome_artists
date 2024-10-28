import React, { createContext, useState, useContext, useEffect } from 'react';
import { Project, ProjectContextType, CreateProject } from '../types';
import { fetchProjectsRequest , createProjectRequest, updateProjectRequest, deleteProjectRequest } from "../api/portfolio"
import { useAuth } from './AuthContext';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { isAuthenticated } = useAuth()
  // Fetch projects
  const fetchProjects = async () => {
    try {
      const fetchedProjects = await fetchProjectsRequest();
      setProjects(fetchedProjects);
    } catch (error) {
      setProjects([])
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(()=>{
    setProjects([])
    fetchProjects()
  },[isAuthenticated])

  // Add a new project
  const addProject = async (projectData: any) => {
    try {
      const newProject = await createProjectRequest(projectData);
      setProjects((prevProjects) => [...prevProjects, newProject]);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // Update an existing project
  const updateProject = async (id: number, updatedProjectData: any) => {
    try {
      const updatedProject = await updateProjectRequest(id, updatedProjectData);
      console.log("Stef update project",{id,updatedProjectData,updatedProject})
      setProjects((prevProjects:any) =>
        prevProjects.map((proj:any) => (proj.id === id ? updatedProject : proj))
      );
    } catch (error) {
    }
  };

  // Delete a project
  const deleteProject = async (id: number) => {
    try {
      await deleteProjectRequest(id);
      setProjects((prevProjects) => prevProjects.filter((proj) => proj.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, fetchProjects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProject must be used within a ProjectProvider');
  return context;
};
