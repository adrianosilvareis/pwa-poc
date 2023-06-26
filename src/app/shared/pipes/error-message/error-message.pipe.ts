import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage',
  pure: false
})
export class ErrorMessagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      return Object.keys(value).join(', ')
    }
    return null;
  }

}
