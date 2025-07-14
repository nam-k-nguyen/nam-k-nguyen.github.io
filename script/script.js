// "use strict"
import { AppearElementsOnScrollFactory } from "./appear.js"
import { renderHtmlWithJs } from "./html.js"
import { NavBar } from "./animation.js"

renderHtmlWithJs();

// Selectors

const $projectsContainer = $("#projects>.content")

const nav = document.querySelector('nav')
const about_paragraph = document.querySelector('.about-paragraph')
const about_image = document.querySelector('.about-image')
const about_buttons = document.querySelector('.about-buttons')
const projects = document.querySelectorAll('.project-container')
const skills_content = document.querySelectorAll('.content>*')

// Scroll to top 
scrollTo(0, 0)
jumpTo('intro')

// Schedule animation after a while so it does not automatically trigger when users were not at top 
const appearFactory = new AppearElementsOnScrollFactory()
const navBar = new NavBar(nav)
navBar.animateNav();


setTimeout(() => {
    appearFactory.scheduleAnimation(
        about_paragraph,
        about_image,
        about_buttons,
        projects,
        skills_content
    )
    appearFactory.setAnimateOnScroll()
}, 1000 * 1)


// Toggle nav bar visibility on scroll
let previousScroll = scrollY
let scrollThreshold = 100; // Only hide nav after scrolling 100px

window.onscroll = (e) => {
    // get active style of nav

    let currentScroll = scrollY

    // Only hide navbar when scrolling down past threshold
    if (currentScroll > scrollThreshold && currentScroll > previousScroll) {
        nav_up()
    }
    // Show navbar when scrolling up or at top of page
    else if (currentScroll < previousScroll || currentScroll <= scrollThreshold) {
        nav_down()
    }

    previousScroll = currentScroll
}

// Pull navbar up (hidden navbar)
function nav_up() {
    nav.classList.add('functional-nav');
    nav.classList.add('collapsed');
    nav.style.animation = 'none !important';
    nav.style.transition = 'transform 0.3s ease-in-out !important';
    nav.style.transform = 'translate(-50%, calc(-100% - 22px)) !important';
}

// Pull navbar down (visible navbar)
function nav_down() {
    nav.style.animation = 'none !important';
    nav.classList.remove('collapsed');
    nav.style.transition = 'transform 0.3s ease-in-out !important';
    nav.style.transform = 'translate(-50%, 0%) !important';
}

// Jump to an element on the screen
function jumpTo(anchor_id) {
    // Saving URL without hash.
    var url = location.href;
    // Navigate to the target element.
    location.href = "#" + anchor_id;
    // Method modifies the current history entry.
    history.replaceState(null, null, url);
}