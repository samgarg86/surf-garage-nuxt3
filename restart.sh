ssh root@174.138.103.192 <<EOF
pm2 kill
pm2 start ecosystem.config.cjs
