import createHttp from "./BaseService";

const authenticatedHttp = createHttp(true)
const unauthenticatedHttp = createHttp(false)

export const createAdopted = (body) => authenticatedHttp.post("/adopted/create", body).then((res) => res);

export const getAdoptions = () => unauthenticatedHttp.get("/adopted").then((res) => res);