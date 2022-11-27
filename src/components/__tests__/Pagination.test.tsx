import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../components/styled-components/theme";

import Pagination from "../Pagination";

const combobox = () => {
  return screen.getByRole("combobox");
};

const renderComponent = (component: JSX.Element) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

test("combobox preset on initial render", () => {
  renderComponent(
    <Pagination
      rowsPerPage={10}
      totalRepos={100}
      currentPage={1}
      numberClick={jest.fn()}
      nextBtnClick={jest.fn()}
      previousBtnClick={jest.fn()}
      onChange={jest.fn()}
    />
  );
  expect(combobox()).toBeInTheDocument();
});

test("combobox default value ia 10", () => {
  renderComponent(
    <Pagination
      rowsPerPage={10}
      totalRepos={100}
      currentPage={1}
      numberClick={jest.fn()}
      nextBtnClick={jest.fn()}
      previousBtnClick={jest.fn()}
      onChange={jest.fn()}
    />
  );
  const defaultOption = screen.getByRole<HTMLOptionElement>("option", {
    name: "10",
  } as HTMLSelectElement).selected;

  expect(defaultOption).toBe(true);
});

test("correct number of options", () => {
  renderComponent(
    <Pagination
      rowsPerPage={10}
      totalRepos={100}
      currentPage={1}
      numberClick={jest.fn()}
      nextBtnClick={jest.fn()}
      previousBtnClick={jest.fn()}
      onChange={jest.fn()}
    />
  );
  const options = screen.getAllByRole("option");

  expect(options.length).toBe(3);
});

test("combo has correct label", () => {
  renderComponent(
    <Pagination
      rowsPerPage={10}
      totalRepos={100}
      currentPage={1}
      numberClick={jest.fn()}
      nextBtnClick={jest.fn()}
      previousBtnClick={jest.fn()}
      onChange={jest.fn()}
    />
  );
  const label = screen.getByText(/rows per page/i);
  expect(label).toBeInTheDocument();
});

test("has correct buttons", () => {
  renderComponent(
    <Pagination
      rowsPerPage={10}
      totalRepos={100}
      currentPage={1}
      numberClick={jest.fn()}
      nextBtnClick={jest.fn()}
      previousBtnClick={jest.fn()}
      onChange={jest.fn()}
    />
  );
  const prevButton = screen.getByRole("button", { name: /previous/i });
  const nextButton = screen.getByRole("button", { name: /next/i });
  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});

test("correct number of pages", () => {
  renderComponent(
    <Pagination
      rowsPerPage={10}
      totalRepos={100}
      currentPage={1}
      numberClick={jest.fn()}
      nextBtnClick={jest.fn()}
      previousBtnClick={jest.fn()}
      onChange={jest.fn()}
    />
  );
  const listitems = screen.getAllByRole("listitem");
  expect(listitems.length).toBe(10);
});

test("previous button disabled and next button is enabled", () => {
  renderComponent(
    <Pagination
      rowsPerPage={10}
      totalRepos={100}
      currentPage={1}
      numberClick={jest.fn()}
      nextBtnClick={jest.fn()}
      previousBtnClick={jest.fn()}
      onChange={jest.fn()}
    />
  );
  const prevButton = screen.getByRole("button", { name: /previous/i });
  const nextButton = screen.getByRole("button", { name: /next/i });
  expect(prevButton).toBeDisabled();
  expect(nextButton).not.toBeDisabled();
});
