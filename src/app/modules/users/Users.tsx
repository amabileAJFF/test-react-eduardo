import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import MoonLoader from "react-spinners/MoonLoader";
import ReactPaginate from "react-paginate";


import { deleteUser, getUsers } from './services/UsersServices';
import { CreateUserModal } from './components/CreateUserModal';
// import { AlertConfirm, AlertMessage } from '../helpers/CustomAlerts';

interface userList {
    id: string | number,
    email: string
    name: string,
}

interface metaData {
    last_page: number,
    from: number,
    to: number,
    total: number,
}


const Users = () => {

    const [show, setShow] = useState(false);
    const [users, setUsers] = useState<userList[] | null>([]);

    const [meta, setMeta] = useState<metaData>({
        last_page: 0,
        from: 0,
        to: 0,
        total: 0,
    });
    const { last_page, from, to, total } = meta;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');


    useEffect(() => {
        fetchSearchResults();


    }, [currentPage, search]);

    const fetchSearchResults = async () => {
        console.log("on data")
        setLoading(true);
        try {
            const { data } = await getUsers(currentPage, search);
            setUsers(data.data);
            setMeta(data.meta);
            setError(null);
        } catch (e: any) {
            setUsers(null);
            setError(e.response.data.message);
            console.log(e.response.data.message)

        }
        setLoading(false);
    }


    const handleDeleteUser = (id: string | number) => {

        // AlertConfirm()
        //     .then((result) => {
        //         if (result.isConfirmed) {
        //             deleteUser(id)
        //                 .then((data) => {
        //                     fetchSearchResults();
        //                     AlertMessage('User delete', 'success', 'User delete successfully');
        //                 })
        //                 .catch((e) => {
        //                     AlertMessage('User delete', 'error', 'delete process has broken ')
        //                 })
        //         }
        //     })
    }


    const handleInputChange = debounce((text) => {

        // if (text.trim() != '') {
        setSearch(text)
        // }

    }, 500)




    const handleOnPageChange = debounce(({ selected }) => {

        setCurrentPage(selected + 1);

    }, 350);

    const handleShow = () => setShow(!show);


    return (
        <>
            <div className="card">
                <div className="card-header border-0 pt-6">
                    <div className="card-title">
                        <div className="d-flex align-items-center position-relative my-1">
                            <span className="svg-icon svg-icon-1 position-absolute ms-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black" />
                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                data-kt-customer-table-filter="search"
                                className="form-control form-control-solid w-250px ps-15"
                                placeholder="Search Users"
                                onChange={(e) => handleInputChange(e.target.value)} />
                        </div>
                    </div>
                    <MoonLoader color={"#009ef7"} loading={loading} size={33} />
                    <div className="card-toolbar">
                        <div className="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
                            <button type="button" className="btn btn-light-primary me-3" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                <span className="svg-icon svg-icon-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="black" />
                                    </svg>
                                </span>
                                Filter</button>
                            <div className="menu menu-sub menu-sub-dropdown w-300px w-md-325px" data-kt-menu="true" id="kt-toolbar-filter">
                                <div className="px-7 py-5">
                                    <div className="fs-4 text-dark fw-bolder">Filter Options</div>
                                </div>

                                <div className="separator border-gray-200"></div>

                                <div className="px-7 py-5">

                                    <div className="mb-10">

                                        <label className="form-label fs-5 fw-bold mb-3">Month:</label>


                                        <select className="form-select form-select-solid fw-bolder" data-kt-select2="true" data-placeholder="Select option" data-allow-clear="true" data-kt-customer-table-filter="month" data-dropdown-parent="#kt-toolbar-filter">
                                            <option></option>
                                            <option value="aug">August</option>
                                            <option value="sep">September</option>
                                            <option value="oct">October</option>
                                            <option value="nov">November</option>
                                            <option value="dec">December</option>
                                        </select>

                                    </div>


                                    <div className="mb-10">

                                        <label className="form-label fs-5 fw-bold mb-3">Payment Type:</label>


                                        <div className="d-flex flex-column flex-wrap fw-bold" data-kt-customer-table-filter="payment_type">

                                            <label className="form-check form-check-sm form-check-custom form-check-solid mb-3 me-5">
                                                <input className="form-check-input" type="radio" name="payment_type" value="all" />
                                                <span className="form-check-label text-gray-600">All</span>
                                            </label>


                                            <label className="form-check form-check-sm form-check-custom form-check-solid mb-3 me-5">
                                                <input className="form-check-input" type="radio" name="payment_type" value="visa" />
                                                <span className="form-check-label text-gray-600">Visa</span>
                                            </label>


                                            <label className="form-check form-check-sm form-check-custom form-check-solid mb-3">
                                                <input className="form-check-input" type="radio" name="payment_type" value="mastercard" />
                                                <span className="form-check-label text-gray-600">Mastercard</span>
                                            </label>


                                            <label className="form-check form-check-sm form-check-custom form-check-solid">
                                                <input className="form-check-input" type="radio" name="payment_type" value="american_express" />
                                                <span className="form-check-label text-gray-600">American Express</span>
                                            </label>

                                        </div>

                                    </div>


                                    <div className="d-flex justify-content-end">
                                        <button type="reset" className="btn btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true" data-kt-customer-table-filter="reset">Reset</button>
                                        <button type="submit" className="btn btn-primary" data-kt-menu-dismiss="true" data-kt-customer-table-filter="filter">Apply</button>
                                    </div>

                                </div>
                            </div>
                            {/* <button type="button" className="btn btn-light-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_customers_export_modal">
                                <span className="svg-icon svg-icon-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="black" />
                                        <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="black" />
                                        <path d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="#C4C4C4" />
                                    </svg>
                                </span>
                                Export</button> */}
                            <button type="button" className="btn btn-primary" onClick={handleShow}>Add User</button>
                        </div>
                        {/* <div className="d-flex justify-content-end align-items-center d-none" data-kt-customer-table-toolbar="selected">
                            <div className="fw-bolder me-5">
                                <span className="me-2" data-kt-customer-table-select="selected_count"></span>Selected</div>
                            <button type="button" className="btn btn-danger" data-kt-customer-table-select="delete_selected">Delete Selected</button>
                        </div> */}
                    </div>
                </div>
                <div className="card-body pt-0">
                    <div className="table-responsive">
                        <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_customers_table">
                            <thead>
                                <tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                                    {/* <th className="w-10px pe-2">
                                        <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                                            <input className="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_customers_table .form-check-input" value="1" />
                                        </div>
                                    </th> */}
                                    <th className="min-w-125px">Customer Name</th>
                                    <th className="min-w-125px">Email</th>
                                    <th className="min-w-125px">Created Date</th>
                                    <th className="text-end min-w-70px">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="fw-bold text-gray-600">

                                {
                                    users &&
                                    users.map((user, index) => (


                                        <tr key={index}>

                                            {/* <td>
                                                <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                    <input className="form-check-input" type="checkbox" />
                                                </div>
                                            </td> */}


                                            <td>
                                                <a href="#" className="text-gray-800 text-hover-primary mb-1">{user.name}</a>
                                            </td>


                                            <td>
                                                <a href="#" className="text-gray-600 text-hover-primary mb-1">{user.email}</a>
                                            </td>






                                            <td>01 Dec 2020, 10:12 am</td>


                                            <td className="text-end">
                                                <a href="#" className="btn btn-sm btn-light btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
                                                    <span className="svg-icon svg-icon-5 m-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black" />
                                                        </svg>
                                                    </span>
                                                </a>

                                                <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">

                                                    <div className="menu-item px-3">
                                                        <a href="#" className="menu-link px-3">View</a>
                                                    </div>


                                                    <div className="menu-item px-3">
                                                        <a href="#" onClick={() => handleDeleteUser(user.id)} className="menu-link px-3" data-kt-customer-table-filter="delete_row">Delete</a>
                                                    </div>

                                                </div>

                                            </td>

                                        </tr>
                                    ))
                                }
                                {users?.length == 0 ?

                                    <tr>
                                        <td valign="top" colSpan={7} className="text-center">
                                            No matching records found
                                        </td>
                                    </tr>


                                    : null}


                            </tbody>

                        </table>
                    </div>
                    {users?.length ?
                        <div className="row">
                            <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">

                                Mostrando resultados desde {from} al {to} de {total} registros.
                            </div>
                            <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                                {last_page > 1 ?
                                    <ReactPaginate
                                        pageCount={last_page}
                                        onPageChange={handleOnPageChange}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={5}
                                        containerClassName={'pagination'}

                                        previousLabel={'<'}
                                        previousClassName={'page-item previous'}
                                        previousLinkClassName={'page-link'}


                                        activeClassName={'active'}
                                        pageLinkClassName={'page-link'}

                                        nextLabel={'>'}
                                        nextClassName={'page-item next'}
                                        nextLinkClassName={'page-link'}
                                        pageClassName={'page-item'}

                                        disabledClassName={'disabled'}
                                    />
                                    : null}
                            </div>
                        </div>
                        : null}

                </div>





            </div>

            <CreateUserModal
                show={show}
                handleShow={handleShow}
                fetchSearchResults={fetchSearchResults}
            />

        </>
    );
}

export default Users;

