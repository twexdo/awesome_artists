import apiClient from './apiClient';

export const fetchProjectsRequest = async () => {
  const response = await apiClient.get('/projects');
  return response.data;
};

export const createProjectRequest = async (projectData: any) => {
  const response = await apiClient.post('/projects/create', projectData);
  return response.data;
};

export const updateProjectRequest = async (id: number, projectData: any) => {
  const response = await apiClient.post(`/projects/update/${id}`, projectData);
  return response.data;
};

export const deleteProjectRequest = async (id: number) => {
  await apiClient.delete(`/projects/delete/${id}`);
};
