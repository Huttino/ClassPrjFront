import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomPresentationComponent } from './class-room-presentation.component';

describe('ClassRoomPresentationComponent', () => {
  let component: ClassRoomPresentationComponent;
  let fixture: ComponentFixture<ClassRoomPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassRoomPresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassRoomPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
