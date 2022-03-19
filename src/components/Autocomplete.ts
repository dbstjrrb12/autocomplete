import { AutoCompleteProps, AutoCompleteEventTarget } from '../types/index';

const findIcon = 'src/assets/icon/find.svg';
const clearIcon = 'src/assets/icon/clear.svg';

export const AutoComplete = (function () {
  let isValueInInput = false;

  const proto = AutoComplete.prototype;
  const $target = document.createElement('form');
  $target.classList.add('autocomplete');

  const $button = document.createElement('button');
  $button.classList.add('clear');

  function AutoComplete({
    $container,
    initialState,
    onInput,
    onClick,
    onFocusout,
    onFocusIn,
    onKeyDown,
  }: AutoCompleteProps): void {
    $container.appendChild($target);

    isValueInInput = initialState;
    proto.onInput = onInput;
    proto.onKeyDown = onKeyDown;
    proto.onFocusout = ({ target: $inputElement }: AutoCompleteEventTarget) => {
      $inputElement.setAttribute('aria-expanded', 'false');
      onFocusout();
    };
    proto.onFocusIn = ({ target: $inputElement }: AutoCompleteEventTarget) => {
      if (isValueInInput) {
        $inputElement.setAttribute('aria-expanded', 'true');
      }
      onFocusIn($inputElement as HTMLInputElement);
    };
    proto.onClick = () => {
      const $inputElement = $target.querySelector(
        '.autoInput'
      ) as HTMLInputElement;

      $inputElement.value = '';
      $inputElement.focus();
      onClick($inputElement.value);
    };
    this.render();
  }

  proto.setState = (newState: boolean): void => {
    isValueInInput = newState;

    isValueInInput
      ? !$target.querySelector('.clear') && $target.appendChild($button)
      : $target.removeChild($button);

    const $inputElement = $target.querySelector('.autoInput');
    isValueInInput
      ? $inputElement.setAttribute('aria-expanded', 'true')
      : $inputElement.setAttribute('aria-expanded', 'false');
  };

  proto.render = (): void => {
    $target.innerHTML = `
      <img class="findIcon" src=${findIcon} alt="돋보기">
      <label class="a11yhidden" for="autoinput">제목으로 검색</label> 
      <input 
        class="autoInput" 
        role="combobox" 
        type="text" 
        id="autoinput" 
        placeholder="제목으로 검색" 
        autocomplete="off" 
        aria-expanded="false"
        aria-owns="list"
        aria-activedescendant="listItem_selected"
      />
      ${isValueInInput ? $button : ''}  
    `;

    $button.type = 'button';
    $button.innerHTML = `<img src=${clearIcon} alt="입력 내용 삭제" />`;

    $button.addEventListener('click', proto.onClick);
    $target.addEventListener('input', proto.onInput);
    $target.addEventListener('keydown', proto.onKeyDown);
    $target.addEventListener('submit', (e) => e.preventDefault());

    $target
      .querySelector('.autoInput')
      .addEventListener('focusout', proto.onFocusout);
    $target
      .querySelector('.autoInput')
      .addEventListener('focusin', proto.onFocusIn);
  };

  return AutoComplete;
})();
