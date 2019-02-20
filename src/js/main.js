console.log('js started');

// Javascript that is inline. Should be used for anything that needs to be immediate
import jquery from 'jquery';
window.$ = jquery;

console.log('jquery');

import header from './modules/header.js';
import triggers from './modules/triggers.js';
import share from './modules/share.js';

share.init();
header.init();
triggers.init();
