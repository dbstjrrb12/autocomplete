const findIcon = 'src/assets/icon/find.svg';
const clearIcon = 'src/assets/icon/clear.svg';

export const AutoComplete = (function () {
  let state = '';

  const proto = AutoComplete.prototype;
  const $target = document.createElement('form');
  $target.classList.add('autocomplete');

  const $button = document.createElement('button');
  $button.classList.add('clear');

  function AutoComplete({ $app, initialState, onInput }) {
    $app.appendChild($target);

    state = initialState;
    proto.onInput = ({ target }) => {
      onInput();
      target.value ? proto.setState(true) : proto.setState(false);
    };

    this.render();
  }

  proto.clearFunc = ({ target }) => {
    const $inputElement = $target.querySelector('.autoInput');

    $inputElement.value = '';
    $inputElement.focus();

    $target.removeChild(target);
  };

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

    $button.addEventListener('click', proto.clearFunc);
    $button.type = 'button';
    $button.innerHTML = `<img src=${clearIcon} alt="입력 내용 삭제" />`;

    $target
      .querySelector('.autoInput')
      .addEventListener('input', proto.onInput);
  };

  return AutoComplete;
})();
