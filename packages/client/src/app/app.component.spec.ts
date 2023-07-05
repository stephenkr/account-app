import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { getMockStore } from './tests/store.mock';
import { socketModule } from './lib/socket';
import { materialModules } from './lib/material.library';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastContainerComponent } from './components/ui/toast-container/toast-container.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        socketModule,
        NoopAnimationsModule,
        ...materialModules
      ],
      declarations: [
        AppComponent,
        ToastContainerComponent
      ],
      providers: [
        getMockStore()
      ]
    }).compileComponents();
  });

  it(`should have as title 'client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client');
  });
});
