import { Modal } from "react-bootstrap-v5";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from "react";
import { createUser } from "../services/UsersServices";
import clsx from "clsx";
import { FormatErrorFormik } from "../../helpers/FormatErrorFormik";

const initialValues = {
    fullname: '',
    email: '',
    password: '',
    cpassword: '',
}


const createSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(3, 'Minimum 3 characters')
        .max(50, 'Maximum 50 characters')
        .required('Fullname is required'),
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 characters')
        .max(50, 'Maximum 50 characters')
        .required('Email is required'),
    password: Yup.string()
        .min(3, 'Minimum 3 characters')
        .max(50, 'Maximum 50 characters')
        .required('Password is required'),
    cpassword: Yup.string()
        .required('Password confirmation is required')
        .when('password', {
            is: (val: string) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
        }),
})



type Props = {
    show: boolean
    handleShow: () => void
    fetchSearchResults: () => void
}

const CreateUserModal: React.FC<Props> = ({ show, handleShow, fetchSearchResults }) => {
    console.log('hijo se renderiza')
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues,
        validationSchema: createSchema,
        onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
            setLoading(true)
            setTimeout(() => {
                createUser(values.email, values.fullname, values.password)
                    .then(({ data: { data } }) => {
                        setLoading(false)
                        // dispatch(auth.actions.login(data.accessToken))
                        fetchSearchResults();
                        handleShow();
                    })
                    .catch((e) => {
                        setLoading(false)
                        setSubmitting(false)
                        setStatus('Registration process has broken')

                        if (e.response.status == 422) {
                            let errosForm = FormatErrorFormik(e.response.data.errors)
                            setErrors(errosForm);
                        }
                    })
            }, 1000)
        },
    })

    return (

        <Modal
            id='cp_modal_add_user'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-650px'
            show={show}
            onHide={handleShow}
        >
            <div className="modal-content">
                <form className="form" id="cp_modal_add_customer_form" onSubmit={formik.handleSubmit}>
                    <div className="modal-header" id="kt_modal_add_customer_header">
                        <h2 className="fw-bolder">Add a user</h2>
                        <div id="kt_modal_add_customer_close" className="btn btn-icon btn-sm btn-active-icon-primary">
                            <span className="svg-icon svg-icon-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                                    <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                                </svg>
                            </span>

                        </div>
                    </div>
                    <div className="modal-body py-10 px-lg-17">
                        <div className="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">

                            <div className="fv-row mb-7">

                                <label className="required fs-6 fw-bold mb-2">Fullname</label>

                                <input
                                    type="text"
                                    autoComplete='off'
                                    placeholder=""
                                    {...formik.getFieldProps('fullname')}

                                    className={clsx(
                                        'form-control form-control form-control-solid',
                                        {
                                            'is-invalid': formik.touched.fullname && formik.errors.fullname,
                                        },
                                        {
                                            'is-valid': formik.touched.fullname && !formik.errors.fullname,
                                        }
                                    )}
                                />

                                {formik.touched.fullname && formik.errors.fullname && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.fullname}</span>
                                        </div>
                                    </div>
                                )}

                            </div>


                            <div className="fv-row mb-7">

                                <label className="required fs-6 fw-bold mb-2">Email</label>

                                <input
                                    type="email"
                                    autoComplete='off'

                                    placeholder=""
                                    {...formik.getFieldProps('email')}

                                    className={clsx(
                                        'form-control form-control form-control-solid',
                                        {
                                            'is-invalid': formik.touched.email && formik.errors.email,
                                        },
                                        {
                                            'is-valid': formik.touched.email && !formik.errors.email,
                                        }
                                    )}
                                />

                                {formik.touched.email && formik.errors.email && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.email}</span>
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="fv-row mb-7">

                                <label className="required fs-6 fw-bold mb-2">Password</label>

                                <input
                                    type="password"
                                    autoComplete='off'
                                    placeholder=""
                                    {...formik.getFieldProps('password')}

                                    className={clsx(
                                        'form-control form-control form-control-solid',
                                        {
                                            'is-invalid': formik.touched.password && formik.errors.password,
                                        },
                                        {
                                            'is-valid': formik.touched.password && !formik.errors.password,
                                        }
                                    )}
                                />

                                {formik.touched.fullname && formik.errors.fullname && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.fullname}</span>
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="fv-row mb-7">

                                <label className="required fs-6 fw-bold mb-2">Confirm Password</label>

                                <input
                                    type="text"
                                    autoComplete='off'
                                    placeholder=""
                                    {...formik.getFieldProps('cpassword')}

                                    className={clsx(
                                        'form-control form-control form-control-solid',
                                        {
                                            'is-invalid': formik.touched.cpassword && formik.errors.cpassword,
                                        },
                                        {
                                            'is-valid': formik.touched.cpassword && !formik.errors.cpassword,
                                        }
                                    )}
                                />

                                {formik.touched.cpassword && formik.errors.cpassword && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.cpassword}</span>
                                        </div>
                                    </div>
                                )}

                            </div>







                        </div>
                    </div>
                    <div className="modal-footer flex-center">

                        <button type="reset" id="kt_modal_add_customer_cancel" className="btn btn-light me-3">Discard</button>

                        <button
                            type="submit"
                            id="kt_modal_add_customer_submit"
                            className="btn btn-primary"
                            disabled={formik.isSubmitting || !formik.isValid}

                        >
                            {!loading && <span className='indicator-label'>Submit</span>}
                            {loading && (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                    Please wait...{' '}
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export { CreateUserModal }