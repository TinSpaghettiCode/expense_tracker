import {Request} from 'express';

const common_site_config = require('../../../sites/common_site_config.json');
const { webserver_port } = common_site_config;

export default {
	'^/(app|api|assets|files|private)': {
		target: `http://127.0.0.1:${webserver_port}`,
		ws: true,
		router: function(req: Request) {
			const host = req.headers.host;
			if (!host) {
				throw new Error("Host header is undefined");
			}
			const site_name = host.split(':')[0];
			return `http://${site_name}:${webserver_port}`;
		}
	}
};
