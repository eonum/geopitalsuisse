import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { CharacteristicsService } from "../../services/characteristics.service";
import { MockCharacteristicsService } from "../../../mock/mock.characteristics.service"
import { Attribute } from "../../models/attribute.model";

const ATTRIBUTE_STRING = [new Attribute("KT", "string", "Kanton", "Cantone", "Cantone")]
const ATTRIBUTE_NUMERIC = [new Attribute("Gebs", "number", "Gebärsäle", "Gebärsäle", "sale parto"), new Attribute("Ops", "number", "Operationssäle", "salles d’opération", "Sale operatorie")]

@Component({selector: 'app-categorial-attributes', template: ''})
class CategorialAttributesStubComponent {}

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let characteristicsService: CharacteristicsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropdownComponent,
        CategorialAttributesStubComponent
      ],
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

  it('should set numeric attributes and string attributes without attribute Typ', () => {
    component.ngOnInit();
    expect(component.numericalAttributes).toEqual(ATTRIBUTE_NUMERIC);
    expect(component.categoricalAttributes).toEqual(ATTRIBUTE_STRING);
  });

  it('should call selectCatAttribute function if string attribute is chosen', async(() => {
    spyOn(component, 'selectCatAttribute');
    let link = fixture.debugElement.nativeElement.querySelector('#Kanton');
    link.click();

    fixture.whenStable().then(() => {
      expect(component.selectCatAttribute).toHaveBeenCalled();
    })
  }));

});
