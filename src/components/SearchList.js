export const SearchList = (function () {
  const proto = SearchList.prototype;
  const $target = document.createElement('ul');
  let listState = null;

  function SearchList({ $app, initialState }) {
    listState = initialState;

    $app.appendChild($target);
    this.render();
  }

  proto.setState = (newState) => {
    listState = newState;

    proto.render();
  };

  proto.render = () => {
    $target.innerHTML = `
        ${listState
          .map((item) => {
            return `<li data-id=${item.id}>
                     <div class="listItem">${item.text}</div>
                    </li>`;
          })
          .join('')}
      `;
  };

  return SearchList;
})();
