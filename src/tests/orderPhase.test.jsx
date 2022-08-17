import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  //render app
  render(<App />);

  //add ice cream and toppings
  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, "2");

  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesTopping);

  //find and click order button
  const orderButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderButton);

  //check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  //summary option items
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  //accept terms and conditions and click the button to confirm the order
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(checkbox);

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(confirmButton);

  //confirm order number on confirmation page
  const thankYou = await screen.findByRole("heading", { name: /thank you/i });
  expect(thankYou).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //click "new order" button on confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: /new order/i,
  });
  userEvent.click(newOrderButton);

  //check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  //awaiting in order to avoid test errors which appear because things happen after test is finito

  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
