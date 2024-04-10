import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm!: FormGroup;
  /// For all these calls you need to add the Auth reference, which we injected inside the constructor.
  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
    private alertControl: AlertController
  ) {
    
  }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /// function login with (user, password)
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentialsForm.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      this.showAlert('Login failed', 'Please try again!');
    }
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentialsForm.value);
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
    }else{
      this.showAlert('Registration failed', 'Please try again!');
    }
  }

  /// function show dialog (confirm)
  ///  + 1 button: OK
  async showAlert(header: string, message: string) {
    const alert = await this.alertControl.create(
      {
        header,
        message,
        buttons: ['OK']
      }
    );

    await alert.present();
  }

  // Easy access for form fields
	get email() {
		return this.credentialsForm.get('email');
	}

	get password() {
		return this.credentialsForm.get('password');
	}

}
