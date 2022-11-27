import { ActionType } from "../actions/action-types";
import { Repo } from "../state/types";

export const initiateState = (
  repos: Repo[],
  currentPage: number,
  rowsPerPage: number,
  filter: string
) => ({
  type: ActionType.USERS_FETCHED,
  payload: {
    allRepos: repos,
    currentPage: currentPage,
    rowsPerPage: rowsPerPage,
    filter: filter,
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

export const RowsPerPageChange = (rows: number) => ({
  type: ActionType.ROWS_PER_PAGE,
  payload: { rowsPerPage: rows },
});

export const FilterRepos = (repos: Repo[], filter: string) => ({
  type: ActionType.FILTER_REPOS,
  payload: { repos: repos, filter: filter },
});
