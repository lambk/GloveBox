import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './../login-form/login-form.component';
import { AlertComponent } from './../alert/alert.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryComponent } from './entry.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { UserService } from 'src/app/services/user/user.service';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let fixture: ComponentFixture<EntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EntryComponent,
        AlertComponent,
        LoginFormComponent,
        RegisterFormComponent
      ],
      imports: [
        RouterTestingModule,
        NgbModule,
        FormsModule
      ],
      providers: [
        { provide: AuthService, useClass: jasmine.createSpy() },
        { provide: UserService, useClass: jasmine.createSpy() }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
