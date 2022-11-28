import { render, screen } from "@testing-library/react";
import SearchResultsItem from "src/components/SearchResultsItem";

const mockedJourney = {
  legs: [
    {
      destination: {
        name: "Berlin Hbf",
      },
      direction: "",
      origin: {
        name: "Munich Hbf",
      },
      line: {
        name: "Berlin"
      },
      plannedArrival: "",
      plannedArrivalPlatform: "",
      plannedDeparture: "",
      plannedDeparturePlatform: ""
    },
  ],
  price: null,
};

let mockedIsOpen = false;

const renderComponent = () => {
  const searchResultsItemComponent = render(
    <SearchResultsItem journey={mockedJourney} isOpen={mockedIsOpen} />
  );
  return searchResultsItemComponent;
};

describe("SearchResultsItem component", () => {
  it("should open details area if isOpen is true", async () => {
    renderComponent((mockedIsOpen = true));
    const detailsDiv = screen.getByTestId(/search-result/);
    expect(detailsDiv).toBeVisible();
  });
});
