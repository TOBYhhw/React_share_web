import { myAxios2 } from "../http";

export function apiGetUser(data) {
    return myAxios2({
        url: "/admin/queryAllUser?",
        method: "post",
        params: data,
    });
}

export function apiSearchUser(data) {
    return myAxios2({
        url: "/admin/queryUserInfoByName?",
        method: "post",
        params: data,
    });
}
