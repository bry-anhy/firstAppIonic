import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

/// The whole logic will be in a separate service, 
/// and we need jsut three functions that simply call the according Firebase function to create a new user, 
/// sign in a user or end the current session
export class AuthService {

  constructor(private auth: Auth) { }

  /// function login
  async login({ email, password }: { email: any, password: any }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);

      return user;
    } catch (error) {
      return null;
    }
  }

  /// function register
  async register({email, password} : {email: any, password: any}){
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);

      return user;
    } catch (error) {
      return null;
    }
  }

  /// function logout
  logout() {
		return signOut(this.auth);
	}
}
