import autoComplete from './autoComplete';
import './data';
import './autoComplete.scss';
import './main.scss';

fetch(`https://line.me/en/family-apps`).then(res => {
    new autoComplete({
        selector: '#demo1',
        items: res.items,
        getItemValue: item => item.name
    })
})

fetch(`https://line.me/en/family-apps`).then(res => {
    new autoComplete({
        selector: '#demo2',
        items: res.items,
        getItemValue: item => item.name,
    })
})