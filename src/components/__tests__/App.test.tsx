import {
  screen,
  render,
  findAllByRole,
  getByPlaceholderText,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { getStore } from "../../redux/store/store";
import App from "../../App";
import { MockData } from "../../MockData/MockData";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://api.github.com/repositories", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MockData));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const renderComponent = (component: JSX.Element) => {
  return render(<Provider store={getStore()}>{component}</Provider>);
};

test("search box is present", async () => {
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

test("correct number of pages shown", async () => {
  renderComponent(<App />);
  const listitems = await screen.findAllByRole("listitem");
  expect(listitems.length).toBe(3);
});

test("previous button disabled and next button is enabled", async () => {
  renderComponent(<App />);
  const prevButton = await screen.findByRole("button", { name: /previous/i });
  const nextButton = await screen.findByRole("button", { name: /next/i });
  const listitems = await screen.findAllByRole("listitem");

  expect(prevButton).toBeDisabled();
  expect(nextButton).not.toBeDisabled();
});

test("default number of rows is correct", async () => {
  renderComponent(<App />);
  const listitems = await screen.findAllByRole("listitem");
  const rows = await screen.findAllByRole("row");
  expect(rows.length).toBe(11); //including header
});

test.only("next button is disabled and previous enable on next button click", async () => {
  renderComponent(<App />);
  const listitems = await screen.findAllByRole("listitem");
  const prevButton = screen.getByRole("button", { name: /previous/i });
  const nextButton = screen.getByRole("button", { name: /next/i });
  userEvent.click(nextButton);
  const rows = await screen.findAllByRole("row");
  expect(rows.length).toBe(11); //including header

  expect(prevButton).not.toBeDisabled();
  expect(nextButton).not.toBeDisabled();

  userEvent.click(nextButton);
  const rows_new = await screen.findAllByRole("row");
  expect(rows_new.length).toBe(6); //including header
  expect(prevButton).not.toBeDisabled();
  expect(nextButton).toBeDisabled();
});

test("change rows per page displays correct number of rows", async () => {
  renderComponent(<App />);
  const listitems = await screen.findAllByRole("listitem");

  expect(listitems.length).toBe(3);
  userEvent.selectOptions(screen.getByRole("combobox"), ["15"]);
  const rows = await screen.findAllByRole("row");
  const listitems1 = await screen.findAllByRole("listitem");
  expect(rows.length).toBe(16);
  expect(listitems1.length).toBe(2);

  userEvent.selectOptions(screen.getByRole("combobox"), ["20"]);
  const rows20 = await screen.findAllByRole("row");
  const listitems2 = await screen.findAllByRole("listitem");
  expect(listitems2.length).toBe(2);
  expect(rows20.length).toBe(21);
});

test("filtering returns correct results", async () => {
  renderComponent(<App />);
  const listitems2 = await screen.findAllByRole("listitem");
  const rows = await screen.findAllByRole("row");
  const filter = screen.getByPlaceholderText("Search...");

  userEvent.type(filter, "test-user20");

  const listitems = await screen.findAllByRole("listitem");
  expect(listitems.length).toBe(1);

  const rows1 = await screen.findAllByRole("row");
  expect(rows1.length).toBe(4);

  userEvent.clear(filter);
  const listitems3 = await screen.findAllByRole("listitem");
  const rows2 = await screen.findAllByRole("row");
  expect(rows2.length).toBe(11);
});

test.only("first page selected by default", async () => {
  renderComponent(<App />);
  const listitems = await screen.findAllByRole("listitem");
  expect(listitems[0].classList).toContain(/active/i);
});
