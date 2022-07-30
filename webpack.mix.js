const mix = require('laravel-mix');
require('laravel-mix-svelte');


mix.js('resources/js/app.js', 'public/js/app.js').svelte()