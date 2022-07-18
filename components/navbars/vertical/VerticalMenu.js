import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Fragment, useState} from "react";
import {Collapse, Nav} from "react-bootstrap";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import * as configActions from "../../../store/modules/config";

export default function VerticalMenu({routes}) {

	const dispatch = useDispatch();
	const config = useSelector(({config}) => config);
	const { pathname } = useRouter();

	const isActive = (to) => {
		if(pathname === "/" && to === "/") {
			return true
		} else {
			if(to !== "/" && pathname.includes(to)) {
				return true;
			}
		}
	}

	const handleClickNavItem = () => {
		if(config.isTopCollapsed) {
			dispatch(configActions.updateIsTopCollapsed(!config.isTopCollapsed));
		}
	}

	return (<>
		{routes?.map((route, index) => (
			<Fragment key={index}>
				{!route.children ? (
					<Nav.Item as="li" onClick={handleClickNavItem}>
						<Link href={route.to ? route.to : ''}>
							<a className={isActive(route.to) ? 'active nav-link' : 'nav-link'}>
								<VerticalMenuItem route={route} />
							</a>
						</Link>
					</Nav.Item>
					) :
					<CollapseItems route={route} key={index} />
				}
			</Fragment>
		))}
	</>);

}

export function CollapseItems({route}) {

	const { pathname } = useRouter();

	const openCollapse = param => {
		const check = children => {
			if(children.to === pathname) {
				return true;
			}
			return Object.prototype.hasOwnProperty.call(children, 'children') && children.children.some(check);
		};
		return param.some(check);
	};

	const [open, setOpen] = useState(openCollapse(route.children));

	return (
		<Nav.Item as="li">
			<Link href={route.to ? route.to : '#'}>
				<Nav.Link
					onClick={() => { setOpen(!open); }}
					className={`dropdown-indicator cursor-pointer ${!route.active && 'text-500'}`}
					aria-expanded={open}
				>
					<VerticalMenuItem route={route} />
				</Nav.Link>
			</Link>
			<Collapse in={open}>
				<Nav className="flex-column nav" as="ul">
					<VerticalMenu routes={route.children} />
				</Nav>
			</Collapse>
		</Nav.Item>
	);

}

export function VerticalMenuItem({route}) {
	return (
		<div className="d-flex align-items-center">
			{route.icon && (
				<span className="nav-link-icon">
					<FontAwesomeIcon icon={route.icon} className="fa-fw" />
		        </span>
			)}
			<span className="nav-link-text ps-1">{route.name}</span>
		</div>
	);
}