// Determine display name from given info. Priority:
// 1. firstname lastname
// 2. firstname (if no lastname give)
// 3. username (email minus @example.com, if no names given)

export default function displayName(firstname, lastname, username) {
	const displayName = firstname
		? `${firstname}${lastname ? " " + lastname : ""}`
		: username.split("@")[0];

	return displayName;
}
