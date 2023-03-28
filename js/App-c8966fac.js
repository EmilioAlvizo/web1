import {_ as e, L as t} from "./index-133d923f.js";
function r(e, t) {
    const r = t.el.querySelectorAll(`[data-js-target*="${e}."]`);
    for (const o of r) {
        const r = o;
        if (r.dataset.jsTarget) {
            const n = r.dataset.jsTarget.split(" ").filter(t=>t.includes(e + ".")).map(e=>e.split(".")[1]);
            for (const e of n)
                t[e] = o
        }
    }
    let o;
    const n = Array.from(t.el.querySelectorAll(`[data-js-target-list*="${e}."]`)).reduce((t,r)=>{
        const n = r;
        return o = function(e, t) {
            const r = new RegExp(t + ".(\\S+)","g")
              , o = e.match(r);
            if (o && o.length)
                return o[0].split(".")[1]
        }(n.dataset.jsTargetList, e),
        o ? (t[o] ? t[o].push(n) : t[o] = [n],
        t) : t
    }
    , {});
    Object.keys(n).forEach(e=>{
        t[e] = n[e]
    }
    )
}
class o {
    static get allDependencies() {
        return [...this.dependencies, ...this.optionalDependencies]
    }
    constructor(t) {
        e(this, "el", void 0),
        e(this, "__childControllers", void 0),
        e(this, "__domId", void 0),
        this.__childControllers = t
    }
    __initMemembers(e, t) {
        this.el = t,
        this.__domId = e,
        r(e, this)
    }
    async connect() {}
    disconnect() {}
    reconnect() {
        return this.disconnect(),
        this.__initMemembers(this.__domId, this.el),
        this.connect()
    }
    childController(e) {
        if (!this.constructor.allDependencies.includes(e))
            throw new Error("Cannot search for unregistered dependency " + e.name);
        for (const t of this.__childControllers)
            if (t instanceof e)
                return t
    }
    childControllers(e) {
        if (!this.constructor.allDependencies.includes(e))
            throw new Error("Cannot search for unregistered dependency " + e.name);
        const t = [];
        for (const r of this.__childControllers)
            r instanceof e && t.push(r);
        return t.sort((e,t)=>e.el === t.el ? 0 : e.el.compareDocumentPosition(t.el) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1)
    }
    async trackEvent(e) {
        e.url = e.url ?? window.location.href;
        try {
            (await import("./SiteTracking-49154293.js")).SiteTracking.trackEvent(e)
        } catch (r) {
            let o;
            if (e.legacy)
                o = `Cannot track legacy interactions for ${e.source}.`;
            else {
                const {category: t, label: r} = e;
                o = `Cannot track interactions for ${t}: ${r}.`
            }
            t.warn("Failed to load Tracking. " + o, r)
        }
    }
}
e(o, "dependencies", []),
e(o, "optionalDependencies", []);
class n {
    constructor(t) {
        e(this, "__registry", void 0),
        e(this, "__instancesByControllerAndDomNode", new Map),
        this.__registry = t
    }
    __controllersFromString(e) {
        var t;
        const r = new Set;
        return null == e || null === (t = e.split(" ")) || void 0 === t || t.forEach(e=>{
            const t = this.__registry.controllersById.get(e);
            t && r.add(t)
        }
        ),
        r
    }
    __controllersForNode(e) {
        return this.__controllersFromString(e.dataset.jsController)
    }
    nodesForController(e, t) {
        const r = `[data-js-controller~=${this.__registry.idForController(t)}]`
          , o = new Set;
        e.matches(r) && o.add(e);
        for (const t of e.querySelectorAll(r))
            o.add(t);
        return o
    }
    instanceForNode(e, t) {
        const r = this.__instancesByControllerAndDomNode.get(e);
        if (r)
            return r.get(t)
    }
    setNodeInstance(e, t) {
        const r = e.constructor;
        let o = this.__instancesByControllerAndDomNode.get(r);
        o || (o = new Map,
        this.__instancesByControllerAndDomNode.set(r, o)),
        o.set(t, e)
    }
    removeNodeInstance(e) {
        const t = e.constructor;
        let r = this.__instancesByControllerAndDomNode.get(t);
        r || (r = new Map,
        this.__instancesByControllerAndDomNode.set(t, r));
        for (const [t,o] of r.entries())
            o === e && r.delete(t)
    }
    observeDOM(e, {onControllerNodesAdded: t, onControllerNodesRemoved: r}) {
        const o = new MutationObserver(e=>{
            const o = new Set
              , n = new Set;
            for (const t of e) {
                for (const e of t.addedNodes)
                    if (e instanceof HTMLElement) {
                        const t = new Set(e.querySelectorAll("[data-js-controller]"));
                        e.matches("[data-js-controller]") && t.add(e),
                        t.forEach(e=>{
                            this.__controllersForNode(e).forEach(t=>{
                                o.add([e, t])
                            }
                            )
                        }
                        )
                    }
                for (const e of Array.from(t.removedNodes))
                    if (e instanceof HTMLElement) {
                        const t = new Set(e.querySelectorAll("[data-js-controller]"));
                        e.matches("[data-js-controller]") && t.add(e),
                        t.forEach(e=>{
                            this.__controllersForNode(e).forEach(t=>{
                                var r;
                                const o = null === (r = this.__instancesByControllerAndDomNode.get(t)) || void 0 === r ? void 0 : r.get(e);
                                o && n.add(o)
                            }
                            )
                        }
                        )
                    }
                if ("attributes" === t.type) {
                    const e = t.target;
                    if (e instanceof HTMLElement) {
                        const r = this.__controllersForNode(e);
                        this.__controllersFromString(t.oldValue).forEach(t=>{
                            if (!r.has(t)) {
                                var o;
                                const r = null === (o = this.__instancesByControllerAndDomNode.get(t)) || void 0 === o ? void 0 : o.get(e);
                                r && n.add(r)
                            }
                        }
                        ),
                        r.forEach(t=>{
                            var r;
                            null !== (r = this.__instancesByControllerAndDomNode.get(t)) && void 0 !== r && r.has(e) || o.add([e, t])
                        }
                        )
                    }
                }
            }
            o.size > 0 && t(o),
            n.size > 0 && r(n)
        }
        );
        return o.observe(e, {
            attributes: !0,
            attributeFilter: ["data-js-controller"],
            attributeOldValue: !0,
            subtree: !0,
            childList: !0
        }),
        ()=>o.disconnect()
    }
}
const s = "ToRoots"
  , i = "ToLeaves";
