import {useState} from "react";

import {Button, CloseButton, Form, Modal} from "react-bootstrap";

import {activeFeedBack, validBlank} from "../../../utils/validations";
import {createService} from "../../../api/service";


export default function AddModal({isOpen, handleClose, ...prop}) {

	const {init} = prop;

	const initForm = {
		name: '',
		code: '',
		desc: '',
	};

	const initValid = {
		name: {
			blank: true,
			duplicate: true
		},
		code: {
			blank: true,
			duplicate: true
		},
	};

	const [form, setForm] = useState(initForm);
	const [valid, setValid] = useState(initValid);

	const validation = () => {

		const name = form.name;
		const code = form.code;

		const result = {
			...valid,
			name: {
				blank: validBlank(name),
				duplicate: name !== '' ? true : true
			},
			code: {
				blank: validBlank(code),
				duplicate: code !== '' ? true : true
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

		if(confirm('서비스를 추가하시겠습니까?')) {
			createService(form).then(r => {
				r ? alert('서비스 추가 완료했습니다.') : alert('서비스 추가에 실패했습니다.');
				init();
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
						<Form.Label>서비스명*</Form.Label>
						<Form.Control
							name="name"
							type="text"
							autoComplete="off"
							maxLength={30}
							onChange={(e) => handleChange(e)}
						/>
						<Form.Control.Feedback type="invalid" style={{display: activeFeedBack(valid.name.blank)}}>필수 정보입니다.</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid" style={{display: activeFeedBack(valid.name.duplicate)}}>중복된 서비스명입니다.</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>코드*</Form.Label>
						<Form.Control
							name="code"
							type="text"
							autoComplete="off"
							maxLength={4}
							onChange={(e) => handleChange(e)}
						/>
						<Form.Control.Feedback type="invalid" style={{display: activeFeedBack(valid.code.blank)}}>필수 정보입니다.</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid" style={{display: activeFeedBack(valid.code.duplicate)}}>중복된 코드입니다.</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>설명</Form.Label>
						<Form.Control
							name="desc"
							as="textarea"
							autoComplete="off"
							maxLength={100}
							style={{resize: "none"}}
							onChange={(e) => handleChange(e)}
						/>
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