export interface Project {
  id: number;
  title: string;
  description: string;
  image?: any;
  imageUrl: string;
  clientLink: string;
  status: "hidden" | "visible";
}

export interface CreateProject {
  title: string;
  description: string;
  image?: string;
  clientLink?: string;
  status: "hidden" | "visible";
}

export interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ProjectContextType {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  addProject: (project: any) => Promise<void>;
  updateProject: (id: number, project: any) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
}
