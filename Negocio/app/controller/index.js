'use strict';

const Boom = require('boom');
const trajetos = require('../core/trajeto');
const fretes = require('../core/calculo');
const params = require('../../config.json');

module.exports.calcularDistanciaETempo = function(request, response) {
  console.log('Params:: Origin: ' + request.params.origin + ' ::Destination: ' + request.params.destination);

  trajetos.calcDirections(request.params.origin, request.params.destination, function(err, result) {
    if(err)
			response(Boom.create(500, err));
    else
      response(result);
  });
};

module.exports.obterCoordenadasGeograficas = function(request, response) {
  trajetos.getGeocode(request.params.location, function(err, result) {
    if(err)
			response(Boom.create(500, err));
    else
      response(result);
  });
};

module.exports.calcularFrete = function(request, response) {
  var payload = null;
  var jSon = null;
  var origem = null;
  var respJson = {
    status : null
  }

  try {
    jSon = request.payload;
    payload = JSON.stringify(jSon);

    //Pega a origem para calcular o tempo/distância do trajeto
    origem = params.calculo.origin.location.lat + ',' + params.calculo.origin.location.lng;

    console.log('###### Iniciar cálculo rota na API ####### ['+ new Date()+']');
    trajetos.calcDirections(origem, jSon.carrinho.cep, function(err, result) {
      console.log('###### Fim cálculo rota na API #######');
      if(err)
        return response(Boom.create(500, err));

      respJson.status = result.status;

      if(result.status=='OK') {
        var distance = result.distance.value; //Valor em metros
        var duration = result.duration.value; //Valor em minutos

        respJson.distancia = distance;
        respJson.valor = jSon.carrinho.valor;

        console.log('###### Iniciar cálculo frete na API ####### ['+ new Date()+']');
        fretes.calcularValorFreteCarrinho(respJson, function(err, resultado) {
          console.log('###### Fim cálculo frete na API ####### ['+ new Date()+']');
          if(err)
            return response(Boom.create(500, err));

          respJson.frete = resultado;

          response(respJson);
        })
      }else {
        response(respJson);
      }
    });

  }catch(e) {
    console.error('Erro ao tentar calcular o frete para a requisição: ' + payload + ' Detalhe: ' + e);
    response(Boom.create(500, err));
  }
};
