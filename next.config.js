/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DB_URI: 'mongodb+srv://sassou5018:CJoMxjfpU5r35FbV@cluster0.ahd4c.mongodb.net/gestionFuite'
  }
}

module.exports = nextConfig
