import { searchResultType } from './../types/index';
import { AutoComplete, SearchList } from '../components/index.js';
import { request, debounce } from '../utils/index.js';
import { initialStateType } from '../types/index';

export const SearchContainer = (function () {
  const proto = SearchContainer.prototype;
  const SearchState: initialStateType = {
    inputValue: null,
    isValueInInput: false,
    searchResult: [],
  };

  const ArrowKeyHandler = (e: KeyboardEvent): void => {
    if (e.isComposing) {
      return;
    }

    const $ulList = document.querySelector('.list');
    const liElementNodes: HTMLCollection = $ulList.children;

    if (!liElementNodes.length) return;

    const firstLiElement = liElementNodes[0];
    const lastLiElement = liElementNodes[liElementNodes.length - 1];
    let activeLiElement = $ulList.querySelector('#listItem_selected');
    let nextLiElement: HTMLLIElement | undefined = null;

    switch (e.key) {
      case 'Down':
      case 'ArrowDown':
        if (!activeLiElement) {
          firstLiElement.id = 'listItem_selected';
          return;
        }

        activeLiElement.id = '';
        nextLiElement = activeLiElement.nextElementSibling as
          | HTMLLIElement
          | undefined;

        nextLiElement
          ? (nextLiElement.id = 'listItem_selected')
          : (firstLiElement.id = 'listItem_selected');
        break;
      case 'Up':
      case 'ArrowUp':
        e.preventDefault();

        if (!activeLiElement) {
          lastLiElement.id = 'listItem_selected';
          return;
        }

        activeLiElement.id = '';
        nextLiElement = activeLiElement.previousElementSibling as
          | HTMLLIElement
          | undefined;

        nextLiElement
          ? (nextLiElement.id = 'listItem_selected')
          : (lastLiElement.id = 'listItem_selected');
        break;
      case 'Enter':
        const inputElement = e.target as HTMLInputElement;

        inputElement.value = (
          activeLiElement as HTMLInputElement
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
    initialState: SearchState.isValueInInput,
    onInput: debounce((e) => {
      if (e.target.value === SearchState.inputValue) return;

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
    initialState: SearchState.searchResult,
  });

  function SearchContainer($app: HTMLElement): void {
    $app.appendChild($container);
  }

  proto.setState = (valueInInput: string): void => {
    let isValueInInput = valueInInput ? true : false;
    let searchResult: Promise<searchResultType[]> | Promise<[]> = valueInInput
      ? request(valueInInput)
      : new Promise((resolve) => resolve([]));

    autocomplete.setState(isValueInInput);
    searchResult.then((result) => {
      searchlist.setState(result);
      SearchState.searchResult = result;
    });

    SearchState.isValueInInput = isValueInInput;
    SearchState.inputValue = valueInInput;
  };

  return SearchContainer;
})();
