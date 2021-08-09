const addBtn = document.getElementById("add-notes");
const notesTitle = document.getElementById("notes-title");
const notesText = document.getElementById("notes-text");
const notesContainer = document.querySelector(".notes-container");
const myNoteDiv = document.querySelector(".note");

const EDIT = "edit";
const DELETE = "delete";

window.addEventListener("DOMContentLoaded", getNotes);
addBtn.addEventListener("click", addNote);
notesContainer.addEventListener("click", editOrDelete);

function addNote(e) {
  e.preventDefault();
  validateInput();

  clearInputs([notesTitle, notesText]);

  getNotes();
}

function validateInput() {
  if (!notesText.value || !notesTitle.value) {
    alert("Notes Title and Text can not be blank");
  } else {
    setNotes();
  }
}

function clearInputs(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

function setNotes() {
  let myNoteObj = {
    title: notesTitle.value,
    text: notesText.value,
  };
  myNotes.push(myNoteObj);

  localStorage.setItem("notes", JSON.stringify(myNotes));
}

function getNotes() {
  let notes = localStorage.getItem("notes");

  checkNoteStorage(notes);
  noteDiv();
}

function checkNoteStorage(notes) {
  if (notes == null) {
    return (myNotes = []);
  } else {
    return (myNotes = JSON.parse(notes));
  }
}

function noteDiv() {
  let str = "";
  myNotes.forEach((note, index) => {
    let noteu = ` <div class="note" id="${index}">
    <p class="note-counter">Note:${index + 1}</p>
    <h3 class="note-heading">${note.title}</h3>
    <p class="note-text">${note.text}</p>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
    </div>`;
    str = str + noteu;
  });
  notesContainer.innerHTML = str;
}

function editOrDelete(event) {
  let editOrDel = event.target.parentNode;
  let toEditOrDel = event.target.classList[0];
  if (toEditOrDel == DELETE) {
    deleteNote(editOrDel); return
  }
  if (toEditOrDel == EDIT) {
    editNote(editOrDel);
  }
}

function editNote(item) {
  if (!notesTitle.value && !notesText.value) {
    let data = myNotes[item.id];
    notesText.value = data.text;
    notesTitle.value = data.title;

    deleteNote(item);
  } else {
    alert("kindly clear Notes-Title and Notes-Text to edit note");
  }
}

function deleteNote(item) {
  myNotes.splice(item.id, 1);

  localStorage.setItem("notes", JSON.stringify(myNotes));

  getNotes();
}
