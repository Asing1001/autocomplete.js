export default class autoComplete {
    constructor({ selector, items, getItemValue }) {
        this.state = {
            selectedIndex: -1,
            show: false,
            value: '',
        }
        this.props = { selector, items, getItemValue };
        this.input = document.querySelector(selector);
        this.input.addEventListener('focus', this.handleFocus.bind(this));
        this.input.addEventListener('blur', this.handleBlur.bind(this));
        this.input.addEventListener('keyup', this.handleKeyup.bind(this));
        this.input.addEventListener('keydown', this.handleKeydown.bind(this));
        this.suggestionUL = document.createElement('ul');
        this.suggestionUL.classList.add('suggestion');
        this.input.parentNode.insertBefore(this.suggestionUL, this.input.nextSibling);

    }

    handleFocus(e) {
    }

    handleBlur(e) {
    }

    handleKeyup(e) {
    }

    handleKeydown(e) {
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    render() {
    }
}