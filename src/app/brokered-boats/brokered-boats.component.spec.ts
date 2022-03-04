import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokeredBoatsComponent } from './brokered-boats.component';

describe('BrokeredBoatsComponent', () => {
  let component: BrokeredBoatsComponent;
  let fixture: ComponentFixture<BrokeredBoatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokeredBoatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokeredBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
