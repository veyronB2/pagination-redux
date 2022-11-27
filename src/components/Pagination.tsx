import React, { useCallback } from "react";
import { ROWS_PER_PAGE } from "../constants";
import Button from "./Button";
import { STListItem } from "./styled-components/styledListItem";
import { STLabel, STSelect } from "./styled-components/styledCombo";
import {
  STPaginationContainer,
  STWrapper,
} from "./styled-components/styledPagination";

type PaginationProps = {
  rowsPerPage: number;
  totalRepos: number;
  currentPage: number;
  numberClick: (number: number) => void;
  nextBtnClick: (numOfPages: number) => void;
  previousBtnClick: (numOfPages: number) => void;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
const Pagination = ({
  rowsPerPage,
  totalRepos,
  currentPage,
  numberClick,
  nextBtnClick,
  previousBtnClick,
  onChange,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRepos / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleLinkClick = useCallback(
    (pageNumber: number) => {
      numberClick(pageNumber);
    },
    [numberClick]
  );

  const handlePrevBtnClick = useCallback(
    (numOfPages: number) => {
      previousBtnClick(numOfPages);
    },
    [previousBtnClick]
  );

  const handleNextBtnClick = useCallback(
    (numOfPages: number) => {
      nextBtnClick(numOfPages);
    },
    [nextBtnClick]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e);
    },
    [onChange]
  );
  return (
    <STPaginationContainer>
      <STWrapper>
        <Button
          btnText="previous"
          disabled={currentPage === pageNumbers[0] ? true : false}
          onClick={() => {
            handlePrevBtnClick(currentPage);
          }}
        />
        <ul>
          {pageNumbers.map((pageNumber, index) => (
            <STListItem
              onClick={() => handleLinkClick(pageNumber)}
              key={pageNumber}
              active={index + 1 === currentPage ? true : false}
            >
              {pageNumber}
            </STListItem>
          ))}
        </ul>

        <Button
          btnText="next"
          disabled={currentPage === pageNumbers.length ? true : false}
          onClick={() => {
            handleNextBtnClick(currentPage);
          }}
        />

        <div>
          <STLabel htmlFor="pages">rows per page</STLabel>
          <STSelect name="pages" id="" onChange={handleOnChange}>
            {ROWS_PER_PAGE.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </STSelect>
        </div>
      </STWrapper>
    </STPaginationContainer>
  );
};

export default React.memo(Pagination);
