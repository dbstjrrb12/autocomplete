import { searchResultType } from './../types/index';
import { AutoComplete, SearchList } from '../components/index.js';
import { request, debounce } from '../utils/index.js';
import { initialStateType } from '../types/index';

export const SearchContainer = (function () {
  const proto = SearchContainer.prototype;
  const initialState: initialStateType = {
    inputValue: null,
    isValueInInput: false,
    list: [],
  };

  const ArrowKeyHandler = (e: KeyboardEvent): void => {
    if (e.isComposing) {
      return;
    }

    const $list = document.querySelector('.list');
    const listElementNodes: HTMLCollection = $list.children;

    if (!listElementNodes.length) return;

    const firstElement = listElementNodes[0];
    const lastElement = listElementNodes[listElementNodes.length - 1];
    let activeElement = $list.querySelector('#listItem_selected');
    let nextElement: HTMLLIElement | undefined = null;

    switch (e.key) {
      case 'Down':
      case 'ArrowDown':
        if (!activeElement) {
          firstElement.id = 'listItem_selected';
          return;
        }

        activeElement.id = '';
        nextElement = activeElement.nextElementSibling as
          | HTMLLIElement
          | undefined;

        nextElement
          ? (nextElement.id = 'listItem_selected')
          : (firstElement.id = 'listItem_selected');
        break;
      case 'Up':
      case 'ArrowUp':
        e.preventDefault();

        if (!activeElement) {
          lastElement.id = 'listItem_selected';
          return;
        }

        activeElement.id = '';
        nextElement = activeElement.previousElementSibling as
          | HTMLLIElement
          | undefined;

        nextElement
          ? (nextElement.id = 'listItem_selected')
          : (lastElement.id = 'listItem_selected');
        break;
      case 'Enter':
        const inputElement = e.target as HTMLInputElement;

        inputElement.value = (
          activeElement as HTMLInputElement
        ).innerText.replace('#', '');
        break;
      default:
        break;
    }
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
    onFocusout: () => {
      searchlist.setState([]);
    },
    onFocusIn: (target) => {
      if (!target.value) return;

      proto.setState(target.value);
    },
    onKeyDown: ArrowKeyHandler,
  });

  const searchlist = new SearchList({
    $container,
    initialState: initialState.list,
  });

  function SearchContainer($app: HTMLElement): void {
    $app.appendChild($container);
  }

  proto.setState = (valueInInput: string): void => {
    let isValueInInput = valueInInput ? true : false;
    let list: Promise<searchResultType[]> | Promise<[]> = valueInInput
      ? request(valueInInput)
      : new Promise((resolve) => resolve([]));

    autocomplete.setState(isValueInInput);
    list.then((result) => {
      searchlist.setState(result);
      initialState.list = result;
    });

    initialState.isValueInInput = isValueInInput;
    initialState.inputValue = valueInInput;
  };

  return SearchContainer;
})();
