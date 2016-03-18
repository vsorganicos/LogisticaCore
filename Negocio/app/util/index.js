'use strict';

const fs = require('fs');
const archive = require('../../config.json');

exports.securityCredentials = function(callback) {
	callback(archive.security);
};
