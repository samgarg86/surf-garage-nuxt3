ssh root@174.138.103.192 <<EOF
pm2 kill
cd surf-garage-nuxt3
git pull && yarn install
yarn build packages/art
yarn build packages/boardStorage
pm2 start ecosystem.config.cjs
