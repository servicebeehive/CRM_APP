import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'task',
        loadChildren: () =>
          import('./task/task.module').then((m) => m.TaskPageModule),
      },
      {
    path: 'lead',
    loadChildren: () => import('./lead/lead.module').then( m => m.LeadPageModule)
  },
      {
        path: 'assignment',
        loadChildren: () =>
          import('./assignment/assignment.module').then(
            (m) => m.AssignmentPageModule
          ),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportPageModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserPageModule),
      },
    ],
  },
  {
    path: 'tabs/home',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
