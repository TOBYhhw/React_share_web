import { myAxios } from "../http";
import { myAxios2 } from "../http";


export function apiGetComment(data) {
    return myAxios({
        url: "/hallComment/queryAllHallComment?",
        method: "post",
        params: data

    });
}
export function apiAddComment(data) {
    return myAxios2({
        url: "/hallComment/createHallComment?",
        method: "post",
        params: data
    });
}

export function apiRemoveComment(data) {
    return myAxios2({
        url: "/admin/deleteHallComment?",
        method: "post",
        params: data,
    });
}