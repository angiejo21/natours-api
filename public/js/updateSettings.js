/*eslint-disable*/
import axios from "axios";
import { showAlert } from "./alerts";

//type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "/api/v1/users/updateMyPassword"
        : "/api/v1/users/updateMe";
    const res = await axios({
      method: "PATCH",
      url,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success")
      showAlert("success", `${type.toUpperCase()} successfully updated`);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
