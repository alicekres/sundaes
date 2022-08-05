import { render, screen, fireEvent } from "@testing-library/react";

import SummaryForm from "../SummaryForm";

test("initially checkbox is unchecked and button is disabled", () => {
  render(<SummaryForm />);
  const submitButton = screen.getByRole("button", { name: /confirm order/i });
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(termsAndConditionsCheckbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();

  fireEvent.click(termsAndConditionsCheckbox);

  expect(termsAndConditionsCheckbox).toBeChecked();
  expect(submitButton).toBeEnabled();

  fireEvent.click(termsAndConditionsCheckbox);

  expect(termsAndConditionsCheckbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();
});

test("after checkbox is checked the button is enabled and after unchecking the button is disabled", () => {
  render(<SummaryForm />);
  const submitButton = screen.getByRole("button", { name: /confirm order/i });
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  fireEvent.click(termsAndConditionsCheckbox);

  expect(termsAndConditionsCheckbox).toBeChecked();
  expect(submitButton).toBeEnabled();

  fireEvent.click(termsAndConditionsCheckbox);

  expect(termsAndConditionsCheckbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();
});
