import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

function Form(props) {
    const [formInfo, setFormInfo] = useState({})

    function fieldChangeHandler(fieldName) {
        return (e) => {
            setFormInfo((preState) => {
                return {
                    ...preState,
                    [fieldName]: e.target.value,
                }
            })
        }
    }

    useEffect(() => {
        const infos = {}
        props.fields.forEach((field) => {
            infos[field.name] = ''
        })
        setFormInfo(infos)
    }, [])

    return (
        <dialog id={props.id} className="modal font-light">
            <div className="modal-box text-slate-700">
                <div className="flex flex-col w-full">
                    <p className="font-bold text-left text-2xl">{props.form_title}</p>

                    <div className="divider"></div>

                    <div className="grid">
                        <p className="pb-5 text-lg">{props.form_content}</p>

                        <form method="dialog">
                            {props.fields.map((field, index) => {
                                return (
                                    <div className="w-full flex align-middle" key={index}>
                                        <label className="w-28 pt-2">{field.label}</label>
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="input w-full max-w-xs h-10 input-bordered mb-4"
                                            value={formInfo[field.name] || ''}
                                            onChange={fieldChangeHandler(field.name)}
                                        />
                                    </div>
                                )
                            })}

                            <input
                                className="btn btn-primary float-right mt-4 mr-7"
                                type="submit"
                                onClick={() => props.onSubmit(formInfo)}
                                value={props.btnLabel}
                            />
                        </form>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-circle  btn-sm  btn-ghost absolute right-2 top-2">
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default Form
