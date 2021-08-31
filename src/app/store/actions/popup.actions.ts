import { createAction, props } from '@ngrx/store';

export const togglePopup = createAction(
    "[Popup] Show or hidden popup", 
    props<{toggle: boolean}>()
);