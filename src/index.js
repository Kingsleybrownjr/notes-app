import { createNote, getNotes, removeNote } from "./notes";
import { getFilters, setFilters } from "./filters";



let notes = getNotes;

const filters = {
	searchText: "",
	sortBy: "byEdited",
};

renderNotes(notes, filters);

document.querySelector("#create-note").addEventListener("click", e => {
	createNote();
	saveNotes(notes);
	location.assign(`/edit.html#${noteId}`);
});

document.querySelector("#search-text").addEventListener("input", e => {
	filters.searchText = e.target.value;
	renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", e => {
	filters.sortBy = e.target.value;
	renderNotes(notes, filters);
});

window.addEventListener("storage", e => {
	if (e.key === "notes") {
		notes = JSON.parse(e.newValue);
		renderNotes(notes, filters);
	}
});
