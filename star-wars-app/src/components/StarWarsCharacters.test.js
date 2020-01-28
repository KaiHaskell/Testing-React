import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { getData as mockGetData } from "../api";

import StarWarsCharacters from "./StarWarsCharacters";

jest.mock("../api");

test("checks if the buttons function correctly", async () => {
  mockGetData.mockResolvedValue({
    next: "Next",
    previous: "Previous",
    results: [
      {
        name: "Initial Name",
        url: "Initial Url"
      }
    ]
  });
  const { getByText } = render(<StarWarsCharacters />);

  const prevButton = getByText(/Previous/i);
  const nextButton = getByText(/Next/i);

  fireEvent.click(prevButton);
  fireEvent.click(nextButton);

  expect(mockGetData).toHaveBeenCalledTimes(1);
  wait(() => expect(getByText(/Initial Name/i).toBeInDocument()));
});
