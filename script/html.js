import { projects, icons_svg, nav_socials, skillsByGroup } from "./data.js"
import { getSkill } from "./icons.js"

export function renderHtmlWithJs() {
    console.log("Rendering HTML with JS...")
    insertNavSocials("#nav-socials")
    insertAllProjects("#projects>.content")
    insertAllSkills('#skills>.content')
}

// Helpers

export function $icon(icon, w, h, colored = false) {
    const { iconClass, svg } = icon;
    const { mono, color } = iconClass ? iconClass : svg;
    const iconVar = colored ? color : mono;
    return (iconClass ? $("<i>").addClass(iconVar) : $(iconVar)).attr("width", w).attr("height", h).css("font-size", `${w}px`);
}

export function $getGradientButton(iconName, link) {
    return $("<li>")
        .append($("<a>")
            .addClass("gradient-button")
            .attr("href", link)
            .attr("target", "_blank")
            .html(`${icons_svg[iconName]}`)
        )
}

// Nav

export function insertNavSocials(nav_socials_selector) {
    const $nav_socials = $(nav_socials_selector)

    $nav_socials.empty()
    nav_socials.forEach(({ name, link }) => {
        const $button = $getGradientButton(name, link)
        $nav_socials.append($button)
    })
}

// Projects

export function $getProjectHtml(project) {
    const { name, description, github, live, image, skills } = project
    const $project = $("<div>").addClass(["project-container", "blackbox"])

    const $projectImageWrapper = $("<div>").addClass("project-image-wrapper")
    const $projectSkills = $("<div>").addClass("project-skills")
    const $projectNameWrapper = $("<div>").addClass("project-name-wrapper")
    const $projectDescription = $("<div>").addClass("project-description")

    $projectImageWrapper.append($("<img>").addClass("project-image").attr("src", image).attr("alt", name))
    $projectSkills.append(skills.map(skill => $getSkillLinkHtml(skill, 24, 24, false)))
    $projectSkills.append($("<hr>").addClass("gradient-line"))
    $projectNameWrapper.append([
        $("<h2>").addClass("project-name").text(name),
        $("<div>").addClass("project-links").append([
            $("<a>").addClass("gradient-button").attr("href", github).attr("target", "_blank").html(`${icons_svg["github"]}`),
            $("<a>").addClass("gradient-button").attr("href", live).attr("target", "_blank").html(`${icons_svg["external-link"]}`),
        ])
    ])
    $projectDescription.append($("<p>").addClass("project-description-text").text(description))

    $project.append([$projectImageWrapper, $projectSkills, $projectNameWrapper, $projectDescription])
    return $project
}

export function insertAllProjects(projectsContainerSelector) {
    const $container = $(projectsContainerSelector)
    projects.forEach(project => {
        const $projectHtml = $getProjectHtml(project)
        $container.append($projectHtml)
    })
}

// Skills

export function $getSkillLinkHtml(skillName, w, h, bigContainer = false) {
    const { name, icon, link } = getSkill(skillName);
    const $skillLink = $("<a>")
        .addClass(bigContainer ? "big-container" : "")
        .css(bigContainer ? {} : { width: `${w}px`, height: `${h}px` })
        .addClass("skill")
        .attr("href", link)
        .attr("target", "_blank");

    $skillLink.append(
        [
            $icon(icon, w, h),
            $icon(icon, w, h, true).addClass("colored"),
            bigContainer ? $("<span>").addClass("skill-name").text(name) : null
        ]
    );
    return $skillLink;
}

export function insertAllSkills(skillsContainerSelector) {
    const $skillsContainer = $(skillsContainerSelector);

    skillsByGroup.forEach(({ group, skills }) => {
        $skillsContainer.append($("<div>").addClass("skill-group-wrapper").append(
            [
                $("<div>").addClass(["skill-group-title", "gradient-text"]).text(`${group}.`),
                $("<div>").addClass("skill-group-skills").attr("id", group).append(
                    skills.map(skill => $getSkillLinkHtml(skill, 36, 36, true))
                )
            ]
        ));
    })
}