class d {
    constructor() {
        e(this, "__verticies", new Map)
    }
    add(e) {
        let t = this.__verticies.get(e);
        return t || (t = {
            value: e,
            dependsOn: new Set,
            dependedOnBy: new Set
        },
        this.__verticies.set(e, t)),
        t
    }
    vertex(e) {
        const t = this.__verticies.get(e);
        if (!t)
            throw new Error("Vertex not found in DAG!");
        return t
    }
    *walk(e, t, r=new Set, o=[]) {
        const n = this.__verticies.get(e);
        if (!n || r.has(e))
            return;
        const i = t === s;
        o.push(e),
        r.add(e),
        i || (yield[n, o]);
        const d = i ? n.dependedOnBy : n.dependsOn;
        for (const e of d)
            yield*this.walk(e, t, r, o);
        i && (yield[n, o]),
        o.pop()
    }
    addEdge(e, t) {
        if (e === t)
            return;
        const r = this.add(e)
          , o = this.add(t);
        if (!o.dependedOnBy.has(e)) {
            for (const [r,o] of this.walk(e, s))
                if (r.value === t)
                    throw new Error("Circular dependency detected: " + o.join(" -> "));
            o.dependedOnBy.add(e),
            r.dependsOn.add(t)
        }
    }
}
class a {
    constructor() {
        e(this, "__controllersById", new Map),
        e(this, "__idsByController", new Map),
        e(this, "__classHierarchy", new d)
    }
    get controllersById() {
        return this.__controllersById
    }
    register(e, t) {
        if (this.__controllersById.has(e))
            throw new Error(`A controller is already registered with id "${e}"`);
        if (this.__idsByController.has(t)) {
            const r = this.__idsByController.get(t);
            if (r)
                throw new Error(`Attempted to register a controller under two names "${e}" and "${r}"`)
        }
        this.__classHierarchy.add(t);
        for (const e of this.__controllersById.values())
            Object.getPrototypeOf(e) === t ? this.__classHierarchy.addEdge(t, e) : Object.getPrototypeOf(t) === e && this.__classHierarchy.addEdge(e, t);
        this.__controllersById.set(e, t),
        this.__idsByController.set(t, e)
    }
    withSubclasses(e) {
        const t = new Set;
        for (const [r] of this.__classHierarchy.walk(e, i))
            t.add(r.value);
        return t
    }
    idForController(e) {
        const t = this.__idsByController.get(e);
        if (!t)
            throw new Error("Cannot get id for unregistered controller " + e.name);
        return t
    }
}
class c {
    constructor() {
        e(this, "__requiredDependencyGraph", new d),
        e(this, "__optionalDependencyGraph", new d)
    }
    register(e) {
        this.__requiredDependencyGraph.add(e),
        this.__optionalDependencyGraph.add(e);
        for (const t of e.dependencies)
            this.__requiredDependencyGraph.addEdge(e, t),
            this.register(t);
        for (const t of e.optionalDependencies)
            this.__optionalDependencyGraph.addEdge(e, t),
            this.register(t)
    }
    dependencies(e) {
        const t = this.__requiredDependencyGraph.vertex(e)
          , r = [...t.dependsOn].map(e=>({
            dependency: e,
            required: !0
        }))
          , o = [...this.__optionalDependencyGraph.vertex(e).dependsOn].filter(e=>!t.dependsOn.has(e)).map(e=>({
            dependency: e,
            required: !1
        }));
        return new Set([...r, ...o])
    }
}
class l {
    constructor(t, r) {
        e(this, "__dependencyManager", new c),
        e(this, "__domManager", void 0),
        e(this, "__registry", void 0),
        e(this, "__connectPromises", new Map),
        this.__domManager = t,
        this.__registry = r
    }
    async __initChildren(e, t) {
        const r = [];
        for (const {dependency: o, required: n} of this.__dependencyManager.dependencies(e)) {
            const e = [];
            for (const r of this.__registry.withSubclasses(o))
                e.push(this.initController(r, t));
            r.push({
                required: n,
                dependency: o,
                promises: e
            })
        }
        const o = (await Promise.all(r.map(({promises: e})=>Promise.all(e)))).reduce((e,t)=>[...e, new Set([...t].reduce((e,t)=>[...e, ...t], []))], []);
        return o.forEach((t,o)=>{
            if (r[o].required && t.size <= 0)
                throw new Error(`Missing required child Controller "${r[o].dependency.name}" for Controller "${e.name}"`)
        }
        ),
        new Set(o.reduce((e,t)=>[...e, ...t], []))
    }
    async initController(e, t) {
        if (!t)
            throw new Error("Missing node for controller!");
        this.__dependencyManager.register(e);
        const r = this.__domManager.nodesForController(t, e)
          , o = this.__registry.idForController(e)
          , n = new Set
          , s = [];
        for (const t of r)
            s.push([t, this.__initChildren(e, t)]);
        const i = new Map;
        (await Promise.all(s.map(([,e])=>e))).forEach((e,t)=>{
            i.set(s[t][0], e)
        }
        );
        const d = [];
        for (const t of r) {
            let r = this.__domManager.instanceForNode(e, t);
            if (r) {
                n.add(r);
                const e = this.__connectPromises.get(r);
                e && d.push(e)
            } else {
                r = new e(i.get(t) || new Set),
                n.add(r),
                this.__domManager.setNodeInstance(r, t),
                r.__initMemembers(o, t);
                const s = r.connect();
                d.push(Promise.resolve().then(()=>s))
            }
        }
        await Promise.all(d);
        for (const e of n)
            this.__connectPromises.delete(e);
        return n
    }
    destructController(e) {
        e.disconnect(),
        this.__domManager.removeNodeInstance(e)
    }
}
const _ = new class {
    constructor(t) {
        e(this, "__registry", new a),
        e(this, "__domManager", new n(this.__registry)),
        e(this, "__instanceManager", new l(this.__domManager,this.__registry)),
        e(this, "__started", !1),
        e(this, "__rootNode", void 0),
        e(this, "__onNodesAdded", e=>{
            this.__initControllers(e)
        }
        ),
        e(this, "__onNodesRemoved", e=>{
            for (const t of e)
                this.__instanceManager.destructController(t)
        }
        ),
        this.__rootNode = t
    }
    async register(e, t) {
        this.__registry.register(e, t),
        this.__started && await this.__startController(t, this.__rootNode)
    }
    async start() {
        this.__started = !0,
        this.__domManager.observeDOM(this.__rootNode, {
            onControllerNodesAdded: this.__onNodesAdded,
            onControllerNodesRemoved: this.__onNodesRemoved
        }),
        await this.__initControllers(new Set([...this.__registry.controllersById.values()].map(e=>[this.__rootNode, e])))
    }
    async __initControllers(e) {
        const r = [];
        for (const [t,o] of e)
            r.push(this.__startController(o, t));
        var o;
        (await (o = r,
        Promise.all(o.map(e=>e.then(e=>({
            status: "fulfilled",
            value: e
        })).catch(e=>({
            status: "rejected",
            reason: e
        })))))).forEach(e=>{
            "rejected" === e.status && t.error(e.reason)
        }
        )
    }
    __startController(e, t) {
        return this.__instanceManager.initController(e, t)
    }
}
(document.documentElement);
export {o as C, _ as a};
