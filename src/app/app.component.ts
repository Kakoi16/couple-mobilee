import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // ✅ Cukup ini saja

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule], // 🚀 Jangan tambahkan `IonApp` atau `IonRouterOutlet`
})
export class AppComponent {
  constructor() {}
}
