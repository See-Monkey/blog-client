import { apiFetch } from "./client.js";

export const getAnalytics = () => apiFetch("/analytics");
