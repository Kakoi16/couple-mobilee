import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Tambahkan ini
import { Router } from '@angular/router';
import { jwtDecode as jwt_decode } from 'jwt-decode';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true, // Tambahkan ini jika menggunakan standalone component
  imports: [CommonModule] // Tambahkan ini
})
export class UsersPage implements OnInit {
  user = {
    username: '',
    email: ''
  };

  // Tambahkan array users untuk data dummy
  users = [
    {
      username: 'user1',
      email: 'user1@example.com',
      role: 'Admin',
      joinDate: 'Jan 2023'
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      role: 'Member',
      joinDate: 'Feb 2023'
    },
    {
      username: 'user3',
      email: 'user3@example.com',
      role: 'Member',
      joinDate: 'Mar 2023'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        this.user.username = decodedToken.username;
        this.user.email = decodedToken.email;
      } catch (error) {
        console.error("❌ Gagal mendekode token:", error);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}