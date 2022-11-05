import createHttp from "./BaseService";

const authenticatedHttp = createHttp(true)
const unauthenticatedHttp = createHttp(false)

export const createAdopted = (body) => authenticatedHttp.post("/adopted/create", body).then((res) => res);

export const getAdopted = () => unauthenticatedHttp.get("/adopted").then((res) => res);

export const getAdoptedCount = () => authenticatedHttp.get("/countadopted").then((res) => res);