import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe<T> implements PipeTransform {

  transform(collection: T[], fields: string[], current: string): T[] {
    fields = fields || [];
    collection = collection || [];
    current = (current || '').trim().toLowerCase();

    if (!fields.length || !current.length || !collection.length) return collection;

    return collection.filter(item => {
      return fields.find(field => {
        // @ts-ignore
        const v = (item[field] || '').toString().trim().toLowerCase();
        return v.indexOf(current) !== -1;
      });
    });
  }

}
