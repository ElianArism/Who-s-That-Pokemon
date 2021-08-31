import { createReducer, on } from '@ngrx/store';
import { togglePopup } from '../actions/popup.actions';


export interface PopupState {
    toggle: boolean;
}

const popupInitialState: PopupState = {
    toggle: false
};

const _popupReducer = createReducer(popupInitialState,
    on(togglePopup, (state, {toggle}) => ({toggle}))
);

export function popupReducer(state: any, action: any) {
   return _popupReducer(state, action);
}