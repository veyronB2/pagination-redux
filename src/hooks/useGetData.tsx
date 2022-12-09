import { useEffect, useState } from "react";
import { Repo } from "../redux/state/types";
import { fetchAllRepos } from "../utils/utils";

type QueryState<T> = {
  data: T;
  loading: boolean;
};

export const useGetData = () => {
  const [state, setState] = useState<QueryState<Repo[]>>({
    data: [],
    loading: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const allRepos = await fetchAllRepos();

    setState({ data: allRepos, loading: false });
  };

  return state;
};
