// $(document).ready(() => {
//   loadCharacters();
// });
$(document).ready(() => {
  loadCharacters();
});
function loadCharacters() {
  $(".section").empty();
  const url = "https://www.anapioficeandfire.com/api/characters";
  $.get(url, function(data) {
    hideLoader();
    data.forEach(element => {
      fedData(element);
    });
  });
}

function fedData(data) {
  let name = data.name ? data.name : "Not Available";
  let culture = data.culture ? data.culture : "Not Available";
  $(".section").append(
    `<div class="card">
          <div class="card-head">
             
          </div>
          <div class="card-body">
              <p>Name : ${name}</p>
              <p>Character : ${data.aliases[0]}</p>
              <p>Gender : ${data.gender}</p>
              <p>Culture : ${culture}</p>
          </div>
          <div class="card-footer">
              <button class="btn" onclick="openPage('${data.url}')">More Info</button>
          </div>
      </div>`
  );
}
function openPage(url) {
  showLoader();
  $.get(url, function(data) {
    let books = data.books;
    let name = data.name ? data.name : "Not Available";
    let culture = data.culture ? data.culture : "Not Available";
    let body = `
    <div class="modal-box">
            <div class="modal-head">
                <h2>${data.aliases}</h2>
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

function searchCharacter() {
  $(".section").empty();
  let text = $("#search-input").val();
  let regex = /[A-za-z0-9]/;
  if (regex.test(text)) {
    showLoader();
    const url = "https://www.anapioficeandfire.com/api/characters";
    $.get(url, function(data) {
      hideLoader();
      let status = false;
      data.forEach(element => {
        if (element.name.toLowerCase().includes(text.toLowerCase())) {
          fedData(element);
          status = true;
        }
      });
      if (!status) {
        findByBooks(text);
      }
    });
  } else {
    alert("please provide valid input");
  }
}

function findByBooks(text) {
  showLoader();
  const url = "https://www.anapioficeandfire.com/api/books";
  $.get(url, function(data) {
    hideLoader();
    let status = false;
    data.forEach(element => {
      if (element.name.toLowerCase().match(text.toLowerCase())) {
        status = true;
        element.characters.forEach(el => {
          getCharacterById(el);
        });
      }
    });
    if (!status) {
      $(".section").html("<h2>No Result Found</h2>");
    }
  });
}

function getCharacterById(url) {
  $.get(url, function(data) {
    fedData(data);
  });
}
