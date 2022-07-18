import {useState} from "react";
import {Button, CloseButton, Form, Modal} from "react-bootstrap";
import {activeFeedBack, validBlank, validSelect} from "../../../utils/validations";
import {createOrg} from "../../../api/org";

export default function AddModal({isOpen, handleClose, ...prop}) {

	const {services, service, init} = prop;

	const initForm = {
		service: 'NONE',
		name: '',
		prefix: '',
	};

	const initValid = {
		service: {
			blank: true,
		},
		name: {
			blank: true,
		},
		prefix: {
			blank: true,
			duplicate: true
		},
	};

	const [form, setForm] = useState(initForm);
	const [valid, setValid] = useState(initValid);

	const validation = () => {

		const service = form.service;
		const name = form.name;
		const prefix = form.prefix;

		const result = {
			...valid,
			service: {
				blank: validSelect(service),
			},
			name: {
				blank: validBlank(name),
			},
			prefix: {
				blank: validBlank(prefix),
				duplicate: prefix !== '' ? true : true
			},
		};

		setValid(result);

		const values = [];
		Object.values(result).forEach((item) => Object.values(item).forEach((value) => values.push(value)));

		for(const value of values) {
			if(!value) {
				return false;
			}
		}

		return true;

	}

	const handleClickClose = () => {
		setForm(initForm);
		setValid(initValid);
		handleClose();
	}

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]:  e.target.value
		});
	}

	const handleClickSubmit = () => {

		if(!validation()) { return; }

		if(confirm('기관을 추가하시겠습니까?')) {
			createOrg(form.service, form).then(r => {
				r ? alert('기관 추가 완료했습니다.') : alert('기관 추가에 실패했습니다.');
				init(service);
				handleClickClose();
			});
		}

	}

	return (<>
		<Modal size="md" show={isOpen}>
			<Modal.Header>
				<Modal.Title>추가</Modal.Title>
				<CloseButton className="btn btn-circle btn-sm transition-base p-0" onClick={handleClickClose} />
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>서비스*</Form.Label>
						<Form.Select
							name="service"
				            onChange={(e) => handleChange(e)}
						>
							<option value="NONE">선택</option>
							{services !== null &&
								<>
									{services?.map((item, index) => (
										<option key={index} value={item.unique}>{item.name}</option>
									))}
								</>
							}
						</Form.Select>
						<Form.Control.Feedback type="invalid" style={{display: activeFeedBack(valid.service.blank)}}>필수 정보입니다.</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>기관명*</Form.Label>
						<Form.Control
							name="name"
							type="text"
							autoComplete="off"
							maxLength={30}
							onChange={(e) => handleChange(e)}
						/>
						<Form.Control.Feedback type="invalid" style={{display: activeFeedBack(valid.name.blank)}}>필수 정보입니다.</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>접두사*</Form.Label>
						<Form.Control
							name="prefix"
							type="text"
							autoComplete="off"
							maxLength={10}
							onChange={(e) => handleChange(e)}
						/>
						<Form.Control.Feedback type="invalid" style={{display: activeFeedBack(valid.prefix.blank)}}>필수 정보입니다.</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid" style={{display: activeFeedBack(valid.prefix.duplicate)}}>중복된 코드입니다.</Form.Control.Feedback>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleClickSubmit}>추가</Button>
				<Button variant="light" className="border-300 me-1 text-600" onClick={handleClickClose}>닫기</Button>
			</Modal.Footer>
		</Modal>
	</>);

}