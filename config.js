const env = process.env; // process = global object

export default {
	port: env.PORT || 8080 // default to port 8080
};
