import axios from "axios";

const base_url = "http://localhost:8000";
export const api = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});
