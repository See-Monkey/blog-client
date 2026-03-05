export default function truncateAtWord(text, maxLength) {
	if (text.length <= maxLength) return text;

	const truncated = text.slice(0, maxLength);
	return truncated.slice(0, truncated.lastIndexOf(" ")) + " ...";
}
