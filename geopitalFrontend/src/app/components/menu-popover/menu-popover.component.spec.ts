import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPopoverComponent } from './menu-popover.component';

describe('MenuPopoverComponent', () => {
  let component: MenuPopoverComponent;
  let fixture: ComponentFixture<MenuPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
