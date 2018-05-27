import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { CharacteristicsService } from "../../services/characteristics.service";
import { MockCharacteristicsService } from "../../../mock/mock.characteristics.service"
import {Attributes} from "../../models/attributes.model";

const ATTRIBUTES_STRING = [new Attributes("KT", "string", "Kanton", "Cantone", "Cantone")]
const ATTRIBUTES_NUMERIC = [new Attributes("Gebs", "number", "Gebärsäle", "Gebärsäle", "sale parto"), new Attributes("Ops", "number", "Operationssäle", "salles d’opération", "Sale operatorie")]

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let characteristicsService: CharacteristicsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownComponent ],
      providers: [
        {provide: CharacteristicsService, useClass: MockCharacteristicsService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    characteristicsService = TestBed.get(CharacteristicsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set numberic attributes and string attributes without attribute Typ', () => {
    component.ngOnInit();
    expect(component.numericalAttributes).toEqual(ATTRIBUTES_NUMERIC)
    expect(component.categoricalAttributes).toEqual(ATTRIBUTES_STRING)
  })

  it('should call selectedCatAttribute function if string attribute is choosen', async(() => {
    spyOn(component, 'selectedCatAttribute')
    let link = fixture.debugElement.nativeElement.querySelector('a');
    link.click();

    fixture.whenStable().then(() => {
      expect(component.selectedCatAttribute).toHaveBeenCalled();
    })
  }));

});
