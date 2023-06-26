import { ErrorMessagePipe } from './error-message.pipe';

describe('ErrorMessagePipe', () => {
  it('should return a keys of values when provider a object', () => {
    const pipe = new ErrorMessagePipe();
    expect(pipe.transform({ required: true, minLength: 5 })).toBe('required, minLength');
  });

  it('should return null when receive falsy values', () => {
    const pipe = new ErrorMessagePipe();
    expect(pipe.transform(null)).toBeNull()
  });
});
