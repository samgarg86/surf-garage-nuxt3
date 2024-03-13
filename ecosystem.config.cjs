module.exports = {
  apps: [
    {
      name: 'Surf Garage Board Storage',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './packages/boardStorage/.output/server/index.mjs'
    },
    {
      name: 'Surf Garage Art',
      port: '3001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './packages/art/.output/server/index.mjs'
    }
  ]
};
