import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AppState } from '../../store/store.reducer';
import * as actions from '../../store/actions';
import { Store } from '@ngrx/store';

import { Trainer } from '../../models/trainer.model';
import { TrainerService } from '../../services/trainer.service';
import { setTrainerId } from '../../store/actions/trainer.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChildren('avatar') avatars!: QueryList<ElementRef>; 
  trainerAvatar!: string;
  trainerForm!: FormGroup;
  loading: boolean = false;
  buttonContinue: boolean = false;

  constructor(
    private _trainerService: TrainerService,
    private _formBuilder: FormBuilder,
    private _store: Store<AppState>,
    private _router: Router,
    private _r2: Renderer2
  ) {}

  ngOnInit(): void {
    this.trainerForm = this._formBuilder.group({
      name: new FormControl('', Validators.required),
      avatar: new FormControl('none'),
    });
  }
  /**
   * Method to control the behavior of the trainer images
   * @param avatar 
   */
  selectAvatar(avatar: number | string) {
    avatar = `img-avatar-${avatar}`;  
    
    this.avatars.forEach((avtNativeElement) => {
      const avt = avtNativeElement.nativeElement;

      if(avt.id === String(avatar)) {
        this._r2.addClass(avt, 'avatar-selected');
        this._r2.removeClass(avt, 'no-selected');
        this.trainerAvatar = avt.src;
      } else {
        avt.classList.remove('avatar-selected');
        avt.classList.add('no-selected');
      }
    });
  }
  /**
   * Set trainer in store
   */
   createTrainer() {
    this.trainerForm.get('avatar')?.setValue(this.trainerAvatar);
    const { avatar = '', name = '' } = this.trainerForm.value;
    
    if (name && avatar) {
      this._store.dispatch(
        actions.setTrainer({
          trainer: <Trainer>{ avatar, name, score: 0 },
        })
      );
      this.navigateToPlay();
    }
  }
  /**
   * Validate if exists one trainer
   */
  async validateTrainer() {
    if(this.trainerAvatar) {
      this.loading = true;
      try {
        const existsTrainer = await this.existsTrainer();
        if(!existsTrainer) {
          this.createTrainer(); 
        } else {
          this.buttonContinue = true; 
        }
        this.loading = false;
      } catch (error) {
        console.log(error)
      }
    }
      
  }
  /**
   * Control if exists trainer
   * @returns {boolean}
   */
  existsTrainer(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const { name = '' } = this.trainerForm.value;
      this._trainerService.filterTrainer(name)
      .subscribe(
        (status: any) => {
          if(status) {
            if (status.msg === 'names-equals') {
              this.buttonContinue = true;
              this._store.dispatch(setTrainerId({id: status.id}))
              resolve(true); 
            } else {
              resolve(false);
            }
          }
          resolve(false);
        },
        (err) => console.log(err)
      );
    });
  }

  /**
   * Navigate to play page
   */
  navigateToPlay() {
    this._router.navigateByUrl('/play');
  }
}
