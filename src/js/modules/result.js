export default class Result {
    constructor(element) {
        this.counter = element;

        this.root = element.querySelector(`.counter__result`);
        this.caloriesNormOutput = this.root.querySelector(`#calories-norm`);
        this.caloriesMinOutput = this.root.querySelector(`#calories-minimal`);
        this.caloriesMaxOutput = this.root.querySelector(`#calories-maximal`);
    }

    show(calories) {
        this.caloriesNormOutput.textContent = calories.norm;
        this.caloriesMinOutput.textContent = calories.minimal;
        this.caloriesMaxOutput.textContent = calories.maximal;

        this.root.classList.remove('counter__result--hidden');
    }

    hide() {
        this.root.classList.add('counter__result--hidden');

        this.caloriesNormOutput.textContent = 0;
        this.caloriesMinOutput.textContent = 0;
        this.caloriesMaxOutput.textContent = 0;
    }
}