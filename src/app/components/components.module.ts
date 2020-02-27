import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { RoomFeedItemComponent } from './room-feed-item/room-feed-item.component';
import { RatingFeedItemComponent } from './rating-feed-item/rating-feed-item.component';
import { DetailFeedItemComponent } from './detail-feed-item/detail-feed-item.component';
import { IonicRatingModule } from 'ionic4-rating';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [IonicModule, CommonModule, IonicRatingModule],
    declarations: [RoomFeedItemComponent, RatingFeedItemComponent, DetailFeedItemComponent],
    exports: [RoomFeedItemComponent, RatingFeedItemComponent, DetailFeedItemComponent],
})
export class ComponentsModule {}