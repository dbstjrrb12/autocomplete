const iconPath = 'src/assets/icon/find.svg';

export const AutoComplete = (function () {
  let state = '';
  let $target = document.createElement('form');

  function AutoComplete({ $app, initialState }) {
    $app.appendChild($target);
    state = initialState;
    this.render();
  }

  AutoComplete.prototype.setState = (newState) => {
    state = newState;
    render();
  };

  AutoComplete.prototype.render = () => {
    $target.innerHTML = `
                        <img class="findIcon" src=${iconPath} alt="돋보기">
                        <label class="a11yhidden" for="autocomplete">검색창</label> 
                        <input type="text" id="autocomplete" value=""/>
                        ${
                          state
                            ? `<button type="button" class="clear">
                                &times;
                               </button>`
                            : ''
                        }
                        `;
  };

  return AutoComplete;
})();
