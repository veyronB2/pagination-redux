import React from "react";
import { Repo } from "../redux/state/types";
import { TABLE_HEADER } from "../constants";
import {
  STable,
  STBody,
  STBodyTR,
  STD,
  STH,
  STHead,
  STHeadTR,
  STimage,
} from "./styled-components/TableStyles";
type ReposProps = {
  filteredRepos: Repo[];
};

const Table: React.FC<ReposProps> = ({ filteredRepos }) => {
  return (
    <>
      <STable>
        <STHead>
          <STHeadTR>
            {TABLE_HEADER.map((item) => (
              <STH key={item}>{item}</STH>
            ))}
          </STHeadTR>
        </STHead>
        <STBody>
          {filteredRepos.map((repo, index) => (
            <STBodyTR key={repo.id}>
              <STD width="1rem">{index + 1}</STD>
              <STD width="7rem">
                <STimage src={repo.owner.avatar_url}></STimage>
              </STD>
              <STD width="9rem">{repo.owner.login}</STD>
              <STD width="12rem">{repo.name}</STD>
              <STD width="20rem">{repo.html_url}</STD>
              <STD width="25rem">{repo.description}</STD>
            </STBodyTR>
          ))}
        </STBody>
      </STable>
    </>
  );
};

export default React.memo(Table);
