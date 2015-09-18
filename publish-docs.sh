#!/bin/bash

GIT_COMMIT=${1:-`git rev-parse --short HEAD`}
GH_PAGES_DIR=github-pages
rm -rf $GH_PAGES_DIR
git clone git@github.com:camunda/camunda-bpm-spring-boot-starter.git $GH_PAGES_DIR
(cd $GH_PAGES_DIR && git checkout gh-pages)
cp -r docs/target/generated-docs/* $GH_PAGES_DIR
(cd $GH_PAGES_DIR && git add . && git commit -m "Push docs for commit $GIT_COMMIT" && git push)
