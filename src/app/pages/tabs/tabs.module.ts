import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'new-room',
        loadChildren: () => import('../new-room/new-room.module').then( m => m.NewRoomPageModule)
      },
      {
        path: 'booked-rooms',
        loadChildren: () => import('../booked-rooms/booked-rooms.module').then( m => m.BookedRoomsPageModule)
      },
      {
        path: 'created-rooms',
        loadChildren: () => import('../created-rooms/created-rooms.module').then( m => m.CreatedRoomsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
