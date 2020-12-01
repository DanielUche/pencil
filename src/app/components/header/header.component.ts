import { catchError, take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { HOME } from 'src/app/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<firebase.User> = this.auth.user$;

  constructor(
    private readonly auth: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private _router: Router,
  ) {}

  login() {
    this.auth
      .loginViaGoogle()
      .pipe(
        take(1),
        catchError((error) => {
          this.snackBar.open(`${error.message} 😢`, 'Close', {
            duration: 4000,
          });
          return EMPTY;
        }),
      )
      .subscribe(
        (response) => this.router.navigate(['/editor'])
      );
  }

  logout() {
    this.auth
      .logout()
      .pipe(take(1))
      .subscribe((response) => {
        this.router.navigate([`/${HOME}`]);
        this.snackBar.open('Come back soon! 😿', 'Close', {
          duration: 4000,
        });
      });
  }
}