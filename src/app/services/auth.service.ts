import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<
    Observable<firebase.User>
  > = new BehaviorSubject<Observable<firebase.User>>(null);
  user$ = this.user
    .asObservable()
    .pipe(switchMap((user: Observable<firebase.User>) => user));

  constructor(private afAuth: AngularFireAuth) {
    this.user.next(this.afAuth.authState);
  }

  loginViaGoogle(): Observable<auth.UserCredential> {
    return from(this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  get currentUser() {
    return this.user.value;
  }

  get loggedIn() {
    return !!this.user.value;
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}