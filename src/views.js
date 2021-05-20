import moment from "moment";

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
const renderNotes = (notes, filters) => {
	const notesEl = document.querySelector("#notes");

	notes = sortNotes(notes, filters.sortBy);
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

// Generate the last edited message
const generateLastEdited = timestamp =>
	`Last edited ${moment(timestamp).fromNow()}`;

export { generateNoteDOM, renderNotes, generateLastEdited };
