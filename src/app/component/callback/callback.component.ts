import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-callback',
  template: '<p>Loading...</p> <button (click)="send()">click</button>',
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      const state = params['state'];
      if (code && state) {
        console.log('code : ', code, ', state : ', state);
        
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  send():void{
    this.authService.getCode('1233333','test').subscribe({
      next:()=>(console.log('done'))
    })
  }
}