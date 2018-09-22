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
```

## How to add content

### Method  n°1 : HTML nodes
The `data-lightbox` attribute is used to set up a lightbox element.

``` html
<figure data-lightbox='{ "type": "image", "alt": "A picture", "src": "./img/picture_2880w.jpg" }'>
    <img src="./img/picture.jpg" alt="preview" />
</figure>
```

You can specify any valid selector with the `fetch()` function to retrieve all the lightbox elements present in the document.

``` javascript
lightbox.fetch('*[data-lightbox]');
```


### Method  n°2 : JavaScript only
In this case, the elements are added directly to the lightbox object without parsing the document.

``` javascript
const json = [
    { "type": "image", "alt": "My first picture", "src": "./img/picture1_2880w.jpg", "target": "#my-button" },
    { "type": "image", "alt": "My second picture", "src": "./img/picture2_2880w.jpg" },
];

lightbox.add(json);
```

> You can specify a `target` which is a selector or a node that will a have click listener bound to it like with the first method.

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
