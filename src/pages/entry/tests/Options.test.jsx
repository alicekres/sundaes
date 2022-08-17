import { screen, render } from "../../../test-utils/testing-library-utils";

import Options from "../Options";

test("displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((img) => img.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  //find images
  const toppingsImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingsImages).toHaveLength(3);

  //confirm alt text of images
  const altText = toppingsImages.map((img) => img.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
