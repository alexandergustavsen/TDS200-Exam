import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreatedRoomsPageRoutingModule } from './created-rooms-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { CreatedRoomsPage } from './created-rooms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CreatedRoomsPageRoutingModule
  ],
  declarations: [CreatedRoomsPage]
})
export class CreatedRoomsPageModule {}
