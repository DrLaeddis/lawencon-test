import './modal.css';

export default function AllModal(props) {

    const { openModal, handleShowModal, modalData } = props;

    if(!openModal) return null

    const modals = () => {
        handleShowModal(false)
    }

    return (
        <div className="modal-container" onClick={modals}>
            <div className="modal-element">
                <img src={modalData.Poster} alt="" />
            </div>
        </div>
    )
}