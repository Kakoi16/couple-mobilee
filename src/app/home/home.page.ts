import { Component } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Tambahkan ini
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class HomePage { // ✅ Jangan pakai "default"
  constructor(private router: Router) {}

  navigateToLogin(profile: string) {
    this.router.navigate(['/login'], { queryParams: { profile } });
  }
}
