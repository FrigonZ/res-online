module.exports = {
  apps: [
    {
      name: 'res-online',
      script: './src/index.ts',
      watch: ['src'],
      // Delay between restart
      watch_delay: 1000,
      instances: '2',
      exec_mode: 'cluster',
    },
  ],
};
