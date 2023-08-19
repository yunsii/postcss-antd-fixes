#!/bin/bash

npm run build
npx changeset
npx changeset version
gaa
gc
npx changeset publish
npx changeset publish
