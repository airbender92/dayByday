
// Make a module that exports a default any
// using JQuery as an example:
// place in jquery.d.ts
declare let $: any;
export default $;

// and then in any file in your project, you can import this definition with:

// some other .ts file
import $ from 'jquery';
// after this import, $ will be typed as any.

// if the library has multiple top-level variables, export and import by name instead:
// place in jquery.d.ts
declare module 'jquery' {
    let $: any;
    let jQuery: any;

    export { $ };
    export { jQuery };
}

// you can then import and use both names:

// some other .ts file
import { $, jQuery } from 'jquery';
$.dothings();
jQuery.doOtherThings(); 

// =============Declare an any global====================
// It is sometimes easiest to just declare a global of type any, especially in simple projects
declare var $: any;
// now any use of $ will be typed any.

// ===================use an ambient module==============
//If you just want to indicate the intent of an import (so you don't want to declare a global) but don't wish to bother
//with any explicit definitions, you can import an ambient module.
// in a declarations file (like declarations.d.ts)
declare module "jquery"; // note that there are no defined exports

// You can then import from the ambient module.
// some other .ts file
import {$, jQuery} from "jquery";
// Anything imported from the declared module (like $ and jQuery) above will be of type any