import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQSpdComponent } from './edit-q-spd.component';

describe('EditQSpdComponent', () => {
  let component: EditQSpdComponent;
  let fixture: ComponentFixture<EditQSpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQSpdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQSpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
