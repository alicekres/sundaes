import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  //make sure total starts out $0.00
  const scoopSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubTotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  expect(scoopSubTotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check the subtotal again
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  expect(scoopSubTotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  //render parent component
  render(<Options optionType="toppings" />);

  //make sure total start out at $0.00
  const toppingsSubTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubTotal).toHaveTextContent("0.00");

  //update cherries topping and check the subtotal
  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesTopping).not.toBeChecked();

  userEvent.click(cherriesTopping);

  expect(cherriesTopping).toBeChecked();
  expect(toppingsSubTotal).toHaveTextContent("1.50");

  //update M&Ms topping and check the subtotal
  const MandMsTopping = await screen.findByRole("checkbox", { name: "M&Ms" });
  expect(MandMsTopping).not.toBeChecked();

  userEvent.clear(MandMsTopping);
  userEvent.click(MandMsTopping);

  expect(toppingsSubTotal).toHaveTextContent("3.00");

  //unclick M&Ms option and check the subtotal
  userEvent.click(MandMsTopping);
  expect(MandMsTopping).not.toBeChecked();
  expect(toppingsSubTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    //grand total starts out as $0.00

    expect(grandTotal).toHaveTextContent("0.00");

    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, "2");

    expect(grandTotal).toHaveTextContent("4.00");

    //add cherries toppings and check grand total

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    //add hot fudge topping and check grand total

    const hotFudgeTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    userEvent.click(hotFudgeTopping);

    expect(grandTotal).toHaveTextContent("1.50");

    //add chocolate scoop and check the grand total

    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if an item is removed", async () => {
    //render Options component
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    //add 2 scoops of vanilla and check grand total

    const vanillaScoopAgain = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.type(vanillaScoopAgain, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    //add cherries topping and check grand total

    const cherriesTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesTopping);

    expect(cherriesTopping).toBeChecked();
    expect(grandTotal).toHaveTextContent("5.50");

    //remove 1 vanilla scoop and check grand total

    userEvent.type(vanillaScoopAgain, "1");

    expect(grandTotal).toHaveTextContent("3.50");

    //remove cherries topping and check grand total

    userEvent.click(cherriesTopping);

    expect(grandTotal).toHaveTextContent("2.00");
  });
});
