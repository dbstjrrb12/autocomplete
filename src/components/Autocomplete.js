const findIcon = 'src/assets/icon/find.svg';
const clearIcon = 'src/assets/icon/clear.svg';

export const AutoComplete = (function () {
  let state = '';

  const proto = AutoComplete.prototype;
  const $target = document.createElement('form');
  $target.classList.add('autocomplete');

  const $button = document.createElement('button');
  $button.classList.add('clear');

  function AutoComplete({
    $container,
    initialState,
    onInput,
    onKeyUp,
    onClick,
  }) {
    $container.appendChild($target);

    state = initialState;
    proto.onInput = onInput;
    proto.onKeyUp = onKeyUp;
    proto.onClick = () => {
      const $inputElement = $target.querySelector('.autoInput');

      $inputElement.value = '';
      $inputElement.focus();

      onClick($inputElement.value);
    };

    this.render();
  }

  proto.setState = (newState) => {
    state = newState;

    state
      ? !$target.querySelector('.clear') && $target.appendChild($button)
      : $target.removeChild($button);
  };

  proto.render = () => {
    $target.innerHTML = `
      <img class="findIcon" src=${findIcon} alt="돋보기">
      <label class="a11yhidden" for="autoinput">제목으로 검색</label> 
      <input class="autoInput" type="text" id="autoinput" placeholder="제목으로 검색" autocomplete="off"/>
      ${state ? $button : ''}  
    `;

    $button.type = 'button';
    $button.innerHTML = `<img src=${clearIcon} alt="입력 내용 삭제" />`;

    $button.addEventListener('click', proto.onClick);
    $target.addEventListener('input', proto.onInput);
    $target.addEventListener('keyup', proto.onKeyUp);
  };

  return AutoComplete;
})();
