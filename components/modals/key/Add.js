import {useState} from "react";
import {activeFeedBack, validBlank} from "../../../utils/validations";
import {Button, CloseButton, Form, Modal} from "react-bootstrap";
import {createKey} from "../../../api/key";

export default function Add({isOpen, handleClose, ...prop}) {

	const {init} = prop;

	const initForm = {
		name: '',
		type: '',
	};

	const initValid = {
		name: {
			blank: true,
		},
		type: {
			blank: true,
		},
	};

	const [form, setForm] = useState(initForm);
	const [valid, setValid] = useState(initValid);

	const validation = () => {

		const name = form.name;
		const type = form.type;

		const result = {
			...valid,
			name: {
				blank: validBlank(name),
			},
			type: {
				blank: validBlank(type),
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

		if(confirm('인증키를 추가하시겠습니까?')) {
			createKey(form).then(r => {
				r ? alert('인증키 추가를 완료했습니다.') : alert('인증키 추가에 실패했습니다.');
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
						<Form.Label>인증키 명*</Form.Label>
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
						<Form.Label>인증키 유형*</Form.Label>
						<Form.Control
							name="type"
							type="text"
							autoComplete="off"
							maxLength={4}
							onChange={(e) => handleChange(e)}
						/>
						<Form.Control.Feedback type="invalid" style={{display: activeFeedBack(valid.type.blank)}}>필수 정보입니다.</Form.Control.Feedback>
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