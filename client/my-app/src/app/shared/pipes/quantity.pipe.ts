import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantity'
})
export class QuantityPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string | number {
    const thousand = value / 1000;
    if (value > 999) {
      return thousand + 'k';
    } else {
      return value;
    }
  }
}
