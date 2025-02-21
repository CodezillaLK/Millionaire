import axios from "axios";
import { GKQUIZ_BD_BACKEND_URL } from "../constants/settings";

export const createNewUser = async (payload) => {
  return await axios.post(`${GKQUIZ_BD_BACKEND_URL}/bd/newUser`, payload);
};
