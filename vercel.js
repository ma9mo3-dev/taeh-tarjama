{
  "version": 2,
  "builds": [
    {
      "src": "/translate.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/translate",
      "dest": "/translate.js"
    }
  ]
}
