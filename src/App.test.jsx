import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import Root from './Root';

describe('Home page tests', () => {
    
  test("Start My Adventure button should load onto the home page", () => {
    render(<Root />);
    expect(screen.getByText("Start My Adventure")).toBeDefined();  
  });

});