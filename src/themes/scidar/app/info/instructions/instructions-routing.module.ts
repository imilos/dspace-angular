import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructionsComponent } from './instructions.component';

const routes: Routes = [
  { component: InstructionsComponent,
  path: 'instructions',
  loadChildren: () => import('./instructions-routing.module')
              .then((m) => m.InstructionsRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructionsRoutingModule { }
