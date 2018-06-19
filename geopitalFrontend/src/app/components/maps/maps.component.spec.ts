import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapsComponent } from './maps.component';
import { HospitalService } from "../../services/hospital.service";
import { CharacteristicsService } from "../../services/characteristics.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Component({selector: 'app-sidebar', template: ''})
class SidebarComponentStubComponent {}

describe('MapsComponent', () => {
  let component: MapsComponent;
  let client: HttpClient;
  let charService: CharacteristicsService;
  let hosService: HospitalService;


  let fixture: ComponentFixture<MapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapsComponent,
        SidebarComponentStubComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        HospitalService,
        CharacteristicsService,
        HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    hosService = new HospitalService(client);
    charService = new CharacteristicsService(client);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hospital service have been called', () => {
      component.ngOnInit();
      expect(hosService.getAll).toBeDefined();
  });

  it('characteristics service has been called', () => {
    component.ngOnInit();
    expect(charService.getCategoricalAttributes).toBeDefined();
    expect(charService.getNumericalAttributes).toBeDefined();
  });

});
