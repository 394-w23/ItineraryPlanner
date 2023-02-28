// add a test to see if the user is logged in
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../src/utilities/firebase.js';
import App from '../src/App';

describe('Auth tests', () => {
    test('User should be logged in', () => {
        render(
            <AuthProvider>
                <App />
            </AuthProvider>
        );
        expect(screen.getByText('Log in')).toBeDefined();
    });
});