# lightbox
An easy-to-use and customizable lightbox. Live demo [here](http://projects.metter-rothan.fr/lightbox/)!

## Usage

```
npm install jmetterrothan-lightbox
```

## How to create a lightbox

```javascript
import Lightbox from 'jmetterrothan-lightbox';
import 'jmetterrothan-lightbox/src/assets/sass/lightbox.scss';

const lightbox = new Lightbox({
    // options ...
});

lightbox.init();
lightbox.fetch('*[data-lightbox]');
```

## Available lightbox options

| Option name | Type | Default | Description |
| --- | --- | --- | --- |
| uid | `string` | `uniqid()` | Lightbox unique identifier, auto-generated if not specified |
| appendTo | `string` | `body` | Lightbox parent selector |
| autoplay | `boolean` | `false` | Enable autoplay |
| delay | `number` | `5000` | Autoplay delay in ms to wait before showing the next element |
| rewind | `boolean` | `true` | Navigation loops through the lightbox elements |
| documentScroll | `boolean` | `false` | Disable scroll when lightbox is opened |
| fullscreen | `boolean` | `false` | Allow fullscreen mode |
| closeOnBlur | `boolean` | `true` | Allow the lightbox to close when clicking on the background |
| closeOnEscape | `boolean` | `true` | Allow the lightbox to close on pressing escape |
| arrowKeyNavigation | `boolean` | `true` | Allow navigation with left/right arrow keys |
| scrollNavigation | `boolean` | `true` | Allow navigation by scrolling |
| closeBtnUI | `boolean` | `true` | Display close button |
| navigationBtnUI | `boolean` | `true` | Display navigation arrows (left/right) |
| autoplayBtnUI | `boolean` | `true` | Display autoplay on/off button |
| bulletlistUI | `boolean` | `true` | Display a bulletlist navigation |
| paginationUI | `boolean` | `true` | Display navigation information |
| titleUI | `boolean` | `true` | Display the element's title |
| progressBarUI | `boolean` | `true` | Show a progress bar when loading |
