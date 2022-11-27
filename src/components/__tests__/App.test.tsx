import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { getStore } from "../../redux/store/store";
import App from "../../App";
import fetch from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";
import { MockData } from "./MockData";

const renderComponent = (component: JSX.Element) => {
  return render(<Provider store={getStore()}>{component}</Provider>);
};

test("search box is present", () => {
  renderComponent(<App />);
  const search = screen.getByPlaceholderText("Search...");
  expect(search).toBeInTheDocument();
});

test("table is present", () => {
  renderComponent(<App />);
  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();
});

test("correct number of columns", () => {
  renderComponent(<App />);
  const headerRow = screen.getAllByRole("columnheader");
  expect(headerRow.length).toBe(6);
});

test("correct columns heading text", () => {
  renderComponent(<App />);
  expect(screen.getByText("#")).toBeInTheDocument();
  expect(screen.getByText(/picture/i)).toBeInTheDocument();
  expect(screen.getByText(/owner name/i)).toBeInTheDocument();
  expect(screen.getByText(/repo name/i)).toBeInTheDocument();
  expect(screen.getByText(/repo url/i)).toBeInTheDocument();
  expect(screen.getByText(/description/i)).toBeInTheDocument();
});

test("combobox preset on initial render", () => {
  renderComponent(<App />);
  const combobox = screen.getByRole("combobox");
  expect(combobox).toBeInTheDocument();
});

test("combobox default value ia 10", () => {
  renderComponent(<App />);
  const defaultOption = screen.getByRole<HTMLOptionElement>("option", {
    name: "10",
  } as HTMLSelectElement).selected;

  expect(defaultOption).toBe(true);
});

test("correct number of options", () => {
  renderComponent(<App />);
  const options = screen.getAllByRole("option");

  expect(options.length).toBe(3);
});

test("combo has correct label", () => {
  renderComponent(<App />);
  const label = screen.getByText(/rows per page/i);
  expect(label).toBeInTheDocument();
});

test("has correct buttons", () => {
  renderComponent(<App />);
  const prevButton = screen.getByRole("button", { name: /previous/i });
  const nextButton = screen.getByRole("button", { name: /next/i });
  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});

// (global as any).fetch = jest.fn(() => {
//   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         MockData,
//       }),
//   });
// });

// test.only("correct number of pages", () => {
//   renderComponent(<App />);
//   const listitems = screen.getAllByRole("listitem");
//   expect(listitems.length).toBe(10);
// });

// test("previous button disabled and next button is enabled", () => {
//   renderComponent(<App />);
//   const prevButton = screen.getByRole("button", { name: /previous/i });
//   const nextButton = screen.getByRole("button", { name: /next/i });
//   expect(prevButton).toBeDisabled();
//   expect(nextButton).not.toBeDisabled();
// });
