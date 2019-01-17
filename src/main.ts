import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LicenseManager } from 'ag-grid-enterprise';

if (environment.production) {
  enableProdMode();
}

LicenseManager.setLicenseKey(
  'Evaluation_License_Not_For_Production_Valid_Until5_January_2019__MTU0NjY0NjQwMDAwMA==14c2b7c7e69b514c1836f70b9f58c8ff'
);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
