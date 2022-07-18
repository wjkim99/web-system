import {useEffect, useState} from "react";
import {Breadcrumb, Button, Card, Col, Row, Table} from "react-bootstrap";
import Pagination from "react-js-pagination";

import AddModal from "../../components/modals/service/Add";
import {getServices} from "../../api/service";
import {getPaginationItems} from "../../utils/pagination";

export default function Index() {

	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);

	const [isOpenAdd, setIsOpenAdd] = useState(false);

	const initItems = () => {
		getServices().then(r => {
			setItems(!(r === undefined || r === null) ? r : []);
		});
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
		initItems();
	}, []);

	return (<>
		<AddModal isOpen={isOpenAdd} handleClose={handleClickCloseAdd} init={initItems} />
		<Row className="mb-3 g-3">
			<Col>
				<Breadcrumb>
					<Breadcrumb.Item active>서비스</Breadcrumb.Item>
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
						<Table responsive hover className="text-center">
							<thead>
							<tr>
								<th>서비스명</th>
								<th>코드</th>
							</tr>
							</thead>
							<tbody>
								{items.length <= 0 &&
									<tr>
										<td colSpan={3}>등록된 서비스가 없습니다.</td>
									</tr>
								}
								{items.length > 0 &&
									<>
										{getPaginationItems(items, page, 10)?.map((item, index) => (
											<tr key={index}>
												<td>{item.name}</td>
												<td>{item.code}</td>
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