import { updateNote, removeNote } from "./notes";
import { renderEditPage, generateLastEdited } from "./views";

const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const dateElement = document.querySelector("#last-edited");
const saveNoteBtn = document.querySelector("#save-note");
const removeBtn = document.querySelector("#remove-note");

const noteId = location.hash.substring(1);

renderEditPage(noteId);

titleElement.addEventListener("input", e => {
	const note = updateNote(noteId, {
		title: e.target.value,
	});
	dateElement.textContent = generateLastEdited(note.updatedAt);
});

bodyElement.addEventListener("input", e => {
	const note = updateNote(noteId, {
		body: e.target.value,
	});
	dateElement.textContent = generateLastEdited(note.updatedAt);
});

saveNoteBtn.addEventListener("click", e => saveNotes());

removeBtn.addEventListener("click", e => removeNote(noteId));

window.addEventListener("storage", e => {
	if (e.key === "notes") {
		renderEditPage(noteId);
	}
});
