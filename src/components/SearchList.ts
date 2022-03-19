import { searchResultType, SearchListProps } from '../types/index';

export const SearchList = (function () {
  const proto = SearchList.prototype;
  const $target = document.createElement('ul');
  $target.classList.add('list');
  $target.id = 'list';

  let listState: searchResultType[] = null;

  function SearchList({ $container, initialState }: SearchListProps) {
    listState = initialState;

    $container.appendChild($target);
    this.render();
  }

  proto.setState = (newState: searchResultType[]): void => {
    listState = newState;

    proto.render();
  };

  proto.render = (): void => {
    $target.style.display = listState.length ? 'initial' : 'none';

    $target.innerHTML = `
        ${listState
          .map((item) => {
            return `<li role="option" aria-labelledby="listItem">
                      <div class="listItem" id="listItem">
                        <span class="hashtag">#</span>
                        <span>${item.text}</span>
                      </div>
                    </li>`;
          })
          .join('')}
      `;
  };

  return SearchList;
})();
