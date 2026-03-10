yarn && yarn build:art
rsync -avz packages/art/.output/ root@174.138.103.192:~/surf-garage-nuxt3/packages/art/.output
ssh root@174.138.103.192 <<EOF
cd surf-garage-nuxt3
pm2 kill && pm2 start ecosystem.config.cjs
