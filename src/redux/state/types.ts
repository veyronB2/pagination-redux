import { ActionType } from "../actions/action-types";

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
};

export type UIState = {
  filter: string;
  filteredRepos: Repo[];
  paginatedRepos: Repo[];
  allRepos: Repo[];
  currentPage: number;
  rowsPerPage: number;
  numberOfPages: number;
};

export type Action = {
  type: ActionType;
  payload: Payload;
};

export type Payload = {
  filter?: string;
  allRepos?: Repo[];
  filteredRepos?: Repo[];
  currentPage?: number;
  rowsPerPage: number;
};
