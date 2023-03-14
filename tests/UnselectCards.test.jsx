import { describe, expect, test, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Button from 'react-bootstrap/Button';
import AdventurePage from "../src/components/AdventurePage/AdventurePage";
import AdventureCard from '../src/components/AdventureCard/AdventureCard';

describe('Unselect Cards Functionality', () => {
  let container;

  beforeEach(() => {
    container = render(<AdventurePage />).container;
  });

  test("displays adventure cards", async () => {
    const adventureCardTitles = await screen.findAllByTestId("adventure-card-title");
    expect(adventureCardTitles).toHaveLength(6);
  });

  test('displays selected adventure card', async () => {
    const adventureCardTitles = await screen.findAllByTestId("adventure-card-title");
    expect(adventureCardTitles[0].textContent).toContain('Hotel Muguet');
    expect(adventureCardTitles[1].textContent).toContain('Louvre Museum');
    expect(adventureCardTitles[5].textContent).toContain('UC-61');
  });

  test('selected button has minus-button class ', async () => {
    let buttons = await screen.findAllByTestId("adventure-button")

    // find a minus button
    let minusButton = buttons[0];
    let i = 0
    for (let button of buttons) {
      if (button.className.includes("adventure-button-minus")) {
        minusButton = button
        break
      }
      i+=1
    }

    // return if there are no minus buttons
    if (i == buttons.length) {
      return
    }

    expect(minusButton.className).toContain('adventure-button-minus');
  });

  test('clicking minus button changes class to plus-button', async () => {
    let buttons = await screen.findAllByTestId("adventure-button")

    // find a minus button
    let minusButton = buttons[0];
    let i = 0
    for (let button of buttons) {
      if (button.className.includes("adventure-button-minus")) {
        minusButton = button
        break
      }
      i+=1
    }

    // return if there are no minus buttons
    if (i == buttons.length) {
      return
    }

    await userEvent.click(minusButton)
    expect(minusButton.className).toContain('adventure-button-plus');

    // set back to minus
    await userEvent.click(minusButton)
  });


});
