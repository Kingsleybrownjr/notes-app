// Read existing notes from localStorage
const getSavedNotes = () => {
	const notesJSON = localStorage.getItem("notes");

	if (notesJSON !== null) return JSON.parse(notesJSON);
	return [];
};

// Save the notes to localStorage
const saveNotes = notes => {
	localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = id => {
	const noteIndex = notes.findIndex(note => {
		return note.id === id;
	});

	if (noteIndex > -1) {
		notes.splice(noteIndex, 1);
	}
};

// Generate the DOM structure for a note
const generateNoteDOM = note => {
	const noteEl = document.createElement("div");
	const textEl = document.createElement("a");
	const button = document.createElement("button");

	// Setup the remove note button
	button.textContent = "x";
	noteEl.appendChild(button);
	button.addEventListener("click", () => {
		removeNote(note.id);
		saveNotes(notes);
		renderNotes(notes, filters);
	});

	// Setup the note title text
	if (note.title.length > 0) {
		textEl.textContent = note.title;
	} else {
		textEl.textContent = "Unnamed note";
	}
	textEl.setAttribute("href", `/edit.html#${note.id}`);
	noteEl.appendChild(textEl);

	return noteEl;
};

// Render application notes
const renderNotes = (notes, filters) => {
	const filteredNotes = notes.filter(note =>
		note.title.toLowerCase().includes(filters.searchText.toLowerCase())
	);

	document.querySelector("#notes").innerHTML = "";

	filteredNotes.forEach(note => {
		const noteEl = generateNoteDOM(note);
		document.querySelector("#notes").appendChild(noteEl);
	});
};

// Generate the last edited message
const generateLastEdited = timestamp =>
	`Last edited ${moment(timestamp).fromNow()}`;
