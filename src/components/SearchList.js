export const SearchList = (function () {
  const proto = SearchList.prototype;
  const $target = document.createElement('ul');
  $target.classList.add('list');
  $target.id = 'list';

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
