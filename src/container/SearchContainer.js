import { AutoComplete, SearchList } from '../components/index.js';
import { request, debounce } from '../utils/index.js';

const ArrowKeyHandler = (e) => {
  if (e.isComposing || e.keyCode === 229) {
    return;
  }

  const $list = document.querySelector('.list');
  const listElementNodes = $list.children;

  if (!listElementNodes.length) return;

  const firstElement = listElementNodes[0];
  const lastElement = listElementNodes[listElementNodes.length - 1];
  let activeElement = $list.querySelector('#listItem_selected');
  let nextElement = null;

  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
      if (!activeElement) {
        firstElement.id = 'listItem_selected';
        return;
      }

      activeElement.id = '';
      nextElement = activeElement.nextElementSibling;
      nextElement
        ? (nextElement.id = 'listItem_selected')
        : (firstElement.id = 'listItem_selected');
      break;
    case 'Up':
    case 'ArrowUp':
      if (!activeElement) {
        lastElement.id = 'listItem_selected';
        return;
      }

      activeElement.id = '';
      nextElement = activeElement.previousElementSibling;
      nextElement
        ? (nextElement.id = 'listItem_selected')
        : (lastElement.id = 'listItem_selected');
      break;
    default:
      break;
  }
};

export const SearchContainer = (function () {
  const proto = SearchContainer.prototype;
  const initialState = {
    inputValue: null,
    isValueInInput: false,
    list: [],
  };

  const $container = document.createElement('div');
  $container.classList.add('container');

  const autocomplete = new AutoComplete({
    $container,
    initialState: initialState.isValueInInput,
    onInput: debounce((e) => {
      if (e.target.value === initialState.inputValue) return;

      proto.setState(e.target.value);
    }, 200),
    onClick: (valueInInput) => {
      proto.setState(valueInInput);
    },
    onKeyDown: ArrowKeyHandler,
  });

  const searchlist = new SearchList({
    $container,
    initialState: initialState.list,
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

    initialState.isValueInInput = isValueInInput;
    initialState.list = list;
    initialState.inputValue = valueInInput;
  };

  return SearchContainer;
})();
