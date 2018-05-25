import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapsComponent } from './maps.component';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { CategorialAttributesComponent } from "../categorial-attributes/categorial-attributes.component";
import { NavbarComponent } from "../navbar/navbar.component";

describe('MapsComponent', () => {
  let component1: MapsComponent;
  let component2: DropdownComponent;
  let component3: CategorialAttributesComponent;
  let component4: NavbarComponent;

  let fixture: ComponentFixture<MapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapsComponent,

      ],
      imports: [
        DropdownComponent,
        CategorialAttributesComponent,
        NavbarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component1 = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component1).toBeTruthy();
  });
});
