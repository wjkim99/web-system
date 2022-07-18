import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Cookies} from "react-cookie";
import {Button, Form} from "react-bootstrap";

import {login} from "../../api/auth";

export default function Login() {

	const cookies = new Cookies();
	const router = useRouter();

	const [form, setForm] = useState({
		username: '',
		password: '',
		device: '172.0.0.1',
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleClickSubmit = () => {

		login(form).then(r => {

			const today = new Date();
			const expire = today.setDate(today.getDate() + 2);

			const access = r.access;
			const refresh = r.refresh;

			cookies.set('access', access, {
				path: "/system",
			});

			cookies.set('refresh', refresh, {
				path: "/system",
				expires: new Date(expire)
			});

			router.push('/').then();

		}).catch(e => {
			alert("로그인에 실패하였습니다.");
		});

	};

	const getIp = async () => {
		const ipData = await fetch('https://geolocation-db.com/json/');
		const locationIp = await ipData.json();
		return locationIp.IPv4;
	}

	useEffect(() => {
		getIp().then(r => {
			setForm({ ...form, device: r });
		});
	}, []);

	return (<>
		<Form>
			<Form.Group className="mb-3">
				<Form.Control
					name="username"
					type="text"
					placeholder="아이디"
					onChange={handleChange}
					autoComplete="off"
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Control
					name="password"
					type="password"
					placeholder="비밀번호"
					onChange={handleChange}
					autoComplete="off"
				/>
			</Form.Group>
			<Form.Group>
				<Button
					type="button"
					color="primary"
					className="mt-3 w-100"
					disabled={!form.username || !form.password}
					onClick={handleClickSubmit}
				>로그인</Button>
			</Form.Group>
		</Form>
	</>);

}