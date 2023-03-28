//import {_ as e} from "./index-133d923f.js";
import {_ as e} from "./index-133d923f.js";
import {a as t, C as i} from "./App-c8966fac.js";
import {c as n} from "./ResizeObserver-94b81e8a.js";
import {K as s} from "./Keycodes-07387646.js";
import {SiteSubMenu as o} from "./SiteSubMenu-8c422257.js";
const r = window.PointerEvent ? {
    up: "pointerup",
    enter: "pointerenter",
    leave: "pointerleave"
} : {
    up: "touchend",
    enter: "mouseenter",
    leave: "mouseleave"
};
class d extends i {
    constructor(...t) {
        super(...t),
        e(this, "el", void 0),
        e(this, "dropdownTriggers", []),
        e(this, "menuContainer", void 0),
        e(this, "menu", void 0),
        e(this, "menuSections", []),
        e(this, "arrow", void 0),
        e(this, "menuButton", void 0),
        e(this, "closeDropdownTimeout", void 0),
        e(this, "resizeObserver", void 0),
        e(this, "activeMenuSectionIndex", -1),
        e(this, "tabletOverlay", void 0),
        e(this, "mobileMenuMask", void 0),
        e(this, "keydownHandler", void 0),
        e(this, "dispatchCustomTransitionEndEvent", ()=>{
            this.mobileMenuMask.dispatchEvent(new CustomEvent("SiteHeader:MobileMenuMaskTransitionEnd",{
                bubbles: !0,
                detail: {
                    isMobileMenuVisible: this.isMobileMenuVisible
                }
            }))
        }
        ),
        e(this, "handleMenuClick", e=>{
            e.stopPropagation()
        }
        ),
        e(this, "handleMenuEntered", e=>{
            "touch" !== e.pointerType && this.stopCloseTimeout()
        }
        ),
        e(this, "handleMenuLeft", e=>{
            "touch" !== e.pointerType && this.startCloseTimeout()
        }
        ),
        e(this, "handleMenuTransitionEnd", e=>{
            "opacity" === e.propertyName && this.menu.style.setProperty("pointer-events", this.isMenuVisible ? "auto" : "none")
        }
        ),
        e(this, "handleMobileMenuButtonClicked", e=>{
            e.preventDefault(),
            this.el.classList.remove("SiteHeader--noTransitions"),
            this.el.classList.toggle("SiteHeader--mobileMenuVisible")
        }
        ),
        e(this, "handleTriggerClicked", e=>{
            e.preventDefault(),
            e.stopPropagation();
            const t = this.dropdownTriggers.indexOf(e.currentTarget);
            t > -1 && this.toggleDropdown(t)
        }
        ),
        e(this, "handleTriggerEntered", e=>{
            if ("touch" === e.pointerType)
                return;
            const t = this.dropdownTriggers.indexOf(e.currentTarget);
            this.stopCloseTimeout(),
            t > -1 && this.openDropdown(t)
        }
        ),
        e(this, "handleTriggerLeft", e=>{
            "touch" !== e.pointerType && this.startCloseTimeout()
        }
        ),
        e(this, "handleTriggerFocused", e=>{
            this.stopCloseTimeout();
            const t = this.dropdownTriggers.indexOf(e.currentTarget);
            t > -1 && this.openDropdown(t, !0)
        }
        ),
        e(this, "handleMobileMenuTransitionEnd", e=>{
            "transform" === e.propertyName && e.target === this.mobileMenuMask && this.dispatchCustomTransitionEndEvent()
        }
        ),
        e(this, "handleResize", ()=>{
            this.positionElements()
        }
        ),
        e(this, "handleBodyClick", ()=>{
            this.closeDropdown()
        }
        ),
        e(this, "handleEscape", ()=>{
            this.closeDropdown()
        }
        ),
        e(this, "startCloseTimeout", ()=>{
            this.closeDropdownTimeout = window.setTimeout(this.closeDropdown, 50)
        }
        ),
        e(this, "stopCloseTimeout", ()=>{
            clearTimeout(this.closeDropdownTimeout)
        }
        ),
        e(this, "toggleDropdown", e=>{
            this.activeMenuSectionIndex === e ? this.closeDropdown() : this.openDropdown(e)
        }
        ),
        e(this, "registerArrowKeyNavigation", (e,t)=>{
            void 0 !== this.keydownHandler && this.unregisterArrowKeyNavigation();
            const i = Array.from(t.querySelectorAll("a"));
            let n = 0;
            this.activeSubMenu || i[n].focus(),
            this.keydownHandler = t=>{
                switch (t.keyCode) {
                case s.TAB:
                    e.focus(),
                    this.startCloseTimeout();
                    break;
                case s.UP:
                    t.preventDefault(),
                    n -= 1,
                    n < 0 && (n += i.length),
                    i[n].focus();
                    break;
                case s.DOWN:
                    t.preventDefault(),
                    n += 1,
                    n >= i.length && (n -= i.length),
                    i[n].focus()
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
        e(this, "openDropdown", (e,t=!1)=>{
            e !== this.activeMenuSectionIndex && (this.isMenuVisible || this.el.classList.add("SiteHeader--noTransitions"),
            this.activeMenuSectionIndex = e,
            this.menuSections.forEach((t,i)=>{
                t.classList.remove("SiteMenu__section--left", "SiteMenu__section--right"),
                t.setAttribute("aria-hidden", "true"),
                t.hidden = !0,
                i < e ? t.classList.add("SiteMenu__section--left") : i > e && t.classList.add("SiteMenu__section--right")
            }
            ),
            this.dropdownTriggers.forEach((t,i)=>{
                t.setAttribute("aria-expanded", i === e ? "true" : "false")
            }
            ),
            t && this.registerArrowKeyNavigation(this.dropdownTriggers[e], this.menuSections[e]),
            this.activeSubMenu && this.activeSubMenu.handleDropdownOpened(t),
            this.positionElements(),
            setTimeout(()=>{
                this.el.classList.add("SiteHeader--dropdownVisible"),
                this.el.classList.remove("SiteHeader--noTransitions"),
                this.menu.hidden = !1
            }
            ))
        }
        ),
        e(this, "closeDropdown", ()=>{
            -1 !== this.activeMenuSectionIndex && this.isMenuVisible && (this.el.classList.remove("SiteHeader--dropdownVisible"),
            this.menuSections[this.activeMenuSectionIndex].setAttribute("aria-hidden", "true"),
            this.dropdownTriggers[this.activeMenuSectionIndex].setAttribute("aria-expanded", "false"),
            this.menu.hidden = !0,
            this.menuSections[this.activeMenuSectionIndex].hidden = !0,
            this.activeMenuSectionIndex = -1,
            this.unregisterArrowKeyNavigation())
        }
        ),
        e(this, "positionElements", ()=>{
            if (-1 === this.activeMenuSectionIndex) {
                if (this.hasSubMenus) {
                    const e = this.menuSections[0].offsetHeight;
                    this.menu.style.setProperty("--siteMenuHeight", e + "px")
                }
                return
            }
            const e = this.menuSections[this.activeMenuSectionIndex]
              , t = this.dropdownTriggers[this.activeMenuSectionIndex];
            this.arrow.classList.toggle("SiteHeaderArrow--themeLight", e.hasAttribute("data-js-theme-light"));
            const i = -1 * (document.documentElement.clientWidth / 2 - (t.getBoundingClientRect().left + t.offsetWidth / 2));
            this.el.style.setProperty("--siteMenuArrowOffset", i + "px");
            const n = e.offsetWidth
              , s = e.offsetHeight;
            this.menu.style.width = n + "px",
            this.menu.style.setProperty("--siteMenuHeight", s + "px"),
            e.hidden = !1,
            e.setAttribute("aria-hidden", "false")
        }
        )
    }
    async connect() {
        this.menuButton && this.menuButton.addEventListener("click", this.handleMobileMenuButtonClicked),
        this.el.addEventListener("MobileMenu:CloseButtonClicked", this.handleMobileMenuButtonClicked),
        this.mobileMenuMask.addEventListener("transitionend", this.handleMobileMenuTransitionEnd),
        this.tabletOverlay.addEventListener("click", this.handleMobileMenuButtonClicked),
        this.menu && (this.menuSections = this.menuSections.filter(e=>!!e.innerHTML.trim()),
        this.menu.addEventListener(r.up, this.handleMenuClick),
        this.menu.addEventListener(r.enter, this.handleMenuEntered),
        this.menu.addEventListener(r.leave, this.handleMenuLeft),
        this.menuContainer.addEventListener("transitionend", this.handleMenuTransitionEnd),
        document.body && document.body.addEventListener(r.up, this.handleBodyClick),
        document.body && document.body.addEventListener("escape:keydown", this.handleEscape),
        this.resizeObserver = await n(this.handleResize),
        this.resizeObserver.observe(this.el)),
        this.dropdownTriggers.forEach(e=>{
            e.addEventListener(r.enter, this.handleTriggerEntered),
            e.addEventListener(r.leave, this.handleTriggerLeft),
            e.addEventListener(r.up, this.handleTriggerClicked),
            e.addEventListener("focusin", this.handleTriggerFocused)
        }
        ),
        this.handleResize()
    }
    disconnect() {
        this.menuButton && this.menuButton.removeEventListener("click", this.handleMobileMenuButtonClicked),
        this.el.removeEventListener("MobileMenu:CloseButtonClicked", this.handleMobileMenuButtonClicked),
        this.mobileMenuMask.removeEventListener("transitionend", this.handleMobileMenuTransitionEnd),
        this.menu && (this.menu.removeEventListener(r.up, this.handleMenuClick),
        this.menu.removeEventListener(r.enter, this.handleMenuEntered),
        this.menu.removeEventListener(r.leave, this.handleMenuLeft),
        this.menuContainer.removeEventListener("transitionend", this.handleMenuTransitionEnd),
        document.body && document.body.removeEventListener(r.up, this.handleBodyClick),
        document.body && document.body.removeEventListener("escape:keydown", this.handleEscape),
        this.resizeObserver.disconnect()),
        this.dropdownTriggers.forEach(e=>{
            e.removeEventListener(r.enter, this.handleTriggerEntered),
            e.removeEventListener(r.leave, this.handleTriggerLeft),
            e.removeEventListener(r.up, this.handleTriggerClicked),
            e.removeEventListener("focusin", this.handleTriggerFocused)
        }
        )
    }
    get isMenuVisible() {
        return parseFloat(getComputedStyle(this.menuContainer).getPropertyValue("opacity")) > 0
    }
    get subMenus() {
        return this.childControllers(o)
    }
    get hasSubMenus() {
        return this.subMenus.length > 0
    }
    get activeSubMenu() {
        return this.subMenus.find(e=>e.parentMenuIndex === this.activeMenuSectionIndex)
    }
    get isMobileMenuVisible() {
        return this.el.classList.contains("SiteHeader--mobileMenuVisible")
    }
    get isTablet() {
        const e = window.innerWidth;
        return e >= 600 && e <= 899
    }
}
e(d, "optionalDependencies", [o]),
    t.register("SiteHeader", d);

    console.log(e(this, "openDropdown", (e,t=!1)=>{
        e !== this.activeMenuSectionIndex && (this.isMenuVisible || this.el.classList.add("SiteHeader--noTransitions"),
        this.activeMenuSectionIndex = e,
        this.menuSections.forEach((t,i)=>{
            t.classList.remove("SiteMenu__section--left", "SiteMenu__section--right"),
            t.setAttribute("aria-hidden", "true"),
            t.hidden = !0,
            i < e ? t.classList.add("SiteMenu__section--left") : i > e && t.classList.add("SiteMenu__section--right")
        }
        ),
        this.dropdownTriggers.forEach((t,i)=>{
            t.setAttribute("aria-expanded", i === e ? "true" : "false")
        }
        ),
        t && this.registerArrowKeyNavigation(this.dropdownTriggers[e], this.menuSections[e]),
        this.activeSubMenu && this.activeSubMenu.handleDropdownOpened(t),
        this.positionElements(),
        setTimeout(()=>{
            this.el.classList.add("SiteHeader--dropdownVisible"),
            this.el.classList.remove("SiteHeader--noTransitions"),
            this.menu.hidden = !1
        }
        ))
    }
    ))
//SiteHeader--dropdownVisible