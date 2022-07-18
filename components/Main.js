import {useEffect} from "react";

import {Cookies} from "react-cookie";
import {useRouter} from "next/router";

export default function Main({children}) {

	const router = useRouter();
	const cookies = new Cookies();

	useEffect(() => {

		// const refresh = cookies.get('refresh');
		//
		// if(refresh === undefined) {
		// 	router.push('/auth/login').then();
		// }

	}, []);

	return (<main>{children}</main>);

}