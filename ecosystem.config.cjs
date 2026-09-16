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
      name: 'salty-lens',
      port: '3001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './packages/saltyLens/.output/server/index.mjs'
    }
  ]
}
