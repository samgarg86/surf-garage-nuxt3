module.exports = {
  apps: [
    {
      name: 'board-storage',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './packages/boardStorage/.output/server/index.mjs'
    },
    {
      name: 'surf-art',
      port: '3001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './packages/art/.output/server/index.mjs'
    }
  ]
}
