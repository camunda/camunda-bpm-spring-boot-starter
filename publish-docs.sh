#!/bin/bash

FOLDER=${1:-master}
# following doesn't work when in detached head state
#GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
GIT_COMMIT=${1:-`git rev-parse --short HEAD`}
#GIT_LATEST_TAG=`git describe --abbrev=0 --tags`
GH_PAGES_DIR=github-pages

rm -rf $GH_PAGES_DIR
git clone git@github.com:camunda/camunda-bpm-spring-boot-starter.git $GH_PAGES_DIR
(cd $GH_PAGES_DIR && git checkout gh-pages)
cp -r docs/target/generated-docs/* $GH_PAGES_DIR/docs/${FOLDER}/
if [ -z "${RELEASE_VERSION}" ]; then
  cp -r docs/target/generated-docs/* $GH_PAGES_DIR/docs/current/
fi

(cd $GH_PAGES_DIR && git add . && git commit -m "Push docs for commit $GIT_COMMIT" && git push)
