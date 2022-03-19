import { searchResultType, SearchListProps } from '../types/index';

export const SearchList = (function () {
  const proto = SearchList.prototype;
  const $target = document.createElement('ul');
  $target.classList.add('list');
  $target.id = 'list';

  let searchResult: searchResultType[] = null;

  function SearchList({ $container, initialState }: SearchListProps) {
    searchResult = initialState;

    $container.appendChild($target);
    this.render();
  }

  proto.setState = (newState: searchResultType[]): void => {
    searchResult = newState;

    proto.render();
  };

  proto.render = (): void => {
    $target.style.display = searchResult.length ? 'initial' : 'none';

    $target.innerHTML = `
        ${searchResult
          .map((keyword) => {
            return `<li role="option" aria-labelledby="listItem">
                      <div class="listItem" id="listItem">
                        <span class="hashtag">#</span>
                        <span>${keyword.text}</span>
                      </div>
                    </li>`;
          })
          .join('')}
      `;
  };

  return SearchList;
})();
