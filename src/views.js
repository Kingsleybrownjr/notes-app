import moment from "moment";
import { getFilters } from "./filters";
import { getNotes, sortNotes } from "./notes";

// Generate the DOM structure for a note
const generateNoteDOM = note => {
	const noteEl = document.createElement("a");
	const textEl = document.createElement("p");
	const statusEl = document.createElement("p");

	// Setup the note title text
	note.title.length > 0
		? (textEl.textContent = note.title)
		: (textEl.textContent = "Unnamed note");

	textEl.classList.add("list-item__title");
	noteEl.appendChild(textEl);

	// set up link
	noteEl.setAttribute("href", `/edit.html#${note.id}`);
	noteEl.classList.add("list-item");

	// set up status message
	statusEl.textContent = generateLastEdited(note.updatedAt);
	statusEl.classList.add("list-item__subtitle");

	noteEl.appendChild(statusEl);

	return noteEl;
};

// Render application notes
const renderNotes = () => {
	const notesEl = document.querySelector("#notes");
	const filters = getFilters();
	const notes = sortNotes(filters.sortBy);

	const filteredNotes = notes.filter(note =>
		note.title.toLowerCase().includes(filters.searchText.toLowerCase())
	);

	notesEl.innerHTML = "";

	if (filteredNotes.length < 1) {
		const emptyMessage = document.createElement("p");
		emptyMessage.textContent = "No Notes To Show";
		emptyMessage.classList.add("empty-message");
		notesEl.appendChild(emptyMessage);
	} else {
		filteredNotes.forEach(note => {
			const noteEl = generateNoteDOM(note);
			notesEl.appendChild(noteEl);
		});
	}
};

const renderEditPage = (noteId) => {
	const titleElement = document.querySelector("#note-title");
	const bodyElement = document.querySelector("#note-body");
	const dateElement = document.querySelector("#last-edited");

	const notes = getNotes();
	const note = notes.find(note => note.id === noteId);

	if (note === undefined) {
		location.assign("/index.html");
	}
	
	titleElement.value = note.title;
	bodyElement.value = note.body;
	dateElement.textContent = generateLastEdited(note.updatedAt);
};

// Generate the last edited message
const generateLastEdited = timestamp =>
	`Last edited ${moment(timestamp).fromNow()}`;

export { generateNoteDOM, renderNotes, generateLastEdited, renderEditPage };
