import "@testing-library/jest-dom";
// jest.setup.ts
import 'identity-obj-proxy'; // Ovo omogućava da se CSS fajlovi mockuju

// Ako koristiš React Toastify, možeš mockovati i toast funkcije, ako želiš
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
}));
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
