let notes = getSavedNotes();

const filters = {
	searchText: "",
	sortBy: "byEdited",
};

renderNotes(notes, filters);

document.querySelector("#create-note").addEventListener("click", e => {
	const noteId = uuidv4();
	const timestamp = moment().valueOf();

	notes.push({
		id: noteId,
		title: "",
		body: "",
		createdAt: timestamp,
		updatedAt: timestamp,
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

window.addEventListener("storage", e => {
	if (e.key === "notes") {
		notes = JSON.parse(e.newValue);
		renderNotes(notes, filters);
	}
});
