import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookedRoomsPage } from './booked-rooms.page';

describe('BookedRoomsPage', () => {
  let component: BookedRoomsPage;
  let fixture: ComponentFixture<BookedRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedRoomsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookedRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
