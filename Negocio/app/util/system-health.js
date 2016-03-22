'use strict';

const os = require('os');
const Boom = require('boom');

var health = {
	system: {
		host: os.hostname(),
		cpus: os.cpus().length,
		platform: os.platform(),
		memory: {}
	}
};

exports.health = function(request, response) {
	status(function(err, result) {
		if(err)
			response(Boom.create(err));
		else
			response(result);
	});
}

var status = function(callback) {
	try {
		health.system['uptime'] = parseFloat((process.uptime() / 60)).toFixed(2) + "m";
		health.system.memory = process.memoryUsage();

    callback(null, health);

	}catch(e) {
		console.error(e);
		callback(e, null);
	}
}
