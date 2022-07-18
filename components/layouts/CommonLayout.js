import Vertical from "../navbars/vertical/Vertical";
import Top from "../navbars/top/Top";

export default function CommonLayout({children}) {

	return (<>
		<div className='container'>
			<Vertical />
			<div className='content'>
				<Top />
				{children}
			</div>
		</div>
	</>);

}