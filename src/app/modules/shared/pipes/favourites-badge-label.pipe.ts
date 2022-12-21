import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favouritesBadgeLabel',
  pure: true,
})
export class FavouritesBadgeLabelPipe implements PipeTransform {
  transform(isFaourited: boolean): unknown {
    return isFaourited ? 'Remove from favourites' : 'Add to favourites';
  }
}
