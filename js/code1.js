var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");
var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
var a3 = document.getElementById("a3");
var a4 = document.getElementById("a4");
var sm1 = document.getElementById("sm1");
var sm2 = document.getElementById("sm2");
var sm3 = document.getElementById("sm3");
var sm4 = document.getElementById("sm4");
var mc1 = document.getElementById("mc1");
var mc2 = document.getElementById("mc2");
var mc3 = document.getElementById("mc3");
var mc4 = document.getElementById("mc4");
var ssn1 = document.getElementById("ssn1");
var ssn2 = document.getElementById("ssn2");
var ssn3 = document.getElementById("ssn3");
var ss = document.getElementsByClassName("SiteSubMenuSection");

const header = document.querySelector('header');

/*boton.addEventListener("mouseout", function () {
    //div.classList.remove("SiteHeader--dropdownVisible");
});*/

function desplegar(s, m, e2, e, i, i2, n) {
    var posicion = e2.getBoundingClientRect();
    //var centroX = (posicion.left + posicion.right) / 2;
    const ii = -1 * (document.documentElement.clientWidth / 2 - ((posicion.left + posicion.right) / 2));
    var tri = document.getElementsByClassName("SiteHeaderArrow");
    // Iterar sobre todos los elementos y cambiar su opacidad
    for (var j = 0; j < tri.length; j++) {
        tri[j].style.setProperty("--siteMenuArrowOffset", ii + "px"); // Establecer la opacidad en 0.5
    }

    var smn = document.getElementsByClassName('SiteMenu__section');
    console.log(smn)
    for (var j = 0; j < smn.length; j++) {
        if (j < n) {
            smn[j].classList.add('SiteMenu__section--left');
            smn[j].classList.remove('SiteMenu__section--right');
        } else if (j == n) {
            smn[j].classList.remove('SiteMenu__section--left');
            smn[j].classList.remove('SiteMenu__section--right');
        } else {
            smn[j].classList.remove('SiteMenu__section--left');
            smn[j].classList.add('SiteMenu__section--right');
        }
    }

    m.style.opacity = 1;
    s.hidden = 0;
    s.style.width = i + "px";
    s.style.setProperty("--siteMenuHeight", i2 + "px")
    s.style.pointerEvents = 'auto';
    e.setAttribute('aria-expanded', 'false');
    e.hidden = 0;
}

function ocultar(s, m, e) {
    m.style.opacity = 0;
    s.hidden = 1;
    s.style.pointerEvents = 'none';
    e.setAttribute('aria-expanded', 'true');
    e.hidden = 1;
}

function sub(s2, i) {
    var ssm = document.querySelector(".SiteSubMenu");
    var ii = i * 96
    ssm.style.setProperty("--siteSubMenuTriggerOffsetY", ii + "px");
    for (var j = 0; j < s2.length; j++) {
        if (j < i) {
            s2[j].classList.add('SiteSubMenuSection--before');
            s2[j].classList.remove('SiteSubMenuSection--after');
        } else if (j == i) {
            s2[j].classList.remove('SiteSubMenuSection--before');
            s2[j].classList.remove('SiteSubMenuSection--after');
        } else {
            s2[j].classList.remove('SiteSubMenuSection--before');
            s2[j].classList.add('SiteSubMenuSection--after');
        }

        if (j == i) {
            s2[j].hidden = 0;
            s2[j].setAttribute('aria-expanded', 'false');
        } else {
            s2[j].hidden = 1;
            s2[j].setAttribute('aria-expanded', 'true');
        }

    }
    //s1.removeEventListener('mouseover', function () { sub(s1,s2,i) });
}


a1.addEventListener("mouseover", function () { desplegar(sm1, mc1, a1, b1, 804, 452, 0) });
a1.addEventListener('mouseout', function () { ocultar(sm1, mc1, b1) });
a2.addEventListener("mouseover", function () { desplegar(sm2, mc2, a2, b2, 604, 370, 1) });
a2.addEventListener('mouseout', function () { ocultar(sm2, mc2, b2) });
a3.addEventListener("mouseover", function () { desplegar(sm3, mc3, a3, b3, 604, 382, 2) });
a3.addEventListener('mouseout', function () { ocultar(sm3, mc3, b3) });
a4.addEventListener("mouseover", function () { desplegar(sm4, mc4, a4, b4, 530, 306, 3) });
a4.addEventListener('mouseout', function () { ocultar(sm4, mc4, b4) });

ssn1.addEventListener("mouseover", function () { sub(ss, 0) });
ssn2.addEventListener("mouseover", function () { sub(ss, 1) });
ssn3.addEventListener("mouseover", function () { sub(ss, 2) });
/*var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");
var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
var a3 = document.getElementById("a3");
var a4 = document.getElementById("a4");
var sm = document.querySelector(".SiteMenu");
var mc = document.querySelector(".SiteHeader__menuContainer");
const header = document.querySelector('header');

boton.addEventListener("mouseout", function () {
    //div.classList.remove("SiteHeader--dropdownVisible");
});

function desplegar(h, s, e2, e, i) {
    var posicion = e2.getBoundingClientRect();
    //var centroX = (posicion.left + posicion.right) / 2;
    const ii = -1 * (document.documentElement.clientWidth / 2 - ((posicion.left + posicion.right) / 2));
    var tri = document.querySelector(".SiteHeaderArrow");
    tri.style.setProperty("--siteMenuArrowOffset", ii + "px");

    h.classList.add('SiteHeader--dropdownVisible');
    s.hidden = 0;
    s.style.width = i + "px"; 
    s.style.pointerEvents = 'auto';
    e.setAttribute('aria-expanded', 'false');
    e.hidden = 0;
}

function ocultar(h,s,e) {
    h.classList.remove('SiteHeader--dropdownVisible');
    s.hidden = 1; 
    s.style.pointerEvents = 'none';
    e.setAttribute('aria-expanded', 'true');
    e.hidden = 1;
}


a1.addEventListener("mouseover", function () { desplegar(header, sm, a1, b1, 804) });
a1.addEventListener('mouseleave', function () { ocultar(header, sm, b1) });
a2.addEventListener("mouseover", function () { desplegar(header, sm, a2, b2, 604) });
a2.addEventListener('mouseleave', function () { ocultar(header, sm, b2) });
a3.addEventListener("mouseover", function () { desplegar(header, sm, a3, b3, 604) });
a3.addEventListener('mouseleave', function () { ocultar(header, sm, b3) });
a4.addEventListener("mouseover", function () { desplegar(header, sm, a4, b4, 604) });
a4.addEventListener('mouseleave', function () { ocultar(header, sm, b4) });

mc.addEventListener("mouseover", function () { desplegar(header, sm, a1, b1, 804) });*/