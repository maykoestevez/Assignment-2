import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/class/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading: boolean = false;
  public user: User;
  public showAlert: boolean = false;
  private timer: any;

  constructor(private loginService: LoginService,
              private router: Router) {
    this.user = new User();
  }
  
  private clearTimer() {
    clearInterval(this.timer);
  }

  ngOnInit() {
  }

  /** Metodo usando promise con async await */
  login() {
    this.loading = true;
    this.timer = setInterval(async () => {
      const valid = await this.loginService
        .validateUserPromise(this.user.email, this.user.password);

      if (valid) {
        this.clearTimer();
        this.router.navigate(['main']);
      }
      this.showAlert = true;
      this.loading = false;
    }, 2000);

  }

  /** Metodo usando observable */
  loginObservable() {
    this.loading = true;
    this.timer = setInterval(() => {
      this.loginService
        .validateUserObservable(this.user.email, this.user.password)
        .subscribe((valid) => {
          if (valid) {
            this.clearTimer();
            this.router.navigate(['main']);
          }
          this.loading = false;
          this.showAlert = true;
        });
    }, 2000);
  }

}
