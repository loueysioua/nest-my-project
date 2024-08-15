import { ValidationObjectIdMiddleware } from './validation-object-id.middleware';

describe('ValidationObjectIdMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidationObjectIdMiddleware()).toBeDefined();
  });
});
