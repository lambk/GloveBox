import { AuthService } from './../services/auth/auth.service';
import { SideBarComponent } from './../../../GloveBox-darwin-x64/GloveBox.app/Contents/Resources/app/src/app/side-bar/side-bar.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

class MockAuthService {
  resumeSession() {}
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        LoadingOverlayComponent,
        SideBarComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'GloveBox'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('GloveBox');
  }));
});
