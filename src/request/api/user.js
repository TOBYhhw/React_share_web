import { myAxios } from "../http";
export function apiLogin(data) {
    return myAxios({
        url: "/user/userLogin?",
        method: "post",
        params: data
    });
}
export function apiRegister(data) {
    return myAxios({
        url: "/user/register?",
        method: "post",
        params: data
    });
}
