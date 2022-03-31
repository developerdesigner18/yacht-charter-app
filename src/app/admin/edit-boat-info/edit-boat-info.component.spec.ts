import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoatInfoComponent } from './edit-boat-info.component';

describe('EditBoatInfoComponent', () => {
  let component: EditBoatInfoComponent;
  let fixture: ComponentFixture<EditBoatInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBoatInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoatInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
