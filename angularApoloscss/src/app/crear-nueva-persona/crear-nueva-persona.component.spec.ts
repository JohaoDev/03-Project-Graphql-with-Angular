import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNuevaPersonaComponent } from './crear-nueva-persona.component';

describe('CrearNuevaPersonaComponent', () => {
  let component: CrearNuevaPersonaComponent;
  let fixture: ComponentFixture<CrearNuevaPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearNuevaPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearNuevaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
