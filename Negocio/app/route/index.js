'use strict';

const Joi = require('joi');
const controller = require('../controller');
const health = require('../util/system-health');

var routes = [];

routes.push(
  {
    method: 'GET',
    path: '/logistica/core/v1/calcular-distancia-tempo/{origin}/{destination}',
    config: {
			auth: 'simple',
      handler: controller.calcularDistanciaETempo
    }
  },
  {
    method: 'GET',
    path: '/logistica/core/v1/obter-coordenas-geograficas/{location}',
    config: {
			auth: 'simple',
      handler: controller.obterCoordenadasGeograficas
    }
  },
  {
    method: 'POST',
    path: '/logistica/core/v1/calcular-frete',
    config: {
      auth: 'simple',
      validate: {
        payload: Joi.object().keys({
          carrinho: Joi.object().keys({
            id: Joi.string().optional(),
            valor: Joi.number().required(),
            cep: Joi.string().min(8).max(9).required(),
            uf: Joi.string().min(2).max(2).optional(),
          })
        })
      }
    },
    handler: controller.calcularFrete
  },
  {
    method: 'GET',
    path: '/system-health',
    handler: health.health
  }
);

module.exports = routes;
