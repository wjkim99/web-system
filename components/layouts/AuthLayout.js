import {Card, Col, Row} from "react-bootstrap";
import Logo from "../common/Logo";

export default function AuthLayout({children}) {

	return (<>
		<section className="py-0">
			<div className="container">
				<Row className="flex-center min-vh-100 py-6">
					<Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">
						<Logo at="auth" width={58} href="/auth/login" />
						<Card>
							<Card.Body className="p-y p-sm-5">
								{children}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</section>
	</>);

}