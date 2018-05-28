import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { CategorialAttributesComponent } from './categorial-attributes.component';
import { CharacteristicsService } from "../../services/characteristics.service";

describe('CategorialAttributesComponent', () => {
  let component: CategorialAttributesComponent;
  let fixture: ComponentFixture<CategorialAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorialAttributesComponent ],
      providers: [{provide: CharacteristicsService}]
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

  it('should call selectedCatValue function if string attribute is chosen', async(() => {
    spyOn(component, 'selectedCatValue');
    let link = fixture.debugElement.nativeElement.querySelector('input');
    link.click();

    fixture.whenStable().then(() => {
      expect(component.selectedCatValue).toHaveBeenCalled();
    })
  }));
});
