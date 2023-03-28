function e(e, r, n) {
    return r in e ? Object.defineProperty(e, r, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = n,
    e
}
const r = new class extends class {
    warn(e, ...r) {
        throw new Error("Not implmeneted!")
    }
    info(e, ...r) {
        throw new Error("Not implmeneted!")
    }
    error(e, ...r) {
        throw new Error("Not implmeneted!")
    }
    table(e, ...r) {
        throw new Error("Not implmeneted!")
    }
}
{
    info() {}
    warn() {}
    error() {}
    table() {}
}
;
export {r as L, e as _};
