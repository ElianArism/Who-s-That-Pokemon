import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CanDeactivateService } from '../../services/can-deactivate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs!: Subscription;
  navigateTo: string = 'Scores';

  constructor(private _router: Router, private _canDeactivateService: CanDeactivateService) {}

  ngOnInit() {
    this.setHeaderTitle();
  }

  /**
   * Set the button in the header depends on the path
   */
   setHeaderTitle() {
    this.subs = this._router.events.subscribe(route => {
      if(
        route instanceof NavigationEnd
        ) {
        if(route.url === '/scores') {
          this.navigateTo = 'Play';
        } else if(route.url === '/home') {
          this.navigateTo = 'Scores';
        } else if(route.url === '/play'){
          this.navigateTo = '';
        }
      }
    })
  }

  /**
   * Method to control where will go the user  
   */
  navigate() {
    this._canDeactivateService.resetData(); 
    this._router.navigateByUrl('/home');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
