import uuidv4 from "uuid";
import moment from "moment";

let notes = [];

// Read existing notes from localStorage
const loadNotes = () => {
	const notesJSON = localStorage.getItem("notes");

	try {
		return notesJSON ? JSON.parse(notesJSON) : [];
	} catch (e) {
		return [];
	}
};

// Save the notes to localStorage
const saveNotes = () => localStorage.setItem("notes", JSON.stringify(notes));

// Expose notes from module
notes = loadNotes();
const getNotes = () => notes;

const createNote = () => {
	const noteId = uuidv4();
	const timestamp = moment().valueOf();

	notes.push({
		id: noteId,
		title: "",
		body: "",
		createdAt: timestamp,
		updatedAt: timestamp,
	});
	saveNotes();
};

// Remove a note from the list
const removeNote = id => {
	const noteIndex = notes.findIndex(note => note.id === id);

	if (noteIndex > -1) {
		notes.splice(noteIndex, 1);
		saveNotes();
	}
};

const sortNotes = sortBy => notes.sort((a, b) => sortTheNotesBy(sortBy, a, b));

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

const updateNote = (id, updates) => {
	const note = notes.find(note => note.id === id);

	if (!note) return;

	if (typeof updates.title === "string") {
		note.title = updates.title;
		note.updatedAt = moment().valueOf();
	}

	if (typeof updates.body === "string") {
		note.body = updates.body;
		note.updatedAt = moment().valueOf();
	}

	saveNotes();
};

export { getNotes, createNote, removeNote, sortNotes, updateNote };
