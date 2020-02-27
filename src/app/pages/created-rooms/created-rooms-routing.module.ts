import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatedRoomsPage } from './created-rooms.page';

const routes: Routes = [
  {
    path: '',
    component: CreatedRoomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatedRoomsPageRoutingModule {}
