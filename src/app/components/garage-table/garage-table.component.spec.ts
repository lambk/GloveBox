import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GarageTableComponent } from './garage-table.component';
import { Router } from '@angular/router';


describe('GarageTableComponent', () => {
  let component: GarageTableComponent;
  let fixture: ComponentFixture<GarageTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarageTableComponent ],
      providers: [
        { provide: Router, useClass: jasmine.createSpy() }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
