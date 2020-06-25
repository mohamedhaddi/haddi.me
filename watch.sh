#!/bin/bash

# run live-server, watch Sass and Autoprefixer
live-server & sass --watch assets/styles/sass/main.scss assets/styles/css/style.css & npx postcss assets/styles/css/style.css -w --use autoprefixer -o assets/styles/css/main.css
