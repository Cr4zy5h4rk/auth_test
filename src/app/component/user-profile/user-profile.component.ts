import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

enum Status {
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR",
  AUTHENTICATING = "AUTHENTICATING"
}

interface UserInfo {
  name: string;
  email: string;
  picture: string;
  birthdate: string;
  phone_number: string;
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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getQueryParams();
  }

  private getQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const authCode = params['code'];
      const errorCode = params['error'];
      const error_desc = params['error_description'];

      if (errorCode) {
        this.error = { errorCode, errorMsg: error_desc };
        this.status = Status.ERROR;
        return;
      }

      if (authCode) {
        this.getUserDetails(authCode);
      } else {
        this.error = { errorCode: "authCode_missing", errorMsg: "Missing authorization code" };
        this.status = Status.ERROR;
      }
    });
  }

  private getUserDetails(authCode: string): void {
    this.error = null;
    this.userInfo = null;

    // Vérifiez si les données sont déjà dans le localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
        // Si les données existent, utilisez-les directement
        this.userInfo = JSON.parse(storedUserInfo);
        this.status = Status.LOADED;
        return;
    }

    // Si les données n'existent pas, faites une requête à l'API
    const endpoint = `http://localhost:8888/delegate/fetchUserInfo?code=${authCode}`;
    
    this.http.get<UserInfo>(endpoint, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).subscribe({
        next: (data) => {
            // Stockez les données dans le localStorage
            localStorage.setItem('userInfo', JSON.stringify(data));
            
            // Mettez à jour l'état de l'application
            this.userInfo = data;
            this.status = Status.LOADED;
        },
        error: (err) => {
            this.error = { errorCode: "", errorMsg: err.message };
            this.status = Status.ERROR;
        }
    });
}
}