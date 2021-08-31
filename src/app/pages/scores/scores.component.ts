import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../services/trainer.service';
import { Trainer } from '../../models/trainer.model';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent implements OnInit {
  trainers!: Trainer[];

  constructor(private _trainerService: TrainerService) {}

  ngOnInit(): void {
    this.getTrainers();
  }

  getTrainers() {
    this._trainerService.getTrainers().subscribe((trainers) => {
      this.trainers = <any>trainers;
      this.sortTrainers(this.trainers);
    });
  }

  sortTrainers(trainers: Trainer[]) {
    let temp: Trainer;
    let j: number, l: number = trainers.length;

    for (let i = 1; i < l; i++) {
      temp = trainers[i];
      j = i;

      while (j > 0 && trainers[j - 1].score < temp.score) {
        trainers[j] = trainers[j - 1];
        j--;
      }

      trainers[j] = temp;
    }
  }
}
