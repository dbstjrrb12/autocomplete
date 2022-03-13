export const SearchList = (function () {
  const proto = SearchList.prototype;
  const $target = document.createElement('ul');
  $target.classList.add('list');

  let listState = null;

  function SearchList({ $container, initialState }) {
    listState = initialState;

    $container.appendChild($target);
    this.render();
  }

  proto.setState = (newState) => {
    listState = newState;

    proto.render();
  };

  proto.render = () => {
    $target.style.display = listState.length ? 'initial' : 'none';

    $target.innerHTML = `
        ${listState
          .map((item) => {
            return `<li data-id=${item.id} tabindex="0">
                      <div class="listItem">${item.text}</div>
                    </li>`;
          })
          .join('')}
      `;
  };

  return SearchList;
})();
