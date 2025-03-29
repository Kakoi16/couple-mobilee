import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';

const routes: Routes = [
  { path: '', component: LoginPage }
];

export default RouterModule.forChild(routes); // ✅ Gunakan default export
