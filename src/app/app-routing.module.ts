import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { DummyComponent } from './dummy/dummy.component';

const routes: Routes = [
  { path: 'grid', component: GridComponent},
  { path: 'dummy', component: DummyComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
