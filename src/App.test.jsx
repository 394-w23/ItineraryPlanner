import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

describe('Home page tests', () => {
    
  test("User prompt should load onto the home page", () => {
    render(<App />);
    expect(screen.getByText("Start building your adventure")).toBeDefined();  
  });

});