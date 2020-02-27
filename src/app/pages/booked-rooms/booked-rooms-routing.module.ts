import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedRoomsPage } from './booked-rooms.page';

const routes: Routes = [
  {
    path: '',
    component: BookedRoomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookedRoomsPageRoutingModule {}
