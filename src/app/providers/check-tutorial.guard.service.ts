import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { from, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorialGuardService {

  constructor() { }
}

export const checkTutorialGuard = () => {
  const storage = inject(Storage);
  const router = inject(Router);
  return from(storage.get('ion_did_tutorial'))
    .pipe(
      tap(didTutorial => {
        if (didTutorial === true) {
          router.navigate(['/app', 'tabs', 'schedule']);
        }
      }),
      map(didTutorial => !didTutorial)
    );
}
