# Autocomplete

A lightweight autocomplete plugin by pure javascript.

## Getting start

```bash
# install dependencies
npm install

# start webpack-dev-server
npm run dev
```

## Usage

```javascript
new autocomplete(options)
```

### Options

| Name         | Type            | Description                               |
| ------------ | --------------- | ----------------------------------------- |
| selector     | string          | the css selector for target input element |
| items        | Array of Object | for autocomplete's suggestions            |
| getItemValue | Function        | function to get display value from item   |

### Example

```javascript
new autoComplete({
    selector: '#demo2',
    items: [
        {
            logo: 'https://cdn4.iconfinder.com/data/icons/cyan-lime-green/128/facebook512x512.png',
            name: 'foo'
        },
        {
            logo: 'https://cdn2.iconfinder.com/data/icons/social-media-network-fill-flat-icon/512/Badoo-64.png',
            name: 'bar'
        }
    ],
    getItemValue: item => item.name
})

```