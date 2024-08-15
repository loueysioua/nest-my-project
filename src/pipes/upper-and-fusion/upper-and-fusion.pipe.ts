import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(entry: { data: string[] }, metadata: ArgumentMetadata) {
    console.log(metadata);
    console.log(entry);
    return entry.data.map((elt) => elt.toUpperCase());
  }
}
