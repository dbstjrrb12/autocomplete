const findIcon = 'src/assets/icon/find.svg';
const clearIcon = 'src/assets/icon/clear.svg';

export const AutoComplete = (function () {
  let state = '';
  const $target = document.createElement('form');
  $target.classList.add('autocomplete');

  function AutoComplete({ $app, initialState, onKeyDown }) {
    $app.appendChild($target);

    state = initialState;
    AutoComplete.prototype.onKeyDown = onKeyDown;

    this.render();
  }

  AutoComplete.prototype.onKeyDown = () => {};

  AutoComplete.prototype.clearFunc = () => {
    const $inputElement = $target.querySelector('.autoInput');

    $inputElement.value = '';
    $inputElement.focus();
  };

  AutoComplete.prototype.setState = (newState) => {
    state = newState;
    render();
  };

  AutoComplete.prototype.render = () => {
    $target.innerHTML = `
                        <img class="findIcon" src=${findIcon} alt="돋보기">
                        <label class="a11yhidden" for="autoinput">제목으로 검색</label> 
                        <input class="autoInput" type="text" id="autoinput" placeholder="제목으로 검색" autocomplete="off"/>
                        ${
                          state
                            ? `<button class="clear" type="button">
                                <img src=${clearIcon} alt="입력 내용 삭제" />
                               </button>`
                            : ''
                        }
                        `;

    $target
      .querySelector('.clear')
      .addEventListener('click', AutoComplete.prototype.clearFunc);

    $target
      .querySelector('.autoInput')
      .addEventListener('keydown', AutoComplete.prototype.onKeyDown);
  };

  return AutoComplete;
})();
