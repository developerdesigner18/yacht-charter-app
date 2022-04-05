import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QSpdComponent } from './q-spd.component';

describe('QSpdComponent', () => {
  let component: QSpdComponent;
  let fixture: ComponentFixture<QSpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QSpdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QSpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
