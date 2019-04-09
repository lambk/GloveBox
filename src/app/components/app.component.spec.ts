import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { SideBarComponent } from './../../../GloveBox-darwin-x64/GloveBox.app/Contents/Resources/app/src/app/side-bar/side-bar.component';
import { AuthService } from './../services/auth/auth.service';
import { AppComponent } from './app.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

const authServiceMockProvider = {
  provide: AuthService,
  useValue: {
    resumeSession: () => of('success')
  }
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockComponent(LoadingOverlayComponent),
        MockComponent(SideBarComponent)
      ],
      providers: [
        authServiceMockProvider
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    authService = TestBed.get(AuthService);
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'GloveBox'`, async(() => {
    expect(component.title).toEqual('GloveBox');
  }));

  it('should redirect to login on unsuccessful session resume', async(() => {
    const router = TestBed.get(Router);

    spyOn(localStorage, 'getItem').and.returnValue('token');
    spyOn(authService, 'resumeSession').and.returnValue(throwError('error'));
    spyOn(router, 'navigate');

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should redirect to root on successful session resume', async(() => {
    const router = TestBed.get(Router);

    spyOn(localStorage, 'getItem').and.returnValue('token');
    spyOn(router, 'navigate');

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));
});
