import { ROWS_PER_PAGE_DEFAULT } from "../../constants";
import { UIState } from "./types";
export const INITIAL_STATE: UIState = {
  filteredRepos: [],
  allRepos: [],
  currentPage: 1,
  rowsPerPage: ROWS_PER_PAGE_DEFAULT,
  numberOfPages: 10,
};
