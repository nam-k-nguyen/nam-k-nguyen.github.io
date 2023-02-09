// "use strict"
import icon_groups from "./devicon.js"
import { scheduleAnimation } from "./appear.js"

// Selectors
const intro_section = document.querySelector('section#intro')
const logo = document.querySelector('#logo')
const n_icon = document.querySelector('.logo-letter>i')
const nav = document.querySelector('nav')
const section_title = document.querySelectorAll('.section-title')
const about_paragraph = document.querySelector('.about-paragraph')
const about_image = document.querySelector('.about-image')
const about_buttons = document.querySelector('.about-buttons')
const projects = document.querySelectorAll('.project')
const skills_content = document.querySelectorAll('.content>*')

// Scroll to top 
scrollTo(0, 0)
jumpTo('intro')

// Schedule animation after a while so it does not automatically trigger when users were not at top 
setTimeout(() => {
    scheduleAnimation(
        section_title,
        about_paragraph,
        about_image,
        about_buttons,
        projects,
        skills_content
    )
}, 3000)
// Scale logo down to move it to the top left in CSS
setTimeout(() => { scaleLogo(1) }, 3000)
// Remove the intro section so that it reveals the underlying hero section 
setTimeout(() => { removeIntro() }, 4000)

// Render icons in the skill section
icon_groups.forEach(icon_group => {
    const group_div = document.querySelector(`#skills>.content>.${icon_group.group_name}`)
    icon_group.icons.forEach((icon => {
        // Create a div and add an icon and a skill name as its child 
        const skill_div = document.createElement("div")
        skill_div.classList.add('skill')
        let isIconifyIcon = icon[1] === "simple-icons:puppeteer"
        let iconElement = isIconifyIcon ?
            `<iconify-icon icon="${icon[1]}" width="48" height="48"></iconify-icon>` :
            `<i class="${icon[1]}"></i>`

        skill_div.innerHTML = `
        <a href="${icon[0]}" target="_blank">
            ${iconElement}
            <div class="skill-name">${icon[2]}</div>
        </a>`
        // Add hover effect for the icon and skill name
        const icon_element = skill_div.firstElementChild.firstElementChild
        if (isIconifyIcon) {
            skill_div.onmouseover = () => { icon_element.icon = "logos:puppeteer" }
            skill_div.onmouseout = () => { icon_element.icon = "simple-icons:puppeteer" }
        } else {
            skill_div.onmouseover = () => { icon_element.classList.add('colored') }
            skill_div.onmouseout = () => { icon_element.classList.remove('colored') }
        }
        // Add the created element to the DOM
        group_div.appendChild(skill_div)
    }))
})

// Toggle nav bar visibility on scroll
let previousScroll = scrollY
window.onscroll = (e) => {
    let currentScroll = scrollY
    if (currentScroll > previousScroll) { nav_up() }
    else { nav_down() }
    previousScroll = currentScroll
}

// HELPER FUNCTIONS

// Scale the logo that appear in the middle of the screen during intro
function scaleLogo(scale) {
    logo.style.width = (scale * 40) + 'px'
    logo.style.height = (scale * 40) + 'px'
    n_icon.style.fontSize = scale + 'rem'
}

// Remove intro section
function removeIntro() {
    intro_section.remove()
    document.body.style.overflow = "auto"
}

// Pull navbar up (hidden navbar)
function nav_up() { nav.style.transform = 'translate(-50%, -100%)'; }

// Pull navbar down (visible navbar)
function nav_down() { nav.style.transform = 'translate(-50%, 0%)'; }

// Jump to an element on the screen
function jumpTo(anchor_id) {
    // Saving URL without hash.
    var url = location.href;
    // Navigate to the target element.
    location.href = "#" + anchor_id;
    // Method modifies the current history entry.
    history.replaceState(null, null, url);
}