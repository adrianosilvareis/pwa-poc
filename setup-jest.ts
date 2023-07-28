import 'jest-preset-angular/setup-jest';
import { environment } from '@root/environments/environment.testing';

jest.mock('@root/environments/environment', () => ({
  environment
}));
