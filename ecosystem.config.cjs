// PM2 process config for the Next.js dev server.
// Start: pnpm dev:start  ·  Logs: pnpm dev:logs  ·  Stop: pnpm dev:stop

module.exports = {
  apps: [
    {
      name: "kodstudio-dev",
      script: "node_modules/next/dist/bin/next",
      args: "dev",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      max_memory_restart: "1500M",
      env: {
        NODE_ENV: "development",
      },
      out_file: ".pm2/out.log",
      error_file: ".pm2/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
