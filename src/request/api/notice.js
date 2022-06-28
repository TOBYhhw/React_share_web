import { myAxios } from "../http";
import { myAxios2 } from "../http";
export function apiGetNotice() {
    return myAxios({
        url: "/notice/queryNotice?",
        method: "get"
    });
}

export function apiUpdateNotice(data) {
    return myAxios2({
        url: "/admin/updateNotice?",
        method: "post",
        params: data
    });
}
