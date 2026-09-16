yarn && yarn build:salty && yarn build:board
rsync -avz packages/saltyLens/.output/ root@174.138.103.192:~/surf-garage-nuxt3/packages/saltyLens/.output
rsync -avz packages/boardStorage/.output/ root@174.138.103.192:~/surf-garage-nuxt3/packages/boardStorage/.output
ssh root@174.138.103.192 <<EOF
cd surf-garage-nuxt3
pm2 kill && pm2 start ecosystem.config.cjs
