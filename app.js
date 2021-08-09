const addBtn = document.getElementById("add-notes");
const notesTitle = document.getElementById("notes-title");
const notesText = document.getElementById("notes-text");
const notesContainer = document.querySelector(".notes-container");
const myNoteDiv = document.querySelector(".note");

const EDIT = "edit";
const DELETE = "delete";
let myNotes;

addBtn.addEventListener("click", addNote);
//myNoteDiv.addEventListener("click", editOrDelete);
notesContainer.addEventListener("click", editOrDelete);

function addNote(e) {
    e.preventDefault();
    validateInput();

    clearInputs([notesTitle, notesText]);
    updateUi()
}

function validateInput() {
    if (!notesText.value || !notesTitle.value) {
        alert("Notes Title and Text can not be blank");
    } else {
        noteDiv(notesTitle, notesText);
        getNotes();
        setNotes();
    }
}

/*function noteDiv(title, text) {
    let str = "";
    
    let note = ` <div class="note">
    <p class="note-counter">Note-1</p>
    <h3 class="note-heading">${title.value}</h3>
    <p class="note-text">${text.value}</p>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
</div>`;
    str = str + note;
    notesContainer.innerHTML = str;
}*/
function noteDiv() {
    //getNotes();
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
    })
    notesContainer.innerHTML = str
}

function clearInputs(inputs) {
    inputs.forEach((input) => {
        input.value = "";
    });
}

function getNotes() {
    let notes = localStorage.getItem("notes");

    checkNoteStorage(notes);
}

function checkNoteStorage(notes) {

    if (notes == null) {
        return myNotes = [];
    } else {
        return myNotes = JSON.parse(notes);

    }
}

function editOrDelete(event) {
    //  getNotes()

    let editOrDel = event.target.parentNode
    let toEditOrDel = event.target.classList[0]
    if (toEditOrDel == DELETE) {
        deleteNote(editOrDel)
    }
    if (toEditOrDel == EDIT) {
        editNote()
    }

}

function editNote() {
    console.log("ll")
}

function deleteNote(item) {
    console.log(item.id)
    //  event.target.parentNode.remove() this will only remove it from dom not from storage
    //  console.log(JSON.parse(notes))


    myNotes.splice(item.id, 1)

    localStorage.setItem("notes", JSON.stringify(myNotes));
    updateUi()

}

function updateUi() {
    getNotes()
    noteDiv()



}
updateUi()

function setNotes() {
    //getNotes();
    // checkNoteStorage() nno need of this as we are already passing it in getnotes
    let myNoteObj = {
        title: notesTitle.value,
        text: notesText.value,
    };
    myNotes.push(myNoteObj);

    localStorage.setItem("notes", JSON.stringify(myNotes));
}