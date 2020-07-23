import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'content'
})
export class ContentPipe implements PipeTransform {

  transform(value: string, length: number) {
    if (value.length < length) {
      return value;
    } else {
      return value.slice(0, length) + '...';
    }
  }

}
