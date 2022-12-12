import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../components/styled-components/theme";
import Table from "../../components/Table";

const renderComponent = (component: JSX.Element) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const MockData = [
  {
    id: 1,
    name: "test name1",
    html_url: "https://testing.com",
    description: "Lorem ipsum",
    owner: { login: "test-user1", avatar_url: "https://test-avatars.com" },
  },
  {
    id: 2,
    name: "test name2",
    html_url: "https://testing.com",
    description: "Lorem ipsum",
    owner: { login: "test-user2", avatar_url: "https://test-avatars.com" },
  },
  {
    id: 3,
    name: "test name3",
    html_url: "https://testing.com",
    description: "Lorem ipsum",
    owner: { login: "test-user3", avatar_url: "https://test-avatars.com" },
  },
];

test("table is present", () => {
  renderComponent(<Table filteredRepos={MockData} />);
  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();
});

test("correct number of columns", () => {
  renderComponent(<Table filteredRepos={MockData} />);
  const headerRow = screen.getAllByRole("columnheader");
  expect(headerRow.length).toBe(6);
});

test("correct columns heading text", () => {
  renderComponent(<Table filteredRepos={MockData} />);
  expect(screen.getByText("#")).toBeInTheDocument();
  expect(screen.getByText(/picture/i)).toBeInTheDocument();
  expect(screen.getByText(/owner name/i)).toBeInTheDocument();
  expect(screen.getByText(/repo name/i)).toBeInTheDocument();
  expect(screen.getByText(/repo url/i)).toBeInTheDocument();
  expect(screen.getByText(/description/i)).toBeInTheDocument();
});

test("correct number of rows", () => {
  renderComponent(<Table filteredRepos={MockData} />);
  const rows = screen.getAllByRole("row");

  expect(rows.length).toBe(4); //header included
});
