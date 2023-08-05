import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strLength'
})
export class StrLengthPipe implements PipeTransform {

  transform(value: string, arg: number): string {
    return value.length <= arg ? value : value.substring(0, arg - 3) + "...";
  }

}
