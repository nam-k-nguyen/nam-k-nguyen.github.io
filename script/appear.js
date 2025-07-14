// This module is responsible for making DOM elements appear on scroll

export class AppearElementsOnScrollFactory {
    constructor() {
        // Store elements to appear
        this.elementsToAppear = [];
    }

    // Add all elements to be animated 
    scheduleAnimation(...querySelectorResults) {
        querySelectorResults.forEach((result) => {
            if (result instanceof NodeList) { // element is instance of querySelectorAll
                result.forEach(element => this.pushAnimationList(element));
            }
            else if (result instanceof Node) { // element is instance of querySelector
                this.pushAnimationList(result);
            }
        });
    }

    // Function to add element to animation list 
    pushAnimationList(element) {
        element.classList.add("to-animate");
        
        this.elementsToAppear.push({
            DOM: element,
            offsetTop: element.offsetTop,
            clientHeight: element.clientHeight,
        });
    }

    // Animate every element in the array by adding the 'animated' class to them
    setAnimateOnScroll() {
        document.onscroll = () => {
            let screenHeight = window.innerHeight;
            let pageYOffsetTop = window.pageYOffset;
            let pageYOffsetBottom = pageYOffsetTop + screenHeight;

            this.elementsToAppear.forEach((element, index) => {
                let elementHeight = parseInt(element.clientHeight, 10);
                let elementYOffsetTop = parseInt(element.offsetTop, 10);
                let elementYOffsetBottom = elementYOffsetTop + elementHeight;

                if (elementYOffsetBottom < pageYOffsetBottom) {
                    element.DOM.classList.add("animated");
                    this.elementsToAppear.splice(index, 1); // Once animated, remove element from the list
                }
            });
        };
    }
}
