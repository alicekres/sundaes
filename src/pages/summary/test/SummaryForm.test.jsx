import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

test("initially checkbox is unchecked and button is disabled", () => {
  render(<SummaryForm />);
  const submitButton = screen.getByRole("button", { name: /confirm order/i });
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(termsAndConditionsCheckbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();

  userEvent.click(termsAndConditionsCheckbox);

  expect(termsAndConditionsCheckbox).toBeChecked();
  expect(submitButton).toBeEnabled();

  userEvent.click(termsAndConditionsCheckbox);

  expect(termsAndConditionsCheckbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();
});

test("after checkbox is checked the button is enabled and after unchecking the button is disabled", () => {
  render(<SummaryForm />);
  const submitButton = screen.getByRole("button", { name: /confirm order/i });
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  userEvent.click(termsAndConditionsCheckbox);

  expect(termsAndConditionsCheckbox).toBeChecked();
  expect(submitButton).toBeEnabled();

  userEvent.click(termsAndConditionsCheckbox);

  expect(termsAndConditionsCheckbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  //popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  //popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
