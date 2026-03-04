const DATE_OPTIONS = {
	year: "numeric",
	month: "long",
	day: "numeric",
	hour: "2-digit",
	minute: "2-digit",
};

export default function formatDateTime(dateString) {
	return new Date(dateString).toLocaleString("en-US", DATE_OPTIONS);
}
