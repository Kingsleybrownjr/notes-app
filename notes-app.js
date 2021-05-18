const notes = getSavedNotes();

const filters = {
	searchText: "",
};

renderNotes(notes, filters);

document.querySelector("#create-note").addEventListener("click", e => {
	const noteId = uuidv4();
	notes.push({
		id: noteId,
		title: "",
		body: "",
	});
	saveNotes(notes);
	location.assign(`/edit.html#${noteId}`);
});

document.querySelector("#search-text").addEventListener("input", e => {
	filters.searchText = e.target.value;
	renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", e => {
	console.log(e.target.value);
});
