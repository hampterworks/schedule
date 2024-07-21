/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  basePath: '/schedule',
  transpilePackages: ["@repo/ui"],
  compiler: {
    styledComponents: true,
  }
};
