import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewRoomPage } from './new-room.page';

describe('NewRoomPage', () => {
  let component: NewRoomPage;
  let fixture: ComponentFixture<NewRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
