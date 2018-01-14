import { RouterModule, Routes } from '@angular/router';
import { ForumPreviewComponent } from './forum-preview/forum-preview.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/components/login/login.component';

const appRoutes: Routes = [
  { path: '', component: ForumPreviewComponent, pathMatch: 'full' },
  { path: 'banner', component: LandingComponent },
  { path: 'login', component: LoginComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
