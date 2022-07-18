import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {Cookies} from "react-cookie";
import {Dropdown, Nav, Navbar} from "react-bootstrap";

import * as configActions from "/store/modules/config";
import Logo from "../../common/Logo";

export default function Top() {

	const router = useRouter();
	const dispatch = useDispatch();
	const config = useSelector(({config}) => config);

	const cookies = new Cookies();

	const [accountInfo, setAccountInfo] = useState(null);

	const handleToggleClick = () => {
		dispatch(configActions.updateIsTopCollapsed(!config.isTopCollapsed));
	}

	const handleClickLogout = () => {
		cookies.set('access', null, { path: "/", maxAge: -1 });
		cookies.set('refresh', null, { path: "/", maxAge: -1 });
		router.push('/auth/login').then();
	}

	useEffect(() => {

	}, []);

	return (
		<Navbar className={`navbar-glass fs--1 navbar-top sticky-kit`}>
			<Navbar.Toggle className={`toggle-icon-wrapper me-md-3 me-2 d-xl-none`} as="div">
				<button
					className="navbar-toggler-humburger-icon btn btn-link d-flex flex-center"
					onClick={handleToggleClick}
					id="burgerMenu"
				>
		            <span className="navbar-toggle-icon">
		                <span className="toggle-line" />
					</span>
				</button>
			</Navbar.Toggle>
			<Logo at="navbar-top" width={40} id="topLogo" href="/" />
			<Nav navbar className="navbar-nav-icons ms-auto flex-row align-items-center" as="ul">
				<Dropdown navbar={true} as="li">
					<Dropdown.Toggle id="topNavbarToggleId" className="pe-0 ps-2 nav-link cursor-pointer" as="span" bsPrefix="toggle">{accountInfo !== null ? accountInfo.name + " 님" : "TESTER 님"}</Dropdown.Toggle>
					<Dropdown.Menu aria-labelledby="topNavbarToggleId" className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
						<div className="bg-white rounded-2 py-2 dark__bg-1000">
							<Dropdown.Item className="fw-bold" onClick={handleClickLogout}>
								<span>로그아웃</span>
							</Dropdown.Item>
						</div>
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		</Navbar>
	);

}