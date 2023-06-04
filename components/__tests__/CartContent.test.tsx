import React from "react";
import { render, fireEvent } from "../../test.utils";
import { Provider } from "react-redux";
import store from "../../redux/store";
import CartContent from "../CartContent";

describe("CartContent", () => {
  // it("renders correctly", () => {
  //   const { getByText, getByTestId } = render(
  //     // <Provider store={store}>
  //     <CartContent />
  //     // </Provider>
  //   );
  //   expect(getByText("Cart")).not.toBeNull();
  // });

  // it("displays cart items", () => {
  //   const { getByTestId } = render(
  //     // <Provider store={store}>
  //     <CartContent />
  //     // </Provider>
  //   );
  //   expect(getByTestId("cart-item-bar")).toBeDefined();
  // });

  // it("calculates cart subtotal, delivery fee, and order total correctly", () => {
  //   const { getByText } = render(
  //     // <Provider store={store}>
  //     <CartContent />
  //     // </Provider>
  //   );
  //   expect(getByText("Subtotal:")).not.toBeNull();
  //   expect(getByText("Delivery Fee:")).not.toBeNull();
  //   expect(getByText("Order Total:")).not.toBeNull();
  // });

  // it("handles Place Order correctly", () => {
  //   const handlePlaceOrder = jest.fn();
  //   const { getByText } = render(
  //     // <Provider store={store}>
  //     <CartContent />
  //     // </Provider>
  //   );
  //   fireEvent.press(getByText("PLACE ORDER"));
  //   expect(handlePlaceOrder).toHaveBeenCalledTimes(1);
  // });

  // it('displays "Your cart is empty." when there are no items in the cart', () => {
  //   const { getByText } = render(
  //     // <Provider store={store}>
  //     <CartContent />
  //     // </Provider>
  //   );
  //   expect(getByText("Your cart is empty.")).not.toBeNull();
});

// it('initiates toggleCart function on X icon press', () => {
//   const { getByRole } = render(
//     <Provider store={store}>
//       <CartContent />
//     </Provider>,
//   );
//   fireEvent.press(getByRole('button'));
//   expect(store.getState().cart.openCart).toBe(false);
// });

// it('initializes the orderID state as an empty string', () => {
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <CartContent />
//     </Provider>,
//   );
//   expect(getByTestId('orderID')).toHaveTextContent('');
// });

// it('renders as an absolute positioned element at the bottom of the screen', () => {
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <CartContent />
//     </Provider>,
//   );
//   expect(getByTestId('cart-container')).toHaveStyle({ position: 'absolute', bottom: 20 });
// });
// });
