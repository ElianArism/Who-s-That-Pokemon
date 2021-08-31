import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store.reducer';
import { Subscription } from 'rxjs/internal/Subscription';
import { Trainer } from '../../models/trainer.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TrainerService } from '../../services/trainer.service';
import * as actions from '../../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {
  private subs!: Subscription;
  toggleForm: boolean = false;
  formPassword!: FormGroup;
  loading: boolean = false;
  trainer!: Trainer;

  constructor(
    private _trainerService: TrainerService,
    private _formGroup: FormBuilder,
    private _store: Store<AppState>,
    private _router: Router,
    private _r2: Renderer2
  ) {}

  ngOnInit() {
    this.subs = this._store.subscribe((state) => {
      const { trainer: TrainerState, popup: PopupState } = state;

      this.trainer = <Trainer>TrainerState.trainer;
      this.toggleForm = <boolean>PopupState.toggle;

      if(this.trainer.score >= 151) {
        this.toggleForm = true;
      }
    });

    this.formPassword = this._formGroup.group({
      password: new FormControl('', Validators.required),
    });
  }

  /**
   * Controls if the trainer exists in the db
   */
  existsTrainer() {
    this.loading = true;
    if (!this.trainer.id) {
      this.addTrainerToDB();
    } else {
      const { password } = this.formPassword.value;

      this._trainerService
        .getTrainerById(this.trainer.id)
        .subscribe((trainer: Trainer) => {
          if (
            password === trainer.password &&
            this.trainer.name === trainer.name
          ) {
            this._trainerService
              .updateTrainer(<string>this.trainer.id, {
                score: this.trainer.score,
                avatar: this.trainer.avatar,
              })
              .subscribe(
                (res) => {
                  this._router.navigateByUrl('/scores');
                  this.loading = false;
                },
                (err) => {
                  console.log(err);
                }
              );
          } else if(!trainer) {
            this.addTrainerToDB();
          } else {
            alert('Incorrect Password');
            this.loading = false;
          }
        });
    }
  }

  /**
   * Add trainer to DB
   */
  addTrainerToDB() {
    this._store.dispatch(
      actions.setTrainerPassword({
        password: this.formPassword?.get('password')?.value,
      })
    );

    this._trainerService.addTrainer(this.trainer).subscribe(
      (res) => {
        this._router.navigateByUrl('/scores');
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Behavior of button "See"
   * @param input
   */
  seePassword(input: HTMLInputElement) {
    this._r2.setAttribute(
      input,
      'type',
      input.type === 'password' ? 'type' : 'password'
    );
  }

  ngOnDestroy() {
    if(this.subs) {
      this.subs.unsubscribe();
    }
  }
}
