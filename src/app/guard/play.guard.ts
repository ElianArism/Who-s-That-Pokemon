import { Injectable, OnDestroy } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppState } from '../store/store.reducer';

@Injectable({
  providedIn: 'root'
})
export class PlayGuard implements CanLoad, OnDestroy {
  private _subs!: Subscription;

  constructor(
    private _store: Store<AppState>,
    private _router: Router
  ) {}
  
  /**
   * If trainer exists in store, pass
   * @param route
   * @param segments 
   * @returns {Promise<string>}
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this._subs = this._store.select('trainer')
      .subscribe(({trainer}) => {
        if(trainer) {
          resolve(true);
        } else {
          this._router.navigateByUrl('/home');
          resolve(false);
        }
      });
    });
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
