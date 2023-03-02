import AppFunctional from "./AppFunctional";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})


test("renders without errors", () => {
  render (<AppFunctional />);
})

test("renders ALL proper IDs on page", () => {
  const result = render (<AppFunctional />);

  const coordinates = result.container.querySelector("#coordinates");
  const steps = result.container.querySelector("#steps");
  const grid = result.container.querySelector("#grid");
  const message = result.container.querySelector("#message");
  const keypad = result.container.querySelector("#keypad");
  const email = result.container.querySelector("#email");
  const submit = result.container.querySelector("#submit");

  expect(coordinates).toBeInTheDocument();
  expect(steps).toBeInTheDocument();
  expect(grid).toBeInTheDocument();
  expect(message).toBeInTheDocument();
  expect(keypad).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(submit).toBeInTheDocument();

})

test("renders movement buttons", () => {
  const  result = render (<AppFunctional />);
  
  const leftButton = result.container.querySelector("#left");
  const upButton = result.container.querySelector("#up");
  const rightButton = result.container.querySelector("#right");
  const downButton = result.container.querySelector("#down");
  const resetButton = result.container.querySelector("#reset");

  expect(leftButton).toBeInTheDocument();
  expect(upButton).toBeInTheDocument();
  expect(rightButton).toBeInTheDocument();
  expect(downButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
})

test("typing in email works", () => {
  const result = render (<AppFunctional />);

  const emailInput = result.container.querySelector ("#email");

  userEvent.type(emailInput, "josh@josh.com");

  expect(emailInput).toHaveValue("josh@josh.com");
})

test("typing in email changes state as evidenced by win message", async () => {
  const result = render (<AppFunctional />);

  const emailInput = result.container.querySelector ("#email");
  const submitButton = result.container.querySelector("#submit")
  userEvent.type(emailInput, "josh@josh.com");
  userEvent.click(submitButton);
  
  // const winMessage = screen.queryByText("josh win #25");
  // expect(winMessage).toBeInTheDocument();
  await waitFor (() => {
    const winMessage = result.queryByText("josh win #25");

    expect(winMessage).toBeInTheDocument();
  })
})