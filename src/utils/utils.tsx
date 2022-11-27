import { Repo } from "../redux/state/types";
const RESOURCE_URL = "https://api.github.com/repositories";

const fetchOwnerDetails = (repoId: string, url: string) => {
  return new Promise(async (resolve, reject) => {
    const data = await fetch(url);
    resolve({ [repoId]: data.json() });
  });
};

export const fetchAllRepos = async (url = RESOURCE_URL) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "token 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",
      },
    });
    const repos = await response.json();

    const promises = repos.map((repo: any) =>
      fetchOwnerDetails(repo.id, repo.owner.url)
    );

    const data = await Promise.all(promises);

    console.log({ data });

    return repos;
  } catch (error) {
    console.log(error);
  }
};

type PaginationProps = {
  allRepos?: Repo[];
  initialRowsPerPage?: number;
  currentPage: number;
  rowsPerPage: number;
};

export function getPaginatedResults({
  allRepos = [],
  currentPage,
  rowsPerPage,
}: PaginationProps) {
  const startIndex = rowsPerPage * (currentPage - 1);
  const endIndex = startIndex + rowsPerPage;

  return allRepos?.slice(startIndex, endIndex);
}

export const GetFilteredRepos = (
  allRepos: Repo[],
  currentPage: number,
  rowsPerPage: number,
  filter: string
) => {
  const paginatedData = getPaginatedResults({
    allRepos: allRepos,
    rowsPerPage: rowsPerPage,
    currentPage: currentPage,
  });

  function filterByValue(array: Repo[], filter: string) {
    return array.filter(
      (data) =>
        JSON.stringify(data).toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  }

  return filterByValue(paginatedData, filter);
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
