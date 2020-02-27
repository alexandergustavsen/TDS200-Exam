import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatedRoomsPage } from './created-rooms.page';

describe('CreatedRoomsPage', () => {
  let component: CreatedRoomsPage;
  let fixture: ComponentFixture<CreatedRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedRoomsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatedRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
