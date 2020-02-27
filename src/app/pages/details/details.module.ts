import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailsPageRoutingModule } from './details-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { IonicRatingModule } from 'ionic4-rating';
import { DetailsPage } from './details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DetailsPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [DetailsPage]
})
export class DetailsPageModule {}
