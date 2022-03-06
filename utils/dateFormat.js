const addDateSuffix = (date) => {
	let dateString = date.toString();

	const endCharacter = dateString.charAt(dateString.length - 1);

	if (endCharacter === "1" && dateString !== "11") {
		dateString = `${dateString}st`;
	} else if (endCharacter === "2" && dateString !== "12") {
		dateString = `${dateString}nd`;
	} else if (endCharacter === "3" && dateString !== "13") {
		dateString = `${dateString}rd`;
	} else {
		dateString = `${dateString}th`;
	}

	return dateString;
};

module.exports = (
	timestamp,
	{ monthLength = "short", dateSuffix = true } = {}
) => {
	let months;

	if (monthLength === "short") {
		months = {
			0: "Jan",
			1: "Feb",
			2: "Mar",
			3: "Apr",
			4: "May",
			5: "Jun",
			6: "Jul",
			7: "Aug",
			8: "Sep",
			9: "Oct",
			10: "Nov",
			11: "Dec",
		};
	} else {
		months = {
			0: "January",
			1: "February",
			2: "March",
			3: "April",
			4: "May",
			5: "June",
			6: "July",
			7: "August",
			8: "September",
			9: "October",
			10: "November",
			11: "December",
		};
	}

	const dateItem = new Date(timestamp);
	const month = months[dateItem.getMonth()];

	let day;

	if (dateSuffix) {
		day = addDateSuffix(dateItem.getDate());
	} else {
		day = dateItem.getDate();
	}

	const year = dateItem.getFullYear();

	let hour;

	if (dateItem.getHours > 12) {
		hour = Math.floor(dateItem.getHours() / 2);
	} else {
		hour = dateItem.getHours();
	}

	if (hour === 0) {
		hour = 12;
	}

	const minutes = dateItem.getMinutes();

	let periodOfDay;

	if (dateItem.getHours() >= 12) {
		periodOfDay = "pm";
	} else {
		periodOfDay = "am";
	}

	const timeStamp = `${month} ${day}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

	return timeStamp;
};
