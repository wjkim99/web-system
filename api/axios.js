import axios from "axios";
import {Cookies} from "react-cookie";
import {refresh} from "./auth";
import {getCode} from "../utils/response";

const URL = "http://msa-dev-alb-1540639332.ap-northeast-2.elb.amazonaws.com";

const app = () => {

	return axios.create({
		baseURL: "http://localhost:1000",
		// baseURL: URL,
	});

}

const auth = () => {

	return axios.create({
		baseURL: "http://localhost:1001",
		// baseURL: URL,
	});

}

export const Auth = auth();
export const Access = app();

Access.interceptors.request.use(
	function (config) {

		const cookies = new Cookies();
		const access = cookies.get('access');

		config.headers.Authorization = `Bearer ${access}`;

		return config;

	},
	function (error) {

	}
);

Access.interceptors.response.use(
	async function (response) {

		let result = null;

		const code = response.data.code;

		if(code === '000000') {
			result = response;
		} else if(code === 'S000000301' || code === 'S000000302') {

			await retryAccessRequest(response.config, 1)
				.then(r => {
					result = r;
				})
				.catch(() => {
					throw location.href="../auth/login";
				});

		} else {
			throw null;
		}

		return result;

	},
	function (error) {

	}
)

const retryAccessRequest = async (config, count) => {

	let response = null;

	const access = await refresh();

	config.headers.Authorization = `Bearer ${access}`;

	await Access.request(config).then(r => {

		if(getCode(r) === '000000') {
			response = r;
		} else {
			if(count <= 3) {
				retryAccessRequest(config, count++).then(r => {
					response = r;
				});
			} else {
				return null;
			}
		}

	});

	return response;

}