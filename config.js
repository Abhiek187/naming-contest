const env = process.env; // process = global object

export default {
	port: env.PORT || 8080, // default to port 8080
	host: env.HOST || "0.0.0.0", // bind to all IPs on the machine
	get serverUrl() {
		return `http://${this.host}:${this.port}`;
	}
};
