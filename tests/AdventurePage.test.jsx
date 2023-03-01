import { describe, expect, test, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import AdventurePage from "../src/components/AdventurePage/AdventurePage";

describe('AdventurePage component', () => {
  let container;

  beforeEach(() => {
    container = render(<AdventurePage />).container;
  });

  test('displays loading message while data is being fetched', () => {
    expect(container.textContent).toContain('Loading');
  });

  test("displays adventure cards", async () => {
    const adventureCardTitles = await screen.findAllByTestId("adventure-card-title");
    expect(adventureCardTitles).toHaveLength(6);
  });

  test('displays correct location information on adventure cards', async () => {
    const adventureCardTitles = await screen.findAllByTestId("adventure-card-title");
    expect(adventureCardTitles[0].textContent).toContain('Start Location');
    expect(adventureCardTitles[5].textContent).toContain('End Location');
  });
});
