import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, HttpClientModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  apiUrl = 'https://couple-production.up.railway.app/api/';

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router,
    private toastController: ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });

    this.loadRememberMe();
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }

  login() {
    const userData = { email: this.email, password: this.password };
  
    console.log("🔍 Mengirim login request dengan credentials:", userData);
  
    this.http.post(`${this.apiUrl}login`, userData)
      .pipe(
        catchError((error) => {
          console.error("❌ Login Gagal:", error);
          this.showToast("Login gagal, periksa kembali email dan password!", "danger");
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        console.log("✅ Login Berhasil:", res);
  
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.showToast("Login Berhasil!", "success");
  
          // Tambahkan delay sebelum redirect untuk UX yang lebih baik
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);  // Delay 1 detik
        }
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
