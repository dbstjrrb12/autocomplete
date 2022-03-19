import { EventHandler } from './common';

type AutoCompleteHTMLElement =
  | HTMLInputElement
  | HTMLFormElement
  | HTMLImageElement
  | HTMLLabelElement
  | HTMLButtonElement;

export type AutoCompleteEventTarget = {
  target: AutoCompleteHTMLElement;
};

export interface AutoCompleteProps {
  $container: HTMLElement;
  initialState: boolean;
  onInput: EventHandler<KeyboardEvent>;
  onKeyDown: EventHandler<KeyboardEvent>;
  onClick: (value: string) => void;
  onFocusout: () => void;
  onFocusIn: (target: HTMLInputElement) => void;
}
