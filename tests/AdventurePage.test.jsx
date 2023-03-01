import { describe, expect, test, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import AdventurePage from "../src/components/AdventurePage/AdventurePage";

vi.mock('../../utilities/firebase', () => ({
  useDbData: () => [
    {
      users: {
        user1: {
          adventure: {
            locations: [
              {
                id: '1',
                name: 'Location 1',
                description: 'Description 1',
              },
              {
                id: '2',
                name: 'Location 2',
                description: 'Description 2',
              },
            ],
          },
        },
      },
    },
    null,
  ],
}));

describe('AdventurePage component', () => {
  let container;

  beforeEach(() => {
    container = render(<AdventurePage />).container;
  });

  test('displays loading message while data is being fetched', () => {
    expect(container.textContent).toContain('Loading');
  });

  test('displays adventure cards once data is loaded', () => {
    expect(container.querySelectorAll('.card')).toHaveLength(2);
  });

  test('displays correct location information on adventure cards', () => {
    const adventureCards = container.querySelectorAll('.card');

    expect(adventureCards[0].textContent).toContain('Location 1');
    expect(adventureCards[0].textContent).toContain('Description 1');

    expect(adventureCards[1].textContent).toContain('Location 2');
    expect(adventureCards[1].textContent).toContain('Description 2');
  });
});
