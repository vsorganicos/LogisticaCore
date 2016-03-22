const Code = require('code');   // assertion library
const Lab = require('lab');
const trajetos = require('../app/core/trajeto');
const config = require('../config.json');

const lab = exports.lab = Lab.script();

lab.describe('Testes com a API de Mapas ' , () => {

	lab.it('Calcular distancia', (done) => {
    trajetos.calcDirections('05128-040', '05016-081', function(err, result) {
			//console.log(result);
			Code.expect(err).to.equal(null);
			done();
		});
  });

	lab.it('Get Latitude/Longitude', (done) => {
    trajetos.getGeocode('05016-081', function(err, result) {
			//console.log(result);
			Code.expect(err).to.equal(null);
			done();
		});
  });

	lab.it('Error on Get Latitude/Longitude', (done) => {
		trajetos.getGeocode('Rua Da Prata', function(err, result) {
			console.log(result);
			Code.expect(err).to.equal(null);
			done();
		});
	});

	lab.it('Calcular distancia da Se para o Bairro', (done) => {
		var se = config.calculo.origin.location.lat + ',' + config.calculo.origin.location.lng;

		trajetos.calcDirections(se, '05016-081', function(err, result) {
			//console.log(result);
			Code.expect(err).to.equal(null);
			done();
		});
  });

	lab.it('Calcular distancia da Se para o Bairro', (done) => {
		config.calculo.faixas.forEach(function(row) {
			console.log(JSON.stringify(row) + '\r\n');

		});
		done();
	});

});
