$(document).ready(() => {
  loadCharacters();
});
function loadCharacters() {
  const url = "https://www.anapioficeandfire.com/api/characters";
  $.get(url, function(data) {
    hideLoader();
    let index = 1;
    data.forEach(element => {
      fedData(element, index++);
    });
  });
}

function fedData(data, index) {
  let name = data.name ? data.name : "Not Available";
  let culture = data.culture ? data.culture : "Not Available";
  $(".section").append(
    `<div class="card">
          <div class="card-head">
              <h3>Character ${index}</h3>
          </div>
          <div class="card-body">
              <p>Name : ${name}</p>
              <p>Character : ${data.aliases[0]}</p>
              <p>Gender : ${data.gender}</p>
              <p>Culture : ${culture}</p>
          </div>
          <div class="card-footer">
              <button class="btn" onclick="openPage(${index})">More Info</button>
          </div>
      </div>`
  );
}
function openPage(index) {
  showLoader();
  const url = `https://www.anapioficeandfire.com/api/characters/${index}`;
  $.get(url, function(data) {
    let books = data.books;
    let name = data.name ? data.name : "Not Available";
    let culture = data.culture ? data.culture : "Not Available";
    let body = `
    <div class="modal-box">
            <div class="modal-head">
                <h2>Character ${index}</h2>
            </div>
            <div class="modal-body">
               <p>Name : ${name}</p>
                <p>Character : ${data.aliases[0]}</p>
                <p>Gender : ${data.gender}</p>
                <p>Culture : ${culture}</p>
                <p id="books">Books : </p>
                <ul id="books_name">
                <img id="load-img" src="assets/loader.gif" width="20" height="20">
                </ul>

            </div>
            <div class="modal-footer">
                <button class="btn" onclick="closeModal()">Close</button>
            </div>
        </div>`;
    $(".modal").html(body);
    if (books.length > 0) {
      books.forEach(el => {
        $.get(el, function(data) {
          $("#books_name").append(`<li>${data.name}</li>`);
          $("#load-img").css("display", "none");
        });
      });
      //
    } else {
      $("#books").css("display", "none");
      $("#load-img").css("display", "none");
    }
    hideLoader();
    $(".modal").css("display", "block");
  });
}

function closeModal() {
  $(".modal").css("display", "none");
}
function showLoader() {
  $(".loader").css("display", "block");
}
function hideLoader() {
  $(".loader").css("display", "none");
}

async function getBooksName() {}
