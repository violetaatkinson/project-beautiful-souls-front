import createHttp from "./BaseService";

const authenticatedHttp = createHttp(true)

export const getMessages = (id) => authenticatedHttp.get(`/chat/${id}`).then((res) => res);

export const listMessages = () => authenticatedHttp.get('/chat/list').then((res) => res);

export const createMessage = (body) => authenticatedHttp.post("/chat/create", body).then((res) => res);

