showNotes();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
  let addtxt = document.getElementById("addtxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }

  noteObj.push(addtxt.value);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  addtxt.value = "";
  console.log(noteObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let html = "";
  noteObj.forEach(function (element, index) {
    html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">Note ${index + 1}</h5>
      <p class="card-text">
      ${element}</p>
      <button id = "${index}" onclick= "deleteNote(this.id)"class="btn btn-primary">Delete Note</button>
    </div>
  </div>
    
    `;
  });

  let noteElm = document.getElementById("notes");
  if (noteObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = `Nothing to show ! Use Add note Section.`;
  }
}

function deleteNote(index) {
  console.log("I am Deeleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(noteObj));
  showNotes();
}

let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  //console.log("start input event", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    //console.log(cardtxt)
  });
});
