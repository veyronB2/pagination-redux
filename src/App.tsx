import React, { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useGetData } from "./hooks/useGetData";
import { AppState } from "./redux/reducers/combineReducers";
import {
  paginateRepos,
  setCurrentPageNumber,
  increasePageNumber,
  decreasePageNumber,
  RowsPerPageChange,
  updateFilter,
  loadAllRepos,
} from "./redux/action-creators/action-creators";
import Table from "./components/Table";
import Pagination from "./components/Pagination";

import {
  StyledAppContainer,
  TableContainer,
} from "./components/styled-components/TableStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/styled-components/theme";
import { STInput } from "./components/styled-components/styledInput";
import { GlobalStyles } from "./components/styled-components/GlobalStyles";
function App() {
  const state = useSelector((state: AppState) => state.main);
  const { data: allRepos, loading } = useGetData();
  const dispatch = useDispatch();

  bindActionCreators(bindActionCreators, dispatch);

  useEffect(() => {
    dispatch(loadAllRepos(allRepos, state.currentPage, state.rowsPerPage));
  }, [allRepos, dispatch, state.currentPage, state.rowsPerPage]);

  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      updateFilter(
        e.target.value,
        state.currentPage,
        state.rowsPerPage,
        state.allRepos
      )
    );
  }

  useEffect(() => {
    dispatch(
      paginateRepos(state.filteredRepos, state.rowsPerPage, state.currentPage)
    );
  }, [
    dispatch,
    state.currentPage,
    state.filter,
    state.filteredRepos,
    state.rowsPerPage,
  ]);

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      dispatch(setCurrentPageNumber(pageNumber));
    },
    [dispatch]
  );

  const handleNextBtnClick = useCallback(
    (pageNumber: number) => {
      dispatch(increasePageNumber(pageNumber));
    },
    [dispatch]
  );

  const handlePrevBtnClick = useCallback(
    (pageNumber: number) => {
      dispatch(decreasePageNumber(pageNumber));
    },
    [dispatch]
  );

  const handleRowsPerPageChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(RowsPerPageChange(Number(target.value), 1));
    },
    [dispatch]
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledAppContainer>
        <STInput
          placeholder="Search..."
          type="text"
          onChange={handleUserInput}
        ></STInput>
        <TableContainer>
          <Table filteredRepos={state.paginatedRepos} />
        </TableContainer>
        <Pagination
          numberClick={handlePageChange}
          nextBtnClick={handleNextBtnClick}
          previousBtnClick={handlePrevBtnClick}
          rowsPerPage={state.rowsPerPage}
          totalRepos={state.filteredRepos.length} //TODO: pass total filtered results instead
          currentPage={state.currentPage}
          onChange={handleRowsPerPageChange}
        />
      </StyledAppContainer>
    </ThemeProvider>
  );
}

export default App;
