ssh root@174.138.103.192 <<EOF
pm2 kill
cd surf-garage-nuxt3
git pull && yarn install && yarn build
pm2 start yarn -- start
