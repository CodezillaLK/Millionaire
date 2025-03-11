import axios from "axios";
import { GKQUIZ_BD_BACKEND_URL } from "../constants/settings";

// rubi
export const sendOTP = async (payload) => {
  return await axios.post(`${GKQUIZ_BD_BACKEND_URL}/bd/rubi-sendOTP`, payload);
};

export const verifyOTP = async (payload) => {
  return await axios.post(
    `${GKQUIZ_BD_BACKEND_URL}/bd/rubi-verifyOTP`,
    payload,
  );
};

export const unsubscribeRobi = async (payload) => {
  return await axios.post(
    `${GKQUIZ_BD_BACKEND_URL}/bd/rubi-unsubscribe`,
    payload,
  );
};

// al
export const sendAppLinkOTP = async (payload) => {
  return await axios.post(`${GKQUIZ_BD_BACKEND_URL}/bd/al-sendOTP`, payload);
};

export const verifyAppLinkOTP = async (payload) => {
  return await axios.post(`${GKQUIZ_BD_BACKEND_URL}/bd/al-verifyOTP`, payload);
};

export const unsubscribeAppLink = async (payload) => {
  return await axios.post(`${GKQUIZ_BD_BACKEND_URL}/bd/al-unsubscribe`, payload)
}

// gp
export const getGPpaymentURL = async (payload) => {
  return await axios.post(`${GKQUIZ_BD_BACKEND_URL}/bd/gp-paymentURL`, payload);
};

export const gpUpdateSUBID = async (payload) => {
  return await axios.post(`${GKQUIZ_BD_BACKEND_URL}/bd/gp-updateUser`, payload);
};

export const gpUnsubUser = async (payload) => {
  return await axios.post(
    `${GKQUIZ_BD_BACKEND_URL}/bd/gp-unsubscribe`,
    payload,
  );
};
