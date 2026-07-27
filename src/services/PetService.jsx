import createHttp from "./BaseService";

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

const withCoordsQuery = (path, coords) => {
	if (!coords) return path;
	const params = new URLSearchParams({ lat: coords.lat, lng: coords.lng });
	return `${path}?${params.toString()}`;
};

export const getPets = (coords) =>
	authenticatedHttp
		.get(withCoordsQuery("/adoptions", coords))
		.then((res) => res);

export const getMyPets = () =>
	authenticatedHttp.get("/myadoptions").then((res) => res);

export const getPetDetail = (id, coords) =>
	unauthenticatedHttp
		.get(withCoordsQuery(`/adoptions/${id}`, coords))
		.then((res) => res);

export const createPet = (body) =>
	authenticatedHttp.post("/adoptions/create", body).then((res) => res);

export const updatePet = (id, body) =>
	authenticatedHttp.post(`/adoptions/${id}`, body).then((res) => res);

export const deletePet = (id) =>
	authenticatedHttp.delete(`/adoptions/${id}`).then((res) => res);

export const likePet = (id) =>
	authenticatedHttp.post(`/like/${id}`).then((res) => res);

export const dislikePet = (id) =>
	authenticatedHttp.post(`/dislike/${id}`).then((res) => res);
