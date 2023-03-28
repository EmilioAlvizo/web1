const r = Object.freeze(["stripecdn.com"]);
function t(t) {
    try {
        if (function(t) {
            const {hostname: e} = new URL(t);
            return r.some(r=>e === r || e.endsWith("." + r))
        }(t))
            return import(t);
        throw new Error(t + " not allowed for dynamic import")
    } catch (r) {
        return Promise.reject(r)
    }
}
export {t as s};
