import styles from './autoComplete.scss'

const suggestionElementHeight = styles.suggestionElementHeight.replace('px', '') * 1;
const suggestionMaxHeight = styles.suggestionMaxHeight.replace('px', '') * 1;
const maxVisibleSuggestions = suggestionMaxHeight / suggestionElementHeight;
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

        this.autoCompleteKey = `autocomplete${selector}`;
        this.props = { selector, items, getItemValue };
        this.cache = { suggestionElements: {} };
        this.input = document.querySelector(selector);
        this.input.addEventListener('focus', this.handleFocus.bind(this));
        this.input.addEventListener('blur', this.handleBlur.bind(this));
        this.input.addEventListener('keyup', this.handleKeyup.bind(this));
        this.input.addEventListener('keydown', this.handleKeydown.bind(this));
        const suggestionWrap = document.createElement('div');
        suggestionWrap.classList.add('suggestion-wrap');
        this.suggestionUL = document.createElement('ul');
        this.suggestionUL.classList.add('suggestion');
        this.suggestionUL.addEventListener('mouseenter', () => this.preventBlur = true);
        this.suggestionUL.addEventListener('mouseleave', () => this.preventBlur = false);
        this.suggestionUL.addEventListener('touchstart', () => this.preventBlur = true);
        suggestionWrap.appendChild(this.suggestionUL);
        this.input.parentNode.insertBefore(suggestionWrap, this.input.nextSibling);
    }

    handleFocus(e) {
        this.setState({ show: true });
    }

    handleBlur(e) {
        // if preventBlur not set, suggestion will hide and click event can not be triggered
        if (!this.preventBlur) {
            this.setState({ show: false });
        }
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
            .sort((a, b) => {
                return Number(this.isHistoryExist(getItemValue(b))) - Number(this.isHistoryExist(getItemValue(a)));
            })
    }

    handleEnter(e) {
        let { selectedIndex, value, show } = this.state;
        if (show && selectedIndex >= 0) {
            value = this.props.getItemValue(this.getSuggestions()[selectedIndex]);
            this.setHistory(value);
            this.setState({ selectedIndex: -1, value, show: false });
        }
    }

    handleSuggestionClick(value) {
        this.setHistory(value);
        this.setState({ show: false, value });
    }

    setHistory(value) {
        let history = JSON.parse(localStorage.getItem(this.autoCompleteKey)) || {};
        history[value] = true;
        localStorage.setItem(this.autoCompleteKey, JSON.stringify(history));
    }

    removeHistory(value) {
        const history = JSON.parse(localStorage.getItem(this.autoCompleteKey));
        history[value] = false;
        localStorage.setItem(this.autoCompleteKey, JSON.stringify(history));
        this.setState();
    }

    isHistoryExist(value) {
        const history = JSON.parse(localStorage.getItem(this.autoCompleteKey));
        return history ? Boolean(history[value]) : false;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    render() {
        const { selectedIndex, show, value } = this.state;
        const { getItemValue } = this.props;
        const fragment = document.createDocumentFragment();
        const suggestions = this.getSuggestions();
        let selectedElement;
        this.suggestionUL.classList.toggle('show', show);
        this.input.value = value;
        suggestions.forEach((suggestion, index) => {
            const { logo, name } = suggestion;
            const value = getItemValue(suggestion);
            let suggestionElement = this.cache.suggestionElements[value];
            if (!suggestionElement) {
                suggestionElement = document.createElement('li');
                const img = document.createElement('img');
                img.setAttribute('src', logo);
                const span = document.createElement('span');
                span.textContent = name;
                suggestionElement.appendChild(img);
                suggestionElement.appendChild(span);
                this.cache.suggestionElements[value] = suggestionElement;
            }
            const isSelected = selectedIndex === index;
            if (isSelected) selectedElement = suggestionElement;
            suggestionElement.classList.toggle('selected', isSelected);
            suggestionElement.onclick = e => this.handleSuggestionClick(value);
            suggestionElement.onmouseenter = () => this.setState({ selectedIndex: index });
            if (this.isHistoryExist(value)) {
                let button = suggestionElement.querySelector('button');
                if (!button) button = document.createElement('button');
                button.textContent = 'remove histroy';
                button.classList.remove('hidden');
                button.onclick = e => {
                    e.stopPropagation();
                    button.classList.toggle('hidden', true);
                    this.removeHistory(value);
                }
                suggestionElement.appendChild(button);
            }
            fragment.appendChild(suggestionElement);
        })
        this.suggestionUL.innerHTML = "";
        this.suggestionUL.appendChild(fragment);
        if (selectedElement && suggestions.length > maxVisibleSuggestions) {
            this.makeSelectedElementVisible(selectedElement);
        }
    }

    makeSelectedElementVisible(selectedElement) {
        const scrollTop = this.suggestionUL.scrollTop;
        const selectedElementTop = selectedElement.getBoundingClientRect().top - this.suggestionUL.getBoundingClientRect().top;
        if (selectedElementTop + suggestionElementHeight - suggestionMaxHeight > 0) {
            this.suggestionUL.scrollTop = selectedElementTop + suggestionElementHeight + scrollTop - suggestionMaxHeight;
        } else if (selectedElementTop < 0) {
            this.suggestionUL.scrollTop = selectedElementTop + scrollTop;
        }
    }
}