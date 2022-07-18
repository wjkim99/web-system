import { faChartPie, faCircleInfo, faKey, faHospital, faUserCog } from "@fortawesome/free-solid-svg-icons";

export default [
	{
		label: '',
		labelDisable: true,
		children: [
			{
				name: '메인화면',
				icon: faChartPie,
				to: '/',
				active: true
			},
			{
				name: '인증키',
				icon: faKey,
				to: '/key',
				active: true
			},
			{
				name: '서비스',
				icon: faCircleInfo,
				to: '/service',
				active: true
			},
			{
				name: '기관',
				icon: faHospital,
				to: '/org',
				active: true
			},
		]
	}
];