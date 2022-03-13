export const SearchList = (function () {
  const proto = SearchList.prototype;
  const $target = document.createElement('ul');
  $target.classList.add('list');

  let listState = null;

  function SearchList({ $container, initialState, onKeyUp }) {
    listState = initialState;
    proto.onKeyUp = onKeyUp;

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
            return `<li data-id=${item.id} tabindex="0" aria-labelledby="listItem">
                      <div class="listItem" id="listItem">
                        <span class="hashtag">#</span>
                        <span>${item.text}</span>
                      </div>
                    </li>`;
          })
          .join('')}
      `;

    $target.addEventListener('keyup', proto.onKeyUp);
  };

  return SearchList;
})();
