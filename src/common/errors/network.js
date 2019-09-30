/**
 * 捕获网络连接与断开时的信息
 */
if(!window.__UNETWORK_ADDED) {
    window.addEventListener("online", function () {
        alert("网络已连接")
    }, false);
    window.addEventListener("offline", function () {
        alert("网络已断开")
    }, false);
    window.__UNETWORK_ADDED = true;
}

