import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupWrapper({ show, setShow, children }) {
	if (!show) return null;

	return (
		<div className="bg">
			<div className="popup">
				<button className='close' onClick={() => setShow(false)}>
					<img src={CloseIcon} />
				</button>
				{children}
			</div>
		</div>
	);
}
