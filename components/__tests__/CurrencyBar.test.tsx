import React from "react";
import { render } from "@testing-library/react-native";
import CurrencyBar from "../CurrencyBar";
import "@testing-library/jest-native/extend-expect";

describe("CurrencyBar", () => {
  it("renders the description and value", () => {
    const { getByTestId } = render(
      <CurrencyBar description="Total amount" value={10} emphasis={true} />
    );

    expect(getByTestId("description")).toBeDefined();
    expect(getByTestId("amount")).toBeDefined();
  });

  it("formats the value with the USD symbol", () => {
    const { getByTestId } = render(
      <CurrencyBar description="Total amount" value={10} emphasis={true} />
    );

    expect(getByTestId("amount")).toBeDefined();
  });

  it("renders the emphasis styles if specified", () => {
    const { getByTestId } = render(
      <CurrencyBar description="Total amount" value={10} emphasis={true} />
    );

    expect(getByTestId("description")).toHaveStyle({
      fontWeight: "800",
      fontSize: 20,
    });
    expect(getByTestId("amount")).toHaveStyle({
      fontWeight: "800",
      fontSize: 20,
    });
  });

  it("renders the regular styles if not specified", () => {
    const { getByTestId } = render(
      <CurrencyBar description="Total amount" value={10} emphasis={false} />
    );

    expect(getByTestId("description")).toHaveStyle({
      fontWeight: "700",
      fontSize: 14,
      color: "#9ca3af",
    });
    expect(getByTestId("amount")).toHaveStyle({
      fontWeight: "700",
      fontSize: 14,
      color: "#9ca3af",
    });
  });
});
