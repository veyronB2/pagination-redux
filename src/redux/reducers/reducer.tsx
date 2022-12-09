import { UIState, Action } from "../state/types";
import { INITIAL_STATE } from "../state/InitialState";
import { ActionType } from "../actions/action-types";
import {
  updatePageNumber,
  GetFilteredRepos,
  getPaginatedResults,
} from "../../utils/utils";

const reducer = (state = INITIAL_STATE, action: Action): UIState => {
  const { payload } = action;

  const actionMapping: { [key: string]: Function } = {
    [ActionType.USERS_FETCHED]: initializeState,
    [ActionType.FILTER_REPOS]: filterRepos,
    [ActionType.SET_CURRENT_PAGE]: currentPage,
    [ActionType.INCREASE_CURRENT_PAGE]: nextPage,
    [ActionType.DECREASE_CURRENT_PAGE]: previousPage,
    [ActionType.ROWS_PER_PAGE]: newRowsPerPage,
    [ActionType.UPDATE_FILTER]: storeUserInput,
    [ActionType.INITIATE_ALL_REPOS]: initiateAllRepos,
    [ActionType.PAGINATE_REPOS]: paginateRepos,
  };

  return actionMapping[action.type] ? actionMapping[action.type]() : state;

  function initiateAllRepos() {
    const { allRepos, currentPage, rowsPerPage } = payload;
    return {
      ...state,
      allRepos: allRepos || [],
      filteredRepos: allRepos || [],
    };
  }

  function storeUserInput(): UIState {
    const { allRepos, currentPage, rowsPerPage, filter } = payload;
    return {
      ...state,
      filter: filter || "",
      filteredRepos: GetFilteredRepos(
        currentPage || 1,
        rowsPerPage,
        filter || "",
        allRepos || []
      ),
    };
  }

  function paginateRepos(): UIState {
    const { filteredRepos, currentPage, rowsPerPage } = payload;

    return {
      ...state,
      paginatedRepos: getPaginatedResults({
        filteredRepos: filteredRepos || [],
        currentPage: currentPage || 1,
        rowsPerPage: rowsPerPage,
      }),
    };
  }

  function initializeState(): UIState {
    return {
      ...state,
    };
  }

  // GetFilteredRepos
  function filterRepos(): UIState {
    return {
      ...state,
      rowsPerPage: payload.rowsPerPage,
    };
  }

  function newRowsPerPage(): UIState {
    return {
      ...state,
      rowsPerPage: payload.rowsPerPage,
      currentPage: payload.currentPage || 1,
    };
  }

  function currentPage(): UIState {
    return {
      ...state,
      currentPage: payload.currentPage || 1,
    };
  }

  function nextPage(): UIState {
    return {
      ...state,
      currentPage: updatePageNumber(
        payload.currentPage || 0,
        "increase",
        state.allRepos.length
      ),
    };
  }

  function previousPage(): UIState {
    return {
      ...state,
      currentPage: updatePageNumber(
        payload.currentPage || 0,
        "decrease",
        state.allRepos.length
      ),
    };
  }
};

export default reducer;
