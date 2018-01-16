function checkFilter(category, title, checked) {
	if (checked) {
		this[category].push(title);
	} else {
		// check if genre title is in array
		// if not, index will equal `-1`
		let index = this[category].indexOf(title);
		if (index > -1) {
			// remove one item from array at value assigned to `index`
			this[category].splice(index, 1);
		}
	}
}

function setDay(day) {
	this.day = day;
}

export { checkFilter, setDay };
