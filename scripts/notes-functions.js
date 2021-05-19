// Read existing notes from localStorage
const getSavedNotes = () => {
	const notesJSON = localStorage.getItem("notes");

	try {
		return notesJSON ? JSON.parse(notesJSON) : [];
	} catch (e) {
		return [];
	}
};

// Save the notes to localStorage
const saveNotes = notes => localStorage.setItem("notes", JSON.stringify(notes));

// Remove a note from the list
const removeNote = id => {
	const noteIndex = notes.findIndex(note => note.id === id);

	if (noteIndex > -1) {
		notes.splice(noteIndex, 1);
	}
};

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

const sortNotes = (notes, sortBy) =>
	notes.sort((a, b) => sortTheNotesBy(sortBy, a, b));

// sort your notes by one of three ways
const sortTheNotesBy = (sortBy, a, b) => {
	switch (sortBy) {
		case "byEdited":
			return a.updatedAt > b.updatedAt ? -1 : 1;

		case "byCreated":
			return a.createdAt > b.createdAt ? -1 : 1;

		case "alphabetical":
			return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
		default:
			return notes;
	}
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
