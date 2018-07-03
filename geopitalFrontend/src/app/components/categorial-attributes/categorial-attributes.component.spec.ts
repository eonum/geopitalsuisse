import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorialAttributesComponent } from './categorial-attributes.component';
import { D3Service } from '../../services/d3.service';

describe('CategorialAttributesComponent', () => {
  let component: CategorialAttributesComponent;
  let fixture: ComponentFixture<CategorialAttributesComponent>;
  let d3ServiceSpy;
  let attribute;
  let dictionary;

  beforeEach(async(() => {
    const d3Spy = jasmine.createSpyObj('D3Service', ['updateSelectedCategoryOption']);
    TestBed.configureTestingModule({
      declarations: [
        CategorialAttributesComponent
      ],
      providers: [
        {provide: D3Service, useValue: d3Spy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorialAttributesComponent);
    component = fixture.componentInstance;
    d3ServiceSpy = TestBed.get(D3Service);
  });

  beforeEach(() => {
    attribute = {code: 'RForm', nameDE: 'Rechtsform', nameFR: 'Forme juridique', nameIT: 'Forma giuridica'};
    dictionary = {
      'RForm': [
        ['R1', 'AG / GmbH'],
        ['R2', 'Verein / Stiftung'],
        ['R3', 'Einzelfirma / Gesellschaft'],
        ['R4', 'Öffentliches Unternehmen']],
      'Akt': [
        ['A', 'Akutbehandlung'],
        ['B', 'Geburtshaus'],
        ['P', 'Psychiatrie'],
        ['R', 'Rehabilitation / Geriatrie']
      ],
      'SL': [
        ['IPS', 'Intensivpflegestation'],
        ['NF', 'Notfallaufnahme']
      ],
      'WB': [
        ['Arzt', 'Ärzte'],
        ['BGs', 'Gesundheitssektor'],
        ['MSt', 'Medizinstudenten']
      ],
      'SA': [
        ['Angio', 'Angiographie'],
        ['CC', 'Gamma Camera inkl. Szintigraphie und SPECT-Scanner'],
        ['CT', 'Computertomograph'],
        ['Dia', 'Dialyse'],
        ['LB', 'Linearbeschleuniger'],
        ['Lito', 'Lithotriptor'],
        ['MRI', 'Magnetresonanztomograph'],
        ['PET', 'Positronen-Emissions-Tomograph'],
      ],
      'LA': [
        ['Stat', 'Stationär'],
        ['Amb', 'Ambulant']
      ]
    };

    component.currentAttribute = attribute;
    component.dict = dictionary;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('should call selectedCatValue function if attribute is chosen', () => {
    fixture.detectChanges();

    spyOn(component, 'selectedCatValue');
    const link = fixture.debugElement.nativeElement.querySelector('input');
    link.click();

    fixture.whenStable().then(() => {
      expect(component.selectedCatValue).toHaveBeenCalled();
    });
  });
  */
});
