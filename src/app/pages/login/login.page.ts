import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, HttpClientModule]
})
export class LoginPage {
  profile: string = '';
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  apiUrl = 'https://couple-production.up.railway.app/api/';

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router,
    private toastController: ToastController // ✅ Tambahkan ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      this.profile = params['profile'] || '';
    });

    this.loadRememberMe();
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Tampil selama 3 detik
      position: 'top', // Posisi di atas
      color: color // Warna hijau untuk sukses, merah untuk error
    });
    await toast.present();
  }

  login() {
    const userData = { email: this.email, password: this.password };

    this.http.post(`${this.apiUrl}login`, userData, { withCredentials: true })
      .subscribe((res: any) => {
        console.log("✅ Login Berhasil:", res);

        if (res.success) {
          this.showToast("Login Berhasil!", "success"); // ✅ Gunakan toast untuk notifikasi sukses

          if (this.rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('savedEmail', this.email);
          } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedEmail');
          }

          this.router.navigate(['/users']);
        }
      }, (error) => {
        console.error("❌ Login Gagal:", error);
        this.showToast("Login gagal, periksa kembali email dan password!", "danger"); // ❌ Notifikasi error
      });
  }

  loadRememberMe() {
    const remember = localStorage.getItem('rememberMe');
    if (remember === 'true') {
      this.rememberMe = true;
      this.email = localStorage.getItem('savedEmail') || '';
    }
  }

  toggleRememberMe() {
    if (this.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('savedEmail', this.email);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('savedEmail');
    }
  }
}
