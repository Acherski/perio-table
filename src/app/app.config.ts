import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideStore(),
    provideHttpClient(),
  ],
};
