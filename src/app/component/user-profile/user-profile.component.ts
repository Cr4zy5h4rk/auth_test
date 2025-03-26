import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../../models/user-info';
import { AuthService } from '../../services/authService/auth.service';

enum Status {
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR",
  AUTHENTICATING = "AUTHENTICATING"
}


interface ErrorInfo {
  errorCode: string;
  errorMsg: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userInfo: UserInfo | null = null;
  status: Status = Status.LOADING;
  error: ErrorInfo | null = null;
  Status = Status; // Pour utiliser l'enum dans le template

  constructor(
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo')!);
      this.status = Status.LOADED;
    }
    else {
      this.status = Status.AUTHENTICATING;
    }
  }
 
}