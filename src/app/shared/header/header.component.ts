import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public auth: AuthService) { }

  logout() {
    if(this.auth.isAuthenticated()) {
      this.auth.logout();
    }
  }

}
