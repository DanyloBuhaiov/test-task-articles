import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedItemComponent } from './opened-item.component';

describe('OpenedItemComponent', () => {
  let component: OpenedItemComponent;
  let fixture: ComponentFixture<OpenedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenedItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
