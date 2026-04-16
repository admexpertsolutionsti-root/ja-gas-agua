/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",        // Lê apenas os arquivos soltos na raiz (ex: index.html, script.js)
    "./src/**/*.{html,js}"  // Lê tudo que estiver dentro de uma pasta src
  ],
  theme: {
    fontFamily:{
      'sans':['Poppins', 'sans-serif']
    },
    extend: {
      backgroundImage:{"home": "url('/img/img-bg02.png')"}
    },
  },
  plugins: [],
}