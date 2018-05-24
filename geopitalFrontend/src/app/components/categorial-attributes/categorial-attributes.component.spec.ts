import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { CategorialAttributesComponent } from './categorial-attributes.component';

describe('CategorialAttributesComponent', () => {
  let component: CategorialAttributesComponent;
  let fixture: ComponentFixture<CategorialAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorialAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorialAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
