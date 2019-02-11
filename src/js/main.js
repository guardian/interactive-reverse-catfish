// Javascript that is inline. Should be used for anything that needs to be immediate
import jquery from 'jquery';
window.$ = jquery;

import share from './modules/share.js';
import triggers from './modules/triggers.js';

share.init();
triggers.init();
