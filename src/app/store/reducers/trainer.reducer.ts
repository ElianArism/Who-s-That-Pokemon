import { createReducer, on } from '@ngrx/store';
import { Trainer } from '../../models/trainer.model';
import { resetTrainerData } from '../actions/trainer.actions';
import {
  setTrainer,
  setTrainerScore,
  setTrainerPassword,
  setTrainerId,
} from '../actions/trainer.actions';

export interface TrainerState {
  trainer: Trainer | null;
}

const initialTrainerState: TrainerState = {
  trainer: null
};

const _trainerReducer = createReducer(
  initialTrainerState,
  on(setTrainer, (state, { trainer }) => ({
    ...state,
    trainer: { ...state.trainer, ...trainer },
  })),
  on(setTrainerScore, (state, { score }) => ({
    ...state,
    trainer: <Trainer>{
      ...state.trainer,
      score,
    },
  })),
  on(setTrainerPassword, (state, { password }) => ({
    ...state,
    trainer: <Trainer>{ ...state.trainer, password },
  })),
  on(setTrainerId, (state, { id }) => ({
    ...state,
    trainer: <Trainer>{ ...state.trainer, id },
  })),
  on(resetTrainerData, (state) => ({ ...state, trainer: null }))
);

export function trainerReducer(state: any, action: any) {
  return _trainerReducer(state, action);
}

