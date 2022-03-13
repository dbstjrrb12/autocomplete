import { AutoComplete, SearchList } from '../components/index.js';
import { request, debounce, getFocusableElements } from '../utils/index.js';

const ArrowKeyHandler = (e) => {};

export const SearchContainer = (function () {
  const proto = SearchContainer.prototype;
  const initialState = {
    isValueInInput: false,
    list: [],
  };

  const $container = document.createElement('div');
  $container.classList.add('container');

  const autocomplete = new AutoComplete({
    $container,
    initialState: initialState.isValueInInput,
    onInput: debounce((e) => {
      proto.setState(e.target.value);
    }, 200),
    onKeyUp: ArrowKeyHandler,
  });

  const searchlist = new SearchList({
    $container,
    initialState: initialState.list,
    onKeyUp: ArrowKeyHandler,
  });

  function SearchContainer($app) {
    $app.appendChild($container);
  }

  proto.setState = (valueInInput) => {
    let { isValueInInput, list } = initialState;

    isValueInInput = valueInInput ? true : false;
    list = valueInInput
      ? request(valueInInput)
      : new Promise((resolve) => resolve([]));

    autocomplete.setState(isValueInInput);
    list.then((result) => {
      searchlist.setState(result);
    });
  };

  return SearchContainer;
})();
