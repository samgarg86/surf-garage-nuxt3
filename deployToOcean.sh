ssh root@174.138.103.192 <<EOF
pm2 kill
cd surf-garage-nuxt3
git fetch origin && git switch main && git pull
yarn install
yarn build:art
yarn build:board
pm2 start ecosystem.config.cjs
