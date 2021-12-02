import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTicketComponent } from './registro-ticket.component';

describe('RegistroTicketComponent', () => {
  let component: RegistroTicketComponent;
  let fixture: ComponentFixture<RegistroTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
