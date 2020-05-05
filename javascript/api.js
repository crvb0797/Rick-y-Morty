(async function load() {
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const $form = document.querySelector("#form");
  $form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  const character = await getData(`https://rickandmortyapi.com/api/character/`);
  const character2 = await getData(
    `https://rickandmortyapi.com/api/character/?page=2`
  );

  function characterItemsTemplate(character) {
    return `<div class="content-character">
        <div class="caja">
            <div class="image">
                <img src="${character.image}" alt="">
            </div>
 
            <div class="info">
                <p><span>Nombre:</span>${character.name}</p>
                <hr>
                <p><span>Especie:</span>${character.species}</p>
                <hr>
                <p><span>Genero:</span>${character.gender}</p>
            </div>
        </div>
    </div>`;
  }

  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }

  const $overlay = document.getElementById("overlay");
  const $modal = document.getElementById("modal");
  const $hideModal = document.getElementById("hide-modal");

  function showModal() {
    $overlay.classList.add("active");
    $modal.style.animation = "modalIn .8s forwards";
  }

  $hideModal.addEventListener("click", () => {
    $overlay.classList.remove("active");
    $modal.style.animation = "modalOut .8s forwards";
  });

  function addEventClick($element) {
    $element.addEventListener("click", () => {
      showModal();
    });
  }

  function renderCharter(elemnto, container) {
    elemnto.results.forEach((character) => {
      const HTMLString = characterItemsTemplate(character);
      const characterElement = createTemplate(HTMLString);
      container.before(characterElement);
      addEventClick(characterElement);
    });
  }

  const $container_persons = document.querySelector("#container_persons h2");
  renderCharter(character, $container_persons);

  const $container_persons2 = document.querySelector("#container_persons h2");
  renderCharter(character2, $container_persons2);
})();
