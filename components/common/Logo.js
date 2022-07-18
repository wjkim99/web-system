import Link from "next/link";

export default function Logo({at, width, href}) {

	const linkClassName = 'text-decoration-none '
		+ ((at === 'navbar-vertical' || at === 'navbar-top') && 'navbar-brand text-left');
	const wrapperClassName = 'd-flex '
		+ (at === 'auth' && 'flex-center fw-bolder fs-5 mb-4')
		+ ((at === 'navbar-vertical' || at === 'navbar-top') && 'align-items-center')
		+ (at === 'navbar-vertical' && ' py-3');

	return (<>
		<Link href={href}>
			<a className={linkClassName}>
				<div className={wrapperClassName}>
					<img className="me-2" alt="Logo" width={width} />
					<span className={'font-sans-serif'}>falcon</span>
				</div>
			</a>
		</Link>
	</>);

}