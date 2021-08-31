import { createAction, props } from "@ngrx/store";
import { Trainer } from "src/app/models/trainer.model";

export const setTrainer = createAction(
    '[Trainer] Set a new trainer.',
    props<{ trainer: Trainer }>()  
);

export const setTrainerId = createAction(
    '[Trainer] Set trainer id.', 
    props<{ id: string }>()
);

export const setTrainerScore = createAction(
    '[Trainer] Set trainer score.', 
    props<{ score: number }>()
);

export const setTrainerPassword = createAction(
    '[Trainer] Set trainer Password.', 
    props<{password: string}>()
); 

export const resetTrainerData = createAction(
    '[Trainer] Reset trainer data.',
)