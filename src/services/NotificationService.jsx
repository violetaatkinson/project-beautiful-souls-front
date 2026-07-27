import createHttp from "./BaseService";

const authenticatedHttp = createHttp(true)

export const getNotifications = () => authenticatedHttp.get('/notifications').then((res) => res);

export const clearNotifications = () => authenticatedHttp.delete('/notifications').then((res) => res);
