import { Repo } from "../redux/state/types";
import axios from "axios";
const RESOURCE_URL = "https://api.github.com/repositories";

export const fetchAllRepos = async (url = RESOURCE_URL) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: "token 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",
    },
  });
  const results = response.data;
  return results;
};

type PaginationProps = {
  filteredRepos: Repo[];
  currentPage: number;
  rowsPerPage: number;
  initialRowsPerPage?: number;
};

export function getPaginatedResults({
  filteredRepos,
  currentPage,
  rowsPerPage,
}: PaginationProps) {
  if (filteredRepos.length > 10) {
    const startIndex = rowsPerPage * (currentPage - 1);
    const endIndex = startIndex + rowsPerPage;

    return filteredRepos?.slice(startIndex, endIndex);
  } else {
    return filteredRepos;
  }
}

export const GetFilteredRepos = (
  currentPage: number,
  rowsPerPage: number,
  filter: string,
  allRepos: Repo[]
) => {
  function filterByValue(repos: Repo[], filter: string) {
    return repos.filter(
      (data) =>
        JSON.stringify(data).toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  }
  return filterByValue(allRepos, filter);
};

export const calculatePagination = (
  totalRepos: number,
  rowsPerPage: number
) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRepos / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

export const updatePageNumber = (
  pageNum: number,
  operation: string,
  max: number
) => {
  let newPageNum = 0;

  if (operation === "increase") {
    newPageNum = pageNum + 1;
  }
  if (operation === "decrease") {
    newPageNum = pageNum - 1;
  }

  if (newPageNum < 0) {
    return 0;
  } else if (newPageNum > max) {
    return max;
  } else {
    return newPageNum;
  }
};
