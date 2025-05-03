export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export interface Project {
  id: string;
  name: string;
  department: string;
  status: "active" | "completed" | "pending";
  budget: number;
  manager: string;
  teamMembers: string[];
}

export interface MarketingBudgetResponse {
  averageBudget: number;
  activeCampaigns: number;
}

export interface EngineeringProjectsResponse {
  completedProjects: Project[];
}

export interface TopManagerResponse {
  manager: string;
  runningProjects: number;
  highBudgetProjects: number;
}

export interface ProjectsWithSameTeamResponse {
  projects: {
    name: string;
    teamMembers: string[];
  }[];
}

export interface DashboardDataResponse {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalBudget: number;
  departmentBreakdown: {
    [key: string]: {
      projects: number;
      budget: number;
    };
  };
}
