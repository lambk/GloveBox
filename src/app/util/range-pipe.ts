import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'range'})
export class RangePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return new Array(value).fill(0).map((_v, i) => i);
    }
}
