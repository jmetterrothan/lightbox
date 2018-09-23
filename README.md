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

#### Method  n°1 : HTML nodes
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


#### Method  n°2 : JavaScript only
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
| fullscreen | `boolean` | `true` | Allow fullscreen mode |
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

## Available lightbox styling options

You can overwrite any of the following rules :

```sass
// Default styling options

$lb_horizontal-padding : 64px;
$lb_vertical-padding : 48px;

$lb_bgcolor : rgba(0, 0, 0, 0.985);
$lb_font-size : 16px;
$lb_font-family : Arial, sans-serif;

$lb_ui-btn_font-family : 'Lightbox Icons';
$lb_ui-btn_font-weight : 400;
$lb_ui-btn_color : #757575;
$lb_ui-btn_color_hover : #dadada;

$lb_ui-btn-prev_position : fixed; // fixed | absolute
$lb_ui-btn-prev_content : '\0041';
$lb_ui-btn-prev_font-size : 1em;

$lb_ui-btn-next_position : fixed; // fixed | absolute
$lb_ui-btn-next_content : '\0042';
$lb_ui-btn-next_font-size : 1em;

$lb_ui-options_position : fixed; // fixed | absolute

$lb_ui-btn-autoplay_content_off : '\0047';
$lb_ui-btn-autoplay_content_on : '\0046';
$lb_ui-btn-autoplay_font-size : 1em;
$lb_ui-btn-autoplay_order : 1;

$lb_ui-btn-fullscreen_content_off : '\0045';
$lb_ui-btn-fullscreen_content_on : '\0044';
$lb_ui-btn-fullscreen_font-size : 1em;
$lb_ui-btn-fullscreen_order : 2;

$lb_ui-btn-close_content : '\0043';
$lb_ui-btn-close_font-size : 1em;
$lb_ui-btn-close_order : 3;

$lb_ui-bulletlist_position : fixed;  // fixed | absolute
$lb_ui-bulletlist_size : 0.6em;
$lb_ui-bulletlist_color : #505050;
$lb_ui-bulletlist_color_active : #dadada;
$lb_ui-bulletlist_color_hover : #dadada;

$lb_ui-pagination_position : fixed; // fixed | absolute
$lb_ui-pagination_font-size : .8em;
$lb_ui-pagination_font-weight : 600;
$lb_ui-pagination_color : #757575;

$lb_ui-title_position : fixed; // fixed | absolute
$lb_ui-title_font-size : .9em;
$lb_ui-title_font-weight : 600;
$lb_ui-title_color : #757575;

$lb_loading-message_font-size : .8em;
$lb_loading-message_font-weight : 600;
$lb_loading-message_color : #757575;

$lb_error-message-title_font-size : 1.05em;
$lb_error-message-title_font-weight : 600;
$lb_error-message-title_color : #bdbdbd;

$lb_error-message_font-size : .9em;
$lb_error-message_font-weight : 300;
$lb_error-message_color : #757575;

$lb_progress_size : 4px;
$lb_progress_bgcolor : #505050;
$lb_progress-inner_bgcolor : #4799B7;

@import 'jmetterrothan-lightbox/src/assets/sass/lightbox';
```
