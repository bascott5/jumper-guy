import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileControlsComponent } from './mobile-controls.component';

describe('MobileControlsComponent', () => {
  let component: MobileControlsComponent;
  let fixture: ComponentFixture<MobileControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
