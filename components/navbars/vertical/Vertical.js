import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Nav, Navbar, Row} from "react-bootstrap";

import * as configActions from "/store/modules/config";
import Logo from "../../common/Logo";

import routes from "/config/routes";
import {Fragment} from "react";
import VerticalMenu from "./VerticalMenu";

export default function Vertical() {

	const dispatch = useDispatch();
	const config = useSelector(({config}) => config);

	const handleClick = () => {
		dispatch(configActions.updateIsVerticalCollapsed(!config.isVerticalCollapsed));
		if(typeof document !== 'undefined') {
			document.getElementsByTagName('html')[0].classList.toggle('navbar-vertical-collapsed');
		}
	};

	let time = null;
	const handleMouseEnter = () => {
		if (config.isVerticalCollapsed) {
			time = setTimeout(() => {
				if(typeof document !== 'undefined') {
					document.getElementsByTagName('html')[0].classList.add('navbar-vertical-collapsed-hover');
				}
			}, 100);
		}
	};

	const handleMouseLeave = () => {
		if (config.isVerticalCollapsed) {
			clearTimeout(time);
			if(typeof document !== 'undefined') {
				document.getElementsByTagName('html')[0].classList.remove('navbar-vertical-collapsed-hover');
			}
		}
	};

	return (<>
		<Navbar className="navbar-vertical navbar-card" expand="xl" variant="light">

			<div className="d-flex align-items-center">

				<div className="toggle-icon-wrapper">
					<Button
						variant="link"
						className="navbar-toggler-humburger-icon navbar-vertical-toggle"
						id="toggleNavigationTooltip"
						onClick={handleClick}
					>
			            <span className="navbar-toggle-icon">
			                <span className="toggle-line" />
			            </span>
					</Button>
				</div>

				<Logo at="navbar-vertical" width={40} href="/" />

			</div>

			<Navbar.Collapse
				in={config.isTopCollapsed}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div className="navbar-vertical-content scrollbar">
					<Nav className="flex-column" as="ul">
						{routes && (<>
							{routes.map((route, index) => (
								<Fragment key={index}>
									{!route.labelDisable && (
										<Nav.Item as="li">
											<Row className="mt-3 mb-2 navbar-vertical-label-wrapper">
												<Col xs="auto" className="navbar-vertical-label navbar-vertical-label">
													{route.label}
												</Col>
												<Col className="ps-0">
													<hr className="mb-0 navbar-vertical-divider"></hr>
												</Col>
											</Row>
										</Nav.Item>
									)}
									<VerticalMenu routes={route.children} />
								</Fragment>
							))}
						</>)}
					</Nav>
				</div>
			</Navbar.Collapse>

		</Navbar>
	</>);

}