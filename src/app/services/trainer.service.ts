import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

import { Trainer } from '../models/trainer.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(private _firebase: AngularFirestore) {}

  addTrainer(data: Trainer) {
    return from(this._firebase.collection('trainers').add(data));
  }

  getTrainers() {
    return from(this._firebase.collection('trainers').get())
    .pipe( 
      map(res => res.docs),
      map((registers: any) => {
        const trainers = [];
        for (let i = 0; i < registers.length; i++) {
          const { avatar, name, score } = registers[i]._delegate._document.data.value.mapValue.fields;
          const trainerData = {
            avatar: avatar.stringValue, 
            name: name.stringValue,
            score: Number(score.integerValue)
          };

          trainers.push(trainerData);
        }

        return trainers;
      })
    );
  }

  updateTrainer(
    id: string,
    { score, avatar }: { score: number; avatar: string }
  ) {
    return from(
      this._firebase.collection('trainers').doc(id).update({ score, avatar })
    );
  }

  getTrainerById(id: string) { 
    return from(this._firebase.collection('trainers').doc(id).get())
      .pipe(
        map((res: any) => {
         const {avatar, name, password, score} = res._delegate._document.data.value.mapValue.fields;
          
         const data = {
          avatar: avatar.stringValue,
          name: name.stringValue,
          password: password.stringValue, 
          score: score.integerValue
         };

         return data;
        })
      )
  }


  filterTrainer(
    trainerName: string,
    trainerPassword?: string
  ): Observable<null | {}> {
    return from(this._firebase.collection('trainers').get()).pipe(
      map((res) => {
        const data: any = res.docs;
        let status = null;
        let i = 0;
        while (i < res.docs.length) {
          const { name, password } =
            data[i]._delegate._document.data.value.mapValue.fields;
          
          if (trainerPassword) {
            if (
              trainerPassword === password.stringValue &&
              name.stringValue === trainerName
            ) {
              status = { msg: 'finded', id: data[i].id };
              break;
            } else {
              status = { msg: 'incorrect-password', id: null };
              break;
            }
          } else {
            if (trainerName === name.stringValue) {
              status = { msg: 'names-equals', id: data[i].id };
              break;
            }
          }
          i++;
        }
        return status;
      })
    );
  }
}
