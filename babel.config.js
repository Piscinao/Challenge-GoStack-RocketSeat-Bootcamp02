module.exports = {
  presets: [
    // Ambiente que esta sendo executado e converte o código 
    '@babel/preset-env',
    // Adiciona as funcionalidades do react na conversão
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};