/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,

  images: {
    domains: [
      "media.graphassets.com",
      "us-west-2.graphassets.com",
    ],
  },

  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};
