import { SetStateAction, useEffect, useState } from 'react';
import { AsyncPaginate } from "react-select-async-paginate";
import "react-datetime/css/react-datetime.css";
import * as Yup from 'yup'
import { ErrorMessage, Field, FieldArray, FormikErrors, FormikProvider, useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import Select from "react-select";

import 'moment/locale/en-in'
import { addCourier, getUsers } from '../services/CourierService';
import Datetime from 'react-datetime';



const courierSchema = Yup.object().shape({

    packages: Yup.array().of(
        Yup.object().shape({
            description: Yup.string()
                .required('description is required'),
            scale: Yup.string()
                .required('dscale is required'),
            length: Yup.string()
                .required('length is required'),
            width: Yup.string()
                .required('width is required'),
            height: Yup.string()
                .required('height is required'),
            volumenWeight: Yup.string()
                .required('volumenWeight is required'),
            actualWeight: Yup.string()
                .required('actualWeight is required'),
            finallWeight: Yup.string()
                .required('finallWeight is required'),
            qty: Yup.string()
                .required('qty is required'),
            value: Yup.string()
                .required('value is required'),
            totalValue: Yup.string()
                .required('totalValue is required'),

        })
    )

})

const initialValues = {
    // branch: '',
    // client: '',
    packages: [{
        description: '',
        scale: '',
        length: '',
        width: '',
        height: '',
        volumenWeight: '',
        actualWeight: '',
        finallWeight: '',
        qty: '',
        value: '',
        totalValue: '',
    }]
}


interface IPackages {
    description: '',
    scale: 0,
    length: 0,
    width: 0,
    height: 0,
    volumenWeight: 0,
    actualWeight: 0,
    finallWeight: 0,
    qty: 0,
    value: 0,
    totalValue: 0,
}

console.log('render')

const AddCourierPage = () => {

    const [total, setTotal] = useState(0);


    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues,
        validationSchema: courierSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            setLoading(true)
            setTimeout(() => {
                addCourier(values)
                    .then(({ data: { data } }) => {
                        setLoading(false)
                        setSubmitting(false)

                    })
                    .catch(() => {
                        setLoading(false)
                        setSubmitting(false)
                        setStatus('The login detail is incorrect')
                    })
            }, 1000)
        },
    })



    const handleAddPackage = () => {

        const packages = [...formik.values.packages];

        packages.push({
            description: '',
            scale: '',
            length: '',
            width: '',
            height: '',
            volumenWeight: '',
            actualWeight: '',
            finallWeight: '',
            qty: '',
            value: '',
            totalValue: '',
        });


        formik.setValues({ ...formik.values, packages });

    }




    const handleRemovePackage = (index: number) => {

        formik.setValues({
            ...formik.values, packages: formik.values.packages.filter(
                (item, i) => index !== i
            )
        });
    }





    return (
        <>
            {/* <!--begin::Layout--> */}
            <FormikProvider value={formik}>
                <form action="" id="kt_invoice_form" onSubmit={formik.handleSubmit}>



                    <div className="mt-5 d-flex flex-column flex-lg-row">
                        <div className="flex-lg-row-fluid mb-10 mb-lg-0 me-xl-10">
                            <div className="card">
                                <div className="card-body p-12">
                                    <div className="table-responsive mb-10">
                                        {/* g-5 gs-0 class add table */}
                                        <table className="table table-hover mb-0 fw-bolder text-gray-700" >
                                            <thead>
                                                <tr className="border-bottom fs-7 fw-bolder text-gray-700 ">
                                                    <th className="min-w-200px">Description</th>
                                                    <th className="min-w-200px">Scale</th>
                                                    <th className="min-w-100px">Length</th>
                                                    <th className="min-w-100px">Width</th>
                                                    <th className="min-w-100px">Height</th>
                                                    <th className="min-w-100px">Volumen weight</th>
                                                    <th className="min-w-100px">Actual weight</th>
                                                    <th className="min-w-100px">Final weight</th>
                                                    <th className="min-w-100px">Qty</th>
                                                    <th className="min-w-100px">Value</th>
                                                    <th className="min-w-100px">Total value</th>
                                                    <th className=""></th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    formik.values.packages &&
                                                    formik.values.packages.map((item, index) => {
                                                        console.log('calculate')
                                                        const ticketErrors = formik.errors.packages?.length && formik.errors.packages[index] as FormikErrors<IPackages> || {};

                                                        const ticketTouched = formik.touched.packages?.length && formik.touched.packages[index] || {};
                                                        const total: number = parseFloat(item.length) * parseFloat(item.width);
                                                        // setTotal(total);

                                                        console.log(total)

                                                        return (


                                                            <tr className="border-bottom border-bottom-dashed" key={index} >
                                                                <td className="pe-4">
                                                                    <Field
                                                                        type="text"

                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.description && ticketErrors.description },
                                                                            {
                                                                                'is-valid': ticketTouched.description && !ticketErrors.description,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.description`} placeholder="Description" />

                                                                    <ErrorMessage component="div" name={`packages.${index}.description`} />
                                                                </td>


                                                                <td className="pe-4">
                                                                    <Field
                                                                        component="select"
                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.scale && ticketErrors.scale },
                                                                            {
                                                                                'is-valid': ticketTouched.scale && !ticketErrors.scale,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.scale`} placeholder="scale"
                                                                    >

                                                                        <option value=''>Scale</option>
                                                                        <option value='0001'>Sucursal -0001</option>
                                                                        <option value='0002'>Sucursal -0002</option>
                                                                        <option value='0003'>Sucursal -0003</option>
                                                                    </Field>

                                                                    <ErrorMessage component="div" name={`packages.${index}.scale`} />

                                                                </td>



                                                                <td className="pe-4">
                                                                    <Field
                                                                        type="text"

                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.length && ticketErrors.length },
                                                                            {
                                                                                'is-valid': ticketTouched.length && !ticketErrors.length,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.length`} placeholder="length" />

                                                                    <ErrorMessage component="div" name={`packages.${index}.length`} />
                                                                </td>



                                                                <td className="pe-4">
                                                                    <Field
                                                                        type="text"
                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.width && ticketErrors.width },
                                                                            {
                                                                                'is-valid': ticketTouched.width && !ticketErrors.width,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.width`}
                                                                        placeholder="width" />

                                                                    <ErrorMessage component="div" name={`packages.${index}.width`} />
                                                                </td>


                                                                <td className="pe-4">
                                                                    <Field
                                                                        type="text"

                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.height && ticketErrors.height },
                                                                            {
                                                                                'is-valid': ticketTouched.height && !ticketErrors.height,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.height`} placeholder="height" />

                                                                    <ErrorMessage component="div" name={`packages.${index}.height`} />
                                                                </td>


                                                                <td className="pe-4">
                                                                    <Field
                                                                        type="text"

                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.volumenWeight && ticketErrors.volumenWeight },
                                                                            {
                                                                                'is-valid': ticketTouched.volumenWeight && !ticketErrors.volumenWeight,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.volumenWeight`} placeholder="volumenWeight" />

                                                                    <ErrorMessage component="div" name={`packages.${index}.volumenWeight`} />
                                                                </td>


                                                                <td className="pe-4">
                                                                    <Field
                                                                        type="text"

                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.actualWeight && ticketErrors.actualWeight },
                                                                            {
                                                                                'is-valid': ticketTouched.actualWeight && !ticketErrors.actualWeight,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.actualWeight`} placeholder="actualWeight" />

                                                                    <ErrorMessage component="div" name={`packages.${index}.actualWeight`} />
                                                                </td>

                                                                <td className="pe-4">
                                                                    <Field
                                                                        type="text"

                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.finallWeight && ticketErrors.finallWeight },
                                                                            {
                                                                                'is-valid': ticketTouched.finallWeight && !ticketErrors.finallWeight,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.finallWeight`} placeholder="finallWeight" />

                                                                    <ErrorMessage component="div" name={`packages.${index}.finallWeight`} />
                                                                </td>



                                                                <td className="pe-4">
                                                                    <Field
                                                                        type="text"

                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.qty && ticketErrors.qty },
                                                                            {
                                                                                'is-valid': ticketTouched.qty && !ticketErrors.qty,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.qty`} placeholder="qty" />

                                                                    <ErrorMessage component="div" name={`packages.${index}.qty`} />
                                                                </td>


                                                                <td className="pe-4">
                                                                    <Field
                                                                        type="text"

                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.value && ticketErrors.value },
                                                                            {
                                                                                'is-valid': ticketTouched.value && !ticketErrors.value,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.value`} placeholder="value" />

                                                                    <ErrorMessage component="div" name={`packages.${index}.value`} />
                                                                </td>

                                                                <td className="pe-4">
                                                                    <Field
                                                                        type="text"

                                                                        className={clsx(
                                                                            'form-control',
                                                                            { 'is-invalid': ticketTouched.totalValue && ticketErrors.totalValue },
                                                                            {
                                                                                'is-valid': ticketTouched.totalValue && !ticketErrors.totalValue,
                                                                            }
                                                                        )}

                                                                        name={`packages.${index}.totalValue`} placeholder="totalValue" />

                                                                    <ErrorMessage component="div" name={`packages.${index}.totalValue`} />
                                                                </td>


                                                                <td className="pt-5 text-end">
                                                                    {
                                                                        index ?
                                                                            <button type="button" className="btn btn-sm btn-icon btn-active-color-primary" onClick={() => handleRemovePackage(index)} >
                                                                                <span className="svg-icon svg-icon-3">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                                        <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black" />
                                                                                        <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black" />
                                                                                        <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black" />
                                                                                    </svg>
                                                                                </span>
                                                                            </button>
                                                                            : null
                                                                    }
                                                                </td>
                                                            </tr>



                                                        )
                                                    })
                                                }


                                            </tbody>
                                            <tfoot>
                                                <tr className="text-gray-700">
                                                    <th colSpan={7}>
                                                        <button type="button" className="btn btn-link py-1" onClick={() => handleAddPackage()}>Add item</button>
                                                    </th>

                                                    <th colSpan={3} className="fs-5 ">Subtotal</th>


                                                    <th colSpan={2} className=" fs-5 text-nowrap">
                                                        $ <span>0.00</span>
                                                    </th>
                                                </tr>

                                                <tr className=" text-gray-700">
                                                    <th colSpan={7}></th>
                                                    <th colSpan={3} className="fs-4 ">Total</th>
                                                    <th colSpan={2} className=" fs-4 text-nowrap">
                                                        $ <span>{total}</span>
                                                    </th>
                                                </tr>
                                            </tfoot>
                                        </table>

                                    </div>
                                    <div className="col-md-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100"
                                            disabled={formik.isSubmitting || !formik.isValid}
                                        >
                                            {!loading && <span className='indicator-label'>Continue</span>}
                                            {loading && (
                                                <span className='indicator-progress' style={{ display: 'block' }}>
                                                    Please wait...
                                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                                </span>
                                            )}


                                        </button>

                                    </div>
                                </div>

                            </div>

                        </div>


                    </div>

                </form>
            </FormikProvider>
        </>
    );
}

export default AddCourierPage;

