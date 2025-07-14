export class AnimateHub {

    constructor() { }
}


export class NavBar {
    static config = {
        becomeNormalNavDuration: 0.5,
        lengthenNavDuration: 1,

        navPadding: 16,
        navGap: 160,
        navHorizontalMargin: 140,
        navVerticalMargin: 20,
        navHeight: 72
    }

    constructor(navElement) {
        this.nav = navElement;
        this.previousScroll = scrollY
        this.scrollThreshold = 100; // Only hide nav after scrolling 100px
        this.setCssVariables();
    }

    setCssVariables() {
        const root = document.documentElement;
        root.style.setProperty('--become-normal-nav-duration', `${NavBar.config.becomeNormalNavDuration}s`);
        root.style.setProperty('--lengthen-nav-duration', `${NavBar.config.lengthenNavDuration}s`);

        root.style.setProperty('--nav-padding', `${NavBar.config.navPadding}px`);
        root.style.setProperty('--nav-gap', `${NavBar.config.navGap}px`);
        root.style.setProperty('--nav-horizontal-margin', `${NavBar.config.navHorizontalMargin}px`);
        root.style.setProperty('--nav-vertical-margin', `${NavBar.config.navVerticalMargin}px`);
        root.style.setProperty('--nav-height', `${NavBar.config.navHeight}px`);
    }

    css(property, value) {
        this.nav.style.setProperty(property, value);
    }

    moveToCenterTop() {
        this.css("top", `${NavBar.config.navVerticalMargin}px`);
        this.css("left", "50%");
    }

    scaleToNormal() {
        this.css("transform", "scale(1) translate(-50%, 0%)");
    }

    addBorderAndShadow() {
        this.css("border-radius", "8px");
        this.css("border", "1px solid hsla(0, 0%, 100%, 6%)");
        this.css("box-shadow",
            "inset 0px 2px 2px 0px hsla(0, 0%, 100%, 18%)," +
            "inset 0px 0.5px 0px 0px hsla(0, 0%, 100%, 50%)," +
            "0px 4px 4px 0px hsla(0, 0%, 0%, 50%)");
    }

    lengthenNav() {
        this.css("width", `calc(100% - ${NavBar.config.navHorizontalMargin}px * 2)`);
        this.css("height", `${NavBar.config.navHeight}px`);
        this.css("justify-content", "space-between");
    }

    animateNav() {
        const totalLogoAnimationTime =
            Logo.config.logoAnimationDelay + Logo.config.logoStrokeAnimationTime * 8;
        const timeout1 = totalLogoAnimationTime * 1000;
        const timeout2 = timeout1 + NavBar.config.becomeNormalNavDuration * 1000;
        const timeout3 = timeout2 + NavBar.config.lengthenNavDuration * 1000;

        setTimeout(() => {
            this.nav.classList.add('become-normal-nav');
            this.moveToCenterTop();
            this.scaleToNormal();
        }, timeout1);
        
        setTimeout(() => {
            this.nav.classList.remove('become-normal-nav');
            this.nav.classList.add('lengthen-nav');
            this.addBorderAndShadow();
            this.lengthenNav();
        }, timeout2);

        setTimeout(() => {
            this.nav.classList.remove('lengthen-nav');
            this.nav.classList.add('collapsible');
        }, timeout3);
    }

    setupScrollBehavior() {
        window.onscroll = () => {
            let currentScroll = scrollY

            if (currentScroll > this.scrollThreshold && currentScroll > this.previousScroll) {
                this.nav_up()
            } else if (currentScroll < this.previousScroll || currentScroll <= this.scrollThreshold) {
                this.nav_down()
            }

            this.previousScroll = currentScroll
        }
    }
    cancelScrollBehavior() {
        window.onscroll = null;
    }

    nav_up() {
        this.classList.add("collapsed");
    }
    nav_down() {
        this.classList.remove("collapsed");
    }
}

export class Logo {
    static config = {
        logoScale: 0.2,
        
        logoAnimationDelay: 0.2,
        logoStrokeAnimationTime: 0.3,
    }
    constructor(logoElement) {
        this.logo = logoElement;
        this.logoUpStrokes = logoElement.querySelectorAll('.logo-up-stroke');
        this.logoSlantStrokes = logoElement.querySelectorAll('.logo-slant-stroke');
        this.logoCornerTriangle = logoElement.querySelector('.logo-corner-triangle');
    }

    setCssVariables() {
        const root = document.documentElement;
        root.style.setProperty('--logo-scale', `${Logo.config.logoScale}`);
        root.style.setProperty('--logo-animation-delay', `${Logo.config.logoAnimationDelay}s`);
        root.style.setProperty('--logo-stroke-animation-time', `${Logo.config.logoStrokeAnimationTime}s`);
    }
}
