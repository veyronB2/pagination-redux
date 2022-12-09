import { ActionType } from "../actions/action-types";
import { Repo } from "../state/types";

export const initiateState = (
  currentPage: number,
  rowsPerPage: number,
  filter: string
) => ({
  type: ActionType.USERS_FETCHED,
  payload: {
    currentPage: currentPage,
    rowsPerPage: rowsPerPage,
    filter: filter,
  },
});

export const loadAllRepos = (
  repos: Repo[],
  currentPage: number,
  rowsPerPage: number
) => ({
  type: ActionType.INITIATE_ALL_REPOS,
  payload: {
    allRepos: repos,
    currentPage: currentPage,
    rowsPerPage: rowsPerPage,
  },
});

export const setCurrentPageNumber = (pageNumber: number) => ({
  type: ActionType.SET_CURRENT_PAGE,
  payload: { currentPage: pageNumber },
});

export const increasePageNumber = (pageNumber: number) => ({
  type: ActionType.INCREASE_CURRENT_PAGE,
  payload: { currentPage: pageNumber },
});

export const decreasePageNumber = (pageNumber: number) => ({
  type: ActionType.DECREASE_CURRENT_PAGE,
  payload: { currentPage: pageNumber },
});

export const RowsPerPageChange = (rows: number, pageNumber: number) => ({
  type: ActionType.ROWS_PER_PAGE,
  payload: { rowsPerPage: rows, currentPage: pageNumber },
});

export const FilterRepos = (repos: Repo[], filter: string) => ({
  type: ActionType.FILTER_REPOS,
  payload: { repos: repos, filter: filter },
});

export const paginateRepos = (
  filteredRepos: Repo[],
  rows: number,
  pageNumber: number
) => ({
  type: ActionType.PAGINATE_REPOS,
  payload: {
    filteredRepos: filteredRepos,
    rowsPerPage: rows,
    currentPage: pageNumber,
  },
});

export const updateFilter = (
  filter: string,
  rows: number,
  pageNumber: number,
  repos: Repo[]
) => ({
  type: ActionType.UPDATE_FILTER,
  payload: {
    filter: filter,
    currentPage: pageNumber,
    rowsPerPage: rows,
    allRepos: repos,
  },
});
