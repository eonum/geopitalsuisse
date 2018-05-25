import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapsComponent } from './maps.component';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { CategorialAttributesComponent } from "../categorial-attributes/categorial-attributes.component";
import { NavbarComponent } from "../navbar/navbar.component";
import {AppModule} from "../../app.module";
import { APP_BASE_HREF } from "@angular/common";
import {CharacteristicsComponent} from "../characteristics/characteristics.component";
import {HospitalService} from "../../services/hospital.service";
import {CharacteristicsService} from "../../services/characteristics.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

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
        DropdownComponent,
        CategorialAttributesComponent,
        NavbarComponent,
        CharacteristicsComponent,
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
});
