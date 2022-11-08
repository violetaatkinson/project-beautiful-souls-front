import createHttp from "./BaseService";
import { } from "../services/NotificationService";

const authenticatedHttp = createHttp(true)

export const getNotifications = () => authenticatedHttp.get('/notifications').then((res) => res);