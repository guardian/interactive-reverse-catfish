// Javascript that is inline. Should be used for anything that needs to be immediate
import jquery from 'jquery';
window.$ = jquery;

import share from './modules/share.js';
import header from './modules/header.js';
import triggers from './modules/triggers.js';

share.init();
header.init();
triggers.init();
