import { useAppSelector } from './../redux/hook';
import axios from "axios";
import { api_url } from "../constants/app_constants";

export const useAxios = (
  contentType?: "application/json" | "multipart/form-data"
) => {

  const { token } = useAppSelector(state => state.auth)

  return axios.create({
    baseURL: api_url,
    headers: {
      "Content-Type": contentType as string,
      accept: "application/json",
      authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
};
