import { myAxios2 } from "../http";
export function apiGetPassage(data) {
    return myAxios2({
        url: "/passage/queryAllPassage?",
        method: "get",
        params: data,
    });
}
export function apiDownResource(data) {
    return myAxios2({
        url: "/passage/downResources?",
        method: "post",
        data,
        responseType: "blob"
    })
}
export function apiGetPassageResource(data) {
    return myAxios2({
        url: "/passage/passageResources?",
        method: "get",
        params: data,
    });
}

export function apiCreatePassage(data) {
    return myAxios2({
        url: "/admin/createPassage?",
        method: "post",
        params: data,
    });
}

export function apiCreateComment(data) {
    return myAxios2({
        url: "/comment/createComment?",
        method: "post",
        params: data,
    });
}
export function apiCreateAdminComment(data) {
    return myAxios2({
        url: "/admin/createComment?",
        method: "post",
        params: data,
    });
}
export function apiUploadResource(data) {
    return myAxios2({
        url: "/admin/uploadResources?",
        method: "post",
        data,
        responseType: "blob",
    });
}
export function apiUploadImg(data) {
    return myAxios2({
        url: "/admin/uploadImg?",
        method: "post",
        data,
        responseType: "blob"
    })
}
export function apiRemoveComment(data) {
    return myAxios2({
        url: "/admin/deleteComment?",
        method: "post",
        params: data,
    });
}

export function apiRemovePassage(data) {
    return myAxios2({
        url: "/admin/deletePassage?",
        method: "post",
        params: data,
    });
}

export function apiRemoveResource(data) {
    return myAxios2({
        url: "/admin/deleteResources?",
        method: "post",
        params: data,
    });
}
export function apiGetFileCount() {
    return myAxios2({
        url: "/admin/queryTotalFileCount",
        method: "post",
    });
}
