
function Modal({openMsg,children}) {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-circle size-10 bg-base-300" onClick={()=>document.getElementById('my_modal_2').showModal()}>{openMsg}</button>
        <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
            {children}
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
        </dialog>
    </div>
  )
}

export default Modal
