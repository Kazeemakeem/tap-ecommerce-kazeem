import { render, fireEvent } from "../../test.utils";
import ProductCard from "../ProductCard";

describe("ProductCard", () => {
  const product = {
    name: "Test Product",
    rating: 4.2,
    _id: "dkjkjfdgkdfj123",
    description: "Test product description",
    discount: 2,
    price: 3999,
  };
  it("should render the product name, discount, and price", () => {
    const { getByText, getByTestId } = render(<ProductCard {...product} />);
    expect(getByText("Test Product")).toBeDefined();
    expect(getByTestId("discount")).toBeDefined();
    expect(getByTestId("item-price")).toBeDefined();
  });

  it('should show "ADD TO CART" button', () => {
    const { getByText } = render(<ProductCard {...product} />);
    expect(getByText("ADD TO CART")).toBeDefined();
  });

  it("should increment and decrement the quantity of a product", () => {
    const { getByText, getByTestId } = render(<ProductCard {...product} />);
    const plusButton = getByTestId("plus-button");
    const minusButton = getByTestId("minus-button");
    expect(getByText("0")).toBeDefined();
    fireEvent.press(plusButton);
    expect(getByText("1")).toBeDefined();
    fireEvent.press(minusButton);
    expect(getByText("0")).toBeDefined();
  });

  it("should toggle the wishlist icon when clicked", () => {
    const wishlistHandler = jest.fn();
    const { getByTestId } = render(<ProductCard {...product} />);
    const wishListButton = getByTestId("wishlist-button");
    fireEvent.press(wishListButton);
    expect(wishlistHandler).toBeCalled();
  });
});
