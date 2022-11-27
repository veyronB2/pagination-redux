import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useGetData } from "./hooks/useGetData";
import { AppState } from "./redux/reducers/combineReducers";
import {
  initiateState,
  setCurrentPageNumber,
  increasePageNumber,
  decreasePageNumber,
  RowsPerPageChange,
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
  const [userInput, setUserInput] = useState<string>(""); //TODO: move this to store
  const dispatch = useDispatch();

  bindActionCreators(bindActionCreators, dispatch);

  useEffect(() => {
    //TODO: change the way state is initiated
    if (allRepos && allRepos.length) {
      dispatch(
        initiateState(allRepos, state.currentPage, state.rowsPerPage, userInput)
      );
    }
  }, [dispatch, allRepos, state.currentPage, state.rowsPerPage, userInput]);

  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(e.target.value);
  }

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
      dispatch(RowsPerPageChange(Number(target.value)));
      dispatch(setCurrentPageNumber(1)); //TODO: dispatch one action and update this in reducer
    },
    [dispatch]
  );

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
          <Table filteredRepos={state.filteredRepos} />
        </TableContainer>
        <Pagination
          numberClick={handlePageChange}
          nextBtnClick={handleNextBtnClick}
          previousBtnClick={handlePrevBtnClick}
          rowsPerPage={state.rowsPerPage}
          totalRepos={state.allRepos.length} //TODO: pass total filtered results instead
          currentPage={state.currentPage}
          onChange={handleRowsPerPageChange}
        />
      </StyledAppContainer>
    </ThemeProvider>
  );
}

export default App;
