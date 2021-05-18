const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const saveNoteBtn = document.querySelector("#save-note");
const removeBtn = document.querySelector("#remove-note");

const noteId = location.hash.substring(1);
let notes = getSavedNotes();

let note = notes.find(note => note.id === noteId);

if (note === undefined) {
	location.assign("/index.html");
}

titleElement.value = note.title;
bodyElement.value = note.body;

titleElement.addEventListener("input", e => {
	note.title = e.target.value;
	saveNotes(notes);
});

bodyElement.addEventListener("input", e => {
	note.body = e.target.value;
	saveNotes(notes);
});

saveNoteBtn.addEventListener("click", e => saveNotes(notes));

removeBtn.addEventListener("click", e => {
	removeNote(note.id);
	saveNotes(notes);
});

window.addEventListener("storage", e => {
	if (e.key === "notes") {
		notes = JSON.parse(e.newValue);

		note = notes.find(note => note.id === noteId);

		if (note === undefined) {
			location.assign("/index.html");
		}

		titleElement.value = note.title;
		bodyElement.value = note.body;
	}
});
