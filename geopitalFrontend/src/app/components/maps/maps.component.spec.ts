import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsComponent } from './maps.component';
import { D3Service } from '../../services/d3.service';


describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  let d3Service;

  beforeEach(async(() => {
    const d3Spy = jasmine.createSpyObj('D3Service', ['drawMap']);

    TestBed.configureTestingModule({
      declarations: [
        MapsComponent,
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: D3Service, useValue: d3Spy},
        HttpClient
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(MapsComponent);
      component = fixture.componentInstance;
      d3Service = TestBed.get(D3Service);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call services', () => {
    component.ngOnInit();
    expect(d3Service.drawMap).toHaveBeenCalled();
  });

});
