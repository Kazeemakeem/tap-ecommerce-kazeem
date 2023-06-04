import React from "react";
import { render, fireEvent } from "../../test.utils";
import NavigationBar from "../NavigationBar";

describe("NavigationBar component", () => {
  it("renders navigation buttons correctly", () => {
    const { getByText } = render(<NavigationBar routeName="Home" />);

    const homeButton = getByText("Home");
    const wishlistButton = getByText("Wishlist");
    const cartButton = getByText("Cart");
    const profileButton = getByText("Profile");

    expect(homeButton).toBeTruthy();
    expect(wishlistButton).toBeTruthy();
    expect(cartButton).toBeTruthy();
    expect(profileButton).toBeTruthy();
  });

  it("handles button click events correctly", () => {
    const mockHandler = jest.fn();
    const { getByText } = render(<NavigationBar routeName="Home" />);

    const wishlistButton = getByText("Wishlist");

    fireEvent.press(wishlistButton);

    expect(mockHandler).toHaveBeenCalled();
    expect(mockHandler).toHaveBeenCalledWith("Wishlist");
  });
});
