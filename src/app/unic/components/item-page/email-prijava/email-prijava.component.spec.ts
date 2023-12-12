import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPrijavaComponent } from './email-prijava.component';

describe('EmailPrijavaComponent', () => {
  let component: EmailPrijavaComponent;
  let fixture: ComponentFixture<EmailPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailPrijavaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
