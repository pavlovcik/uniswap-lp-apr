#!/usr/bin/env bash

yarn google-closure-compiler \
    --compilation_level ADVANCED \
    --js dist/index.js \
    --create_source_map ./dist/closured.js.map \
    --js_output_file dist/closured.js
