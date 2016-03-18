'use strict';

const config = require('../../../config.json');

module.exports.calcularValorFreteCarrinho = function(carrinho, callback) {
  var frete = null;

  try {
    config.calculo.faixas[0].elements.forEach(function(row) {
      if(carrinho.valor >= row.valor_pedido) {
        var distance = Math.round(carrinho.distancia / 1000);

        if(row.distancia.inicio < distance && distance <= row.distancia.fim) {
          frete = row.frete;
        }

      }else {
      }
    });
    callback(null, frete);

  }catch(e) {
    console.error('Erro ao calcular o valor do frete para o carrinho: ' + carrinho);
    callback(e, null);
  }
}
