import crossFetch from "cross-fetch";
import AbortController from "abort-controller";
const request = (baseUrl, alternativeFetchImpl) => (baseHeaders) => (method) => (route) => (payload) => (token) => {
    const headers = baseHeaders || {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const fetch = alternativeFetchImpl || crossFetch;
    const abortCtrl = new AbortController();
    const signal = abortCtrl.signal;
    const httpConfig = {
        method,
        headers,
        signal
    };
    if (payload) {
        httpConfig.body =
            typeof payload === "object" ? JSON.stringify(payload) : payload;
    }
    const res = fetch(`${baseUrl}${route || ""}`, httpConfig);
    res.abort = () => {
        abortCtrl.abort();
    };
    return res;
};
export default request;
