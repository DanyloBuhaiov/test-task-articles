import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectWords'
})
export class SelectWordsPipe implements PipeTransform {

  transform(value: string, args: string): string {
    if(!args) return value;

    const wordsArray: string[] = value.split(' ');
    const argsArray: string[] = args.split('+');
    for (let i = 0; i < argsArray.length; i++) {
      for (let j = 0; j < wordsArray.length; j++) {
        if (wordsArray[j].toLowerCase().includes(argsArray[i])) {
          wordsArray[j] = '<span class="highlighted-text">' + wordsArray[j] + '</span>';
        }
      }
    }
    return wordsArray.join(' ');
  }

}
