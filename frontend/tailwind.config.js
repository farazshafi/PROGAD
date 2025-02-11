  module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html",
      "./node_modules/flowbite/**/*.js", 
    ],
    theme: {
      extend: {
        colors: {
          ourOrange: "#ff7f11",
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [
      require('flowbite/plugin') 
    ],
  };
