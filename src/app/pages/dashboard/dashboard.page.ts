import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule, // Import IonicModule instead of individual components
  ],
})
export class DashboardPage implements OnInit {
  posts = [
    {
      userName: 'John Doe',
      userAvatar: 'https://i.pravatar.cc/150?img=11',
      timeAgo: '3 hrs ago',
      content: 'Enjoying a beautiful day at the beach! 🏖️',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      likes: 124,
      comments: 23,
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwt_decode(token);
        console.log('Decoded token:', decoded);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}