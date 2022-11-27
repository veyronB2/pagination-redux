import { UIState, Action } from "../state/types";
import { INITIAL_STATE } from "../state/InitialState";
import { ActionType } from "../actions/action-types";
import { updatePageNumber, GetFilteredRepos } from "../../utils/utils";

const reducer = (state = INITIAL_STATE, action: Action): UIState => {
  const { payload } = action;

  const actionMapping: { [key: string]: Function } = {
    [ActionType.USERS_FETCHED]: initializeState,
    [ActionType.FILTER_REPOS]: filterRepos,
    [ActionType.SET_CURRENT_PAGE]: currentPage,
    [ActionType.INCREASE_CURRENT_PAGE]: nextPage,
    [ActionType.DECREASE_CURRENT_PAGE]: previousPage,
    [ActionType.ROWS_PER_PAGE]: newRowsPerPage,
  };

  return actionMapping[action.type] ? actionMapping[action.type]() : state;

  function initializeState(): UIState {
    const { allRepos, currentPage, rowsPerPage, filter } = payload;
    return {
      ...state,
      allRepos: payload.allRepos || [],
      filteredRepos: GetFilteredRepos(
        allRepos || [],
        currentPage!,
        rowsPerPage,
        filter!
      ),
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
