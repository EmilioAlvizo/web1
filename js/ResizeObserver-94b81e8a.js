function e(e) {
    return new Promise(r=>{
        function s({ResizeObserver: s}) {
            r(new s(e))
        }
        "ResizeObserver"in window ? s({
            ResizeObserver: ResizeObserver
        }) : import("./resize-observer-736f301a.js").then(s)
    }
    )
}
export {e as c};
