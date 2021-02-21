const dotenv=require('dotenv');
const fs=require('fs');
const path=require('path');

console.log(process.env.NODE_ENV);

const ENVIRONMENT = process.env.NODE_ENV || 'local';

switch (ENVIRONMENT) {
	case "development": {
		if (fs.existsSync(path.join(process.cwd(), "/.env.development"))) {
			console.log("--DEVELOPMENT ENVIRONMENT__!")
			dotenv.config({ path: ".env.development" });
		} else {
			console.log("Unable to find Environment File");
			process.exit(1);
		}
		break;
	}
	case "testing": {
		if (fs.existsSync(path.join(process.cwd(), "/.env.testing"))) {
			console.log("--TESTING ENVIRONMENT!")
			dotenv.config({ path: ".env.testing" });
		} else {
            console.log("Unable to find Environment File");
			process.exit(1);
		}
		break;
	}	
	default: {
		if (fs.existsSync(path.join(process.cwd(), "/.env.local"))) {
			console.log("--LOCAL ENVIRONMENT__")
			dotenv.config({ path: ".env.local" });
		} else {
			process.exit(1);
		}
	}
}

const SERVER = Object.freeze({
	BASE_PATH: process.cwd(),
	ENVIRONMENT: process.env["NODE_ENV"],
	IP: process.env["IP"],
	PORT: process.env["PORT"],
	API_BASE_URL: "/api/phone-book",
	DATABASE_URL:process.env["DATABASE_URL"],
	DATABASE_NAME:process.env["DATABASE_NAME"],
    AUTH_TOKEN:process.env["AUTH_TOKEN"]
});

module.exports={
    SERVER
}
