import { render, screen, fireEvent } from "@testing-library/react";
import Input from "src/components/Input";
import "@testing-library/jest-dom/extend-expect";
import { act } from 'react-dom/test-utils';

const mockedHandleOnSubmit = jest.fn();
const mockedSetDestination = jest.fn();
const mockedSetOrigin = jest.fn();
const mockedSetDate = jest.fn();
let mockedFetchStatus;
let mockedIsDisabled;

const renderComponent = () => {
  const inputComponent = render(
    <Input
      fetchStatus={mockedFetchStatus}
      setOrigin={mockedSetOrigin}
      setDestination={mockedSetDestination}
      setDate={mockedSetDate}
      handleOnSubmit={mockedHandleOnSubmit}
      isDisabled={mockedIsDisabled}
    />
  );
  return inputComponent;
};

describe("Input component", () => {
  it("should have disabled search button with correct text", async () => {
    renderComponent((mockedIsDisabled = true));
    const searchBtn = screen.getByText(/SELECT STATIONS/);
    expect(searchBtn).toBeDisabled();
  });

  it("should have enabled search button with correct text", async () => {
    renderComponent((mockedIsDisabled = false));
    const searchBtn = screen.getByText(/TAKE ME THERE/);
    expect(searchBtn).toBeEnabled();
  });

  it("should have enabled search button with correct text", async () => {
    renderComponent((mockedFetchStatus = "fetching"));
    const searchBtn = screen.getByText(/ALMOST THERE/);
    expect(searchBtn).toBeEnabled();
  });

  it("should call setDate function after defining new date", async () => {
    renderComponent();
    const dateInput = screen.getByLabelText(/When/)
    fireEvent.change(dateInput, { target: { value: "2020-05-24" } });
    expect(mockedSetDate).toHaveBeenCalledTimes(1);
  });
});
