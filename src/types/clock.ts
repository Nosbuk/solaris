import { Dispatch } from 'react';

export interface SettingsState {
  play: boolean;
  speed: number;
  forwards: boolean;
}

export interface SettingsAction {
  type: SettingsActionTypes;
}

export enum SettingsActionTypes {
  PLAY = 'play',
  PAUSE = 'pause',
  FORWARDS = 'forwards',
  BACKWARDS = 'backwards',
  INCREASE_SPEED = 'increaseSpeed',
  DECREASE_SPEED = 'decreaseSpeed',
}

export interface ClockContextValue {
  date: Date;
  dispatchSettings: Dispatch<SettingsAction>;
  settings: SettingsState;
}
