// This module is responsible for making DOM elements appear on scroll

// Store elements to appear
export const elements_to_appear = []

// Add all elements to be animated 
export function scheduleAnimation(...querySelectors) {
    querySelectors.forEach((selector) => {
        if (selector instanceof NodeList) { // querySelectorAll
            selector.forEach(element => pushAnimationList(element));
        }
        else if (selector instanceof Node) { // querySelector
            pushAnimationList(selector);
        }
    });
}

// Function to add element to animation list 
function pushAnimationList(element) {
    elements_to_appear.push({
        DOM: element,
        offsetTop: element.offsetTop,
        clientHeight: element.clientHeight,
    });
}

// Animate every element in the array by adding the 'animated' class to them
document.onscroll = () => {
    // Calculate the distance from the screen's bottom border line to the top of the page 
    let screenHeight = window.innerHeight;
    let pageYOffsetTop = window.pageYOffset;
    let pageYOffsetBottom = pageYOffsetTop + screenHeight;

    elements_to_appear.forEach((element, index) => {
        // Calcualte the distance from the element's bottom border line to the top of the page 
        let elementHeight = parseInt(element.clientHeight, 10);
        let elementYOffsetTop = parseInt(element.offsetTop, 10);
        let elementYOffsetBottom = elementYOffsetTop + elementHeight;
        // If the element is completely in view, add animated class to it 
        if (elementYOffsetBottom < pageYOffsetBottom) {
            element.DOM.classList.add("animated");
            // Once animated, remmove element from the list
            elements_to_appear.splice(index, 1); //
        }
    });
}
