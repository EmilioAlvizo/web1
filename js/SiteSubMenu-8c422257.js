import {_ as e} from "./index-133d923f.js";
import {C as t, a as i} from "./App-c8966fac.js";
import {c as s} from "./ResizeObserver-94b81e8a.js";
import {K as n} from "./Keycodes-07387646.js";
const r = window.PointerEvent ? {
    up: "pointerup",
    enter: "pointerenter",
    leave: "pointerleave"
} : {
    up: "touchend",
    enter: "mouseenter",
    leave: "mouseleave"
};
class o extends t {
    constructor(...t) {
        super(...t),
        e(this, "el", void 0),
        e(this, "navTriggers", void 0),
        e(this, "sections", void 0),
        e(this, "navTriggersHeights", []),
        e(this, "resizeObserver", void 0),
        e(this, "activeSectionIndex", 0),
        e(this, "keydownHandler", void 0),
        e(this, "sectionsKeydownRemoveListenerCallbacks", []),
        e(this, "parentMenuIndex", void 0),
        e(this, "debounceEnterTimer", void 0),
        e(this, "horizontalMouseSpeeds", []),
        e(this, "previousMousePosition", 0),
        e(this, "handleTriggerEntered", e=>{
            if (e instanceof PointerEvent && "touch" === e.pointerType)
                return;
            const t = e.currentTarget;
            this.debounceEnterTimer && window.clearTimeout(this.debounceEnterTimer);
            this.horizontalMouseSpeeds.reduce((e,t)=>e + t, 0) / this.horizontalMouseSpeeds.length >= o.thresholdDebounceSpeed ? this.debounceEnterTimer = window.setTimeout(()=>this.handlerDebounceEnterTimerCompleted(t), 150) : this.showSubsectionForTrigger(t)
        }
        ),
        e(this, "handleTriggerLeave", ()=>{
            this.debounceEnterTimer && window.clearTimeout(this.debounceEnterTimer)
        }
        ),
        e(this, "handlerDebounceEnterTimerCompleted", e=>{
            this.showSubsectionForTrigger(e)
        }
        ),
        e(this, "handleTriggerClicked", e=>{
            this.showSubsectionForTrigger(e.currentTarget)
        }
        ),
        e(this, "handleMouseMove", e=>{
            const {clientX: t} = e;
            this.previousMousePosition || (this.previousMousePosition = t);
            const i = t - this.previousMousePosition;
            this.horizontalMouseSpeeds.push(i),
            this.previousMousePosition = t,
            this.horizontalMouseSpeeds.length > o.horizontalMouseSpeedsMaxLength && this.horizontalMouseSpeeds.shift()
        }
        ),
        e(this, "handleResize", ()=>{
            this.setNavTriggerHeights(),
            this.setNavHoverPositions(this.activeSectionIndex)
        }
        ),
        e(this, "registerArrowKeyNavigation", ()=>{
            void 0 !== this.keydownHandler && this.unregisterArrowKeyNavigation();
            let e = 0;
            const t = this.navTriggers;
            t[e].focus(),
            this.keydownHandler = i=>{
                switch (i.keyCode) {
                case n.UP:
                    i.preventDefault(),
                    i.stopPropagation(),
                    e -= 1,
                    e < 0 && (e += t.length),
                    t[e].focus();
                    break;
                case n.DOWN:
                    i.preventDefault(),
                    i.stopPropagation(),
                    e += 1,
                    e >= t.length && (e -= t.length),
                    t[e].focus();
                    break;
                case n.LEFT:
                    i.preventDefault(),
                    i.stopPropagation(),
                    -1 === e && (e = this.activeSectionIndex,
                    this.navTriggers[this.activeSectionIndex].focus());
                    break;
                case n.RIGHT:
                case n.RETURN:
                    if (-1 !== e) {
                        i.preventDefault(),
                        i.stopPropagation();
                        Array.from(this.sections[this.activeSectionIndex].querySelectorAll("a"))[0].focus(),
                        e !== this.activeSectionIndex ? this.displaySection(e, !0) : this.registerActiveSectionArrowKeyNavigation(),
                        e = -1
                    }
                    break;
                case n.TAB:
                    i.shiftKey && -1 === e && (i.preventDefault(),
                    i.stopPropagation(),
                    e = this.activeSectionIndex,
                    this.navTriggers[this.activeSectionIndex].focus())
                }
            }
            ,
            this.el.addEventListener("keydown", this.keydownHandler)
        }
        ),
        e(this, "unregisterArrowKeyNavigation", ()=>{
            this.keydownHandler && this.el.removeEventListener("keydown", this.keydownHandler),
            this.keydownHandler = void 0
        }
        ),
        e(this, "registerActiveSectionArrowKeyNavigation", ()=>{
            this.unregisterActiveSectionArrowKeyNavigation();
            const e = this.sections[this.activeSectionIndex];
            let t = 0;
            const i = Array.from(e.querySelectorAll("a"));
            i[t].focus();
            const s = e=>{
                switch (e.keyCode) {
                case n.UP:
                    e.preventDefault(),
                    e.stopPropagation(),
                    t -= 1,
                    t < 0 && (t += i.length),
                    i[t].focus();
                    break;
                case n.DOWN:
                    e.preventDefault(),
                    e.stopPropagation(),
                    t += 1,
                    t >= i.length && (t -= i.length),
                    i[t].focus()
                }
            }
            ;
            e.addEventListener("keydown", s),
            this.sectionsKeydownRemoveListenerCallbacks.push(()=>{
                e.removeEventListener("keydown", s)
            }
            )
        }
        ),
        e(this, "unregisterActiveSectionArrowKeyNavigation", ()=>{
            this.sectionsKeydownRemoveListenerCallbacks.forEach(e=>e()),
            this.sectionsKeydownRemoveListenerCallbacks = []
        }
        ),
        e(this, "displaySection", (e,t=!1)=>{
            e !== this.activeSectionIndex && (this.unregisterActiveSectionArrowKeyNavigation(),
            this.activeSectionIndex = e,
            this.setSectionsState(this.activeSectionIndex),
            this.updateElementPositions(this.activeSectionIndex),
            t && this.registerActiveSectionArrowKeyNavigation())
        }
        ),
        e(this, "updateElementPositions", e=>{
            this.setNavHoverPositions(e)
        }
        )
    }
    async connect() {
        const e = this.el.dataset.jsParentMenuIndex;
        if (!e)
            throw new Error("No required parentMenuIndex data attribute found");
        this.parentMenuIndex = parseInt(e, 10),
        this.resizeObserver = await s(this.handleResize),
        this.resizeObserver.observe(this.el),
        this.el.addEventListener("mousemove", this.handleMouseMove),
        this.navTriggers.forEach(e=>{
            e.addEventListener(r.enter, this.handleTriggerEntered),
            e.addEventListener(r.leave, this.handleTriggerLeave),
            e.addEventListener("click", this.handleTriggerClicked)
        }
        )
    }
    disconnect() {
        this.el && this.resizeObserver.disconnect(),
        this.el.removeEventListener("mousemove", this.handleMouseMove),
        this.navTriggers.forEach(e=>{
            e.removeEventListener(r.enter, this.handleTriggerEntered),
            e.removeEventListener(r.leave, this.handleTriggerLeave),
            e.removeEventListener("click", this.handleTriggerClicked)
        }
        )
    }
    handleDropdownOpened(e) {
        e && this.registerArrowKeyNavigation(),
        this.resetSubMenu()
    }
    showSubsectionForTrigger(e) {
        this.debounceEnterTimer && window.clearTimeout(this.debounceEnterTimer);
        const t = this.navTriggers.indexOf(e);
        t > -1 && this.displaySection(t)
    }
    setSectionsState(e) {
        this.sections.forEach((t,i)=>{
            t.classList.remove("SiteSubMenuSection--before", "SiteSubMenuSection--after"),
            i === e ? (t.hidden = !1,
            t.setAttribute("aria-hidden", "false")) : (t.setAttribute("aria-hidden", "true"),
            t.hidden = !0),
            i < e ? t.classList.add("SiteSubMenuSection--before") : i > e && t.classList.add("SiteSubMenuSection--after")
        }
        ),
        this.navTriggers.forEach((t,i)=>{
            t.setAttribute("aria-expanded", i === e ? "true" : "false")
        }
        )
    }
    setNavTriggerHeights() {
        this.navTriggersHeights = this.navTriggers.map(e=>e.offsetHeight)
    }
    setNavHoverPositions(e) {
        0 === this.navTriggersHeights.length && this.setNavTriggerHeights();
        const t = this.navTriggersHeights.filter((t,i)=>i < e).reduce((e,t)=>e + t, 0)
          , i = this.navTriggersHeights[this.activeSectionIndex];
        this.el.style.setProperty("--siteSubMenuTriggerOffsetY", t + "px"),
        this.el.style.setProperty("--siteSubMenuTriggerOffsetYCenter", t + Math.round(i / 2) + "px"),
        this.el.style.setProperty("--siteSubMenuTriggerBackgroundHeight", Math.round(i) + "px")
    }
    resetSubMenu() {
        this.debounceEnterTimer && window.clearTimeout(this.debounceEnterTimer),
        this.el.classList.add("SiteSubMenu--noTransitions"),
        this.unregisterActiveSectionArrowKeyNavigation(),
        this.activeSectionIndex = 0,
        this.setSectionsState(this.activeSectionIndex),
        this.updateElementPositions(this.activeSectionIndex),
        this.el.offsetHeight,
        this.el.classList.remove("SiteSubMenu--noTransitions")
    }
}
e(o, "thresholdDebounceSpeed", 3),
e(o, "horizontalMouseSpeedsMaxLength", 4),
i.register("SiteSubMenu", o);
export {o as SiteSubMenu};
