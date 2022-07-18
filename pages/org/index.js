import {useEffect, useState} from "react";
import {Breadcrumb, Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import Pagination from "react-js-pagination";

import AddModal from "../../components/modals/org/Add";

import {getPaginationItems} from "../../utils/pagination";
import {getOrgsByService} from "../../api/org";
import {getServices} from "../../api/service";

export default function Index() {

	const [services, setServices] = useState([]);
	const [service, setService] = useState(null);
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);

	const [isOpenAdd, setIsOpenAdd] = useState(false);

	const initItems = (service) => {
		getOrgsByService(service).then(r => {
			setItems(!(r === undefined || r === null) ? r : []);
		});
	}

	const handleChangeServices = (e) => {
		const value = e.target.value;
		setService(value !== 'NONE' ? value : null);
		initItems(value);
	}

	const handleClickOpenAdd = () => {
		setIsOpenAdd(true);
	}

	const handleClickCloseAdd = () => {
		setIsOpenAdd(false);
	}

	const handleClickPagination = (page) => {
		setPage(page);
	}

	useEffect(() => {
		getServices().then(r => {
			setServices(!(r === undefined || r === null) ? r : []);
		});
	}, []);

	return (<>
		{(services !== null) &&
			<AddModal isOpen={isOpenAdd} handleClose={handleClickCloseAdd} services={services} service={service} init={initItems} />
		}
		<Row className="mb-3 g-3">
			<Col>
				<Breadcrumb>
					<Breadcrumb.Item active>기관</Breadcrumb.Item>
				</Breadcrumb>
			</Col>
		</Row>
		<Row className="mb-3 g-3">
			<Col>
				<Card>
					<Card.Header className="bg-light">
						<Row className="align-items-end g-2">
							<Col>
								<div className="d-flex">
									<h5 className="mb-0">목록</h5>
								</div>
							</Col>
							<Col className="d-flex justify-content-end">
								<Button variant="light" size="sm" className="border-300 me-1 text-600" onClick={handleClickOpenAdd}>
									<span>추가</span>
								</Button>
							</Col>
						</Row>
					</Card.Header>
					<Card.Body className="bg-light">
						<Row className="mb-3 g-3">
							<Col>
								<Form>
									<Form.Group>
										<Form.Select onChange={handleChangeServices}>
											<option value="NONE">선택</option>
											{services !== null &&
												<>
												{services?.map((item, index) => (
													<option key={index} value={item.unique}>{item.name}</option>
												))}
												</>
											}
										</Form.Select>
									</Form.Group>
								</Form>
							</Col>
						</Row>
						<Table responsive hover className="text-center">
							<thead>
							<tr>
								<th>기관명</th>
								<th>접두사</th>
							</tr>
							</thead>
							<tbody>
							{service === null &&
								<tr>
									<td colSpan={2}>서비스를 선택해주세요.</td>
								</tr>
							}
							{service !== null && items.length <= 0 &&
								<tr>
									<td colSpan={2}>해당 서비스에 대한 기관이 존재하지 않습니다.</td>
								</tr>
							}
							{(service !== null && items.length > 0) &&
								<>
								{getPaginationItems(items, page, 10)?.map((item, index) => (
									<tr key={index}>
										<td>{item.name}</td>
										<td>{item.prefix}</td>
									</tr>
								))}
								</>
							}
							</tbody>
						</Table>
						{items.length > 0 &&
							<div className="d-flex justify-content-center">
								<Pagination
									activePage={page}
									itemsCountPerPage={10}
									totalItemsCount={items?.length}
									pageRangeDisplayed={5}
									prevPageText={"‹"}
									nextPageText={"›"}
									onChange={handleClickPagination}
								/>
							</div>
						}
					</Card.Body>
				</Card>
			</Col>
		</Row>
	</>);

}