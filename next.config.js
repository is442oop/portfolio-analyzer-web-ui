/** @type {import('next').NextConfig} */
const PerspectivePlugin = require("@finos/perspective-webpack-plugin");

const nextConfig = {
    reactStrictMode: true,
    webpack: (config, _) => {
        config.plugins.push(new PerspectivePlugin({ inlineWorker: true }));
        config.module.rules.push({
            test: /\.arrow$/,
            use: [{ loader: "arraybuffer-loader" }],
        });
        return config;
    },
};

module.exports = nextConfig;
