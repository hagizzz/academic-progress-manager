import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import SearchFilterSubject from './SearchFilterSubject'
import SearchFilterClassroom from './SearchFilterClassroom'

function OpenCourseForm() {
    return (
        <dialog id="open-new-course" className="modal">
            <div className="modal-box max-w-5xl h-[400px] overflow-hidden">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-circle  btn-sm  btn-ghost absolute right-2 top-2">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </form>
                <h3 className="font-bold text-lg">Thông tin chi tiết môn học</h3>
                <div className="divider"></div>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <p>Chọn môn mở:</p>
                        <SearchFilterSubject />
                    </div>
                    <div className="flex flex-row">
                        <p>Chọn lớp mở:</p>
                        <SearchFilterClassroom />
                    </div>
                </div>

                <input
                    className="btn btn-primary absolute bottom-4 right-4 normal-case"
                    type="submit"
                    value="Lưu thay đổi"
                />
            </div>
        </dialog>
    )
}

export default OpenCourseForm
