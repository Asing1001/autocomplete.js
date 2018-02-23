const keyCode = {
    up: 38,
    down: 40,
    enter: 13,
    esc: 27
}

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
        this.setState({ show: true });
    }

    handleBlur(e) {
        this.setState({ show: false });
    }

    handleKeyup(e) {
        if (e.keyCode === keyCode.enter) {
            return;
        }
        const value = e.target.value;
        if (value === this.state.value) {
            return;
        }
        this.setState({ value });
    }

    handleKeydown(e) {
        switch (e.keyCode) {
            case keyCode.up:
                this.handleArrowUp(e);
                break;
            case keyCode.down:
                this.handleArrowDown(e);
                break;
            case keyCode.enter:
                this.handleEnter(e);
                break;
            default:
                this.setState({ value: e.target.value, show: true });
                break;
        }
    }

    handleArrowUp(e) {
        let { selectedIndex } = this.state;
        if (this.getSuggestions().length > 0) {
            if (selectedIndex > 0) {
                selectedIndex--;
            }

            this.setState({ selectedIndex });
        }
    }

    handleArrowDown(e) {
        let { selectedIndex } = this.state;
        let suggestions = this.getSuggestions();
        if (suggestions.length > 0) {
            if (selectedIndex < suggestions.length - 1) {
                selectedIndex++;
            }
            this.setState({ selectedIndex });
        }
    }

    getSuggestions() {
        const { getItemValue, items } = this.props;
        const { value } = this.state;
        return items
            .filter(item => getItemValue(item).toLowerCase().indexOf(value.toLowerCase()) !== -1)

    }

    handleEnter(e) {
        let { selectedIndex, value, show } = this.state;
        if (show && selectedIndex >= 0) {
            value = this.props.getItemValue(this.getSuggestions()[selectedIndex]);
            this.setState({ selectedIndex: -1, value, show: false });
        }
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    render() {
        const { selectedIndex, show, value } = this.state;
        const { getItemValue } = this.props;
        this.suggestionUL.classList.toggle('show', show);
        const fragment = document.createDocumentFragment();
        this.input.value = value;
        this.getSuggestions().forEach((suggestion, index) => {
            const { logo, name } = suggestion;
            const value = getItemValue(suggestion);
            const suggestionElement = document.createElement('li');
            const img = document.createElement('img');
            img.setAttribute('src', logo);
            const span = document.createElement('span');
            span.textContent = name;
            suggestionElement.appendChild(img);
            suggestionElement.appendChild(span);
            const isSelected = selectedIndex === index;
            suggestionElement.classList.toggle('selected', isSelected);
            fragment.appendChild(suggestionElement);
        })
        this.suggestionUL.innerHTML = "";
        this.suggestionUL.appendChild(fragment);
    }
}