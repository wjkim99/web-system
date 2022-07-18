import Head from "next/head";
import {useRouter} from "next/router";
import {wrapper} from "../store";
import '/templates/falcon/assets/scss/theme.scss';
import '../styles/globals.css'
import Main from "../components/Main";
import CommonLayout from "../components/layouts/CommonLayout";
import AuthLayout from "../components/layouts/AuthLayout";

function MyApp({ Component, pageProps }) {

	const router = useRouter();

	const content = () => {

		const path = router.pathname;

		if(path.includes('/auth')) {
			return (<AuthLayout><Component {...pageProps} /></AuthLayout>);
		}

		if(path == "/404") {
			return (<Component {...pageProps} />);
		}

		return (<CommonLayout><Component {...pageProps} /></CommonLayout>);

	}

	return (<>
		<Head>
			<title>슈퍼브레인 시스템</title>
		</Head>
		<Main>
			{content()}
		</Main>
	</>);

}

export default wrapper.withRedux(MyApp);
