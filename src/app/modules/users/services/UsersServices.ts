import axios from 'axios'
// import { UserModel } from '../models/UserModel'

const API_URL = process.env.REACT_APP_API_URL

// export const GET_USERS_URL = `${API_URL}/users`
// export const CREATE_USERS_URL = `${API_URL}/users/register`
// export const CREATE_USERS_URL = `${API_URL}/users/register`

export const USERS_URL = `${API_URL}/users`


export function getUsers(page: number, search: string) {
    console.log('get users service..........')
    return axios.get(`${USERS_URL}?filter[search]=${search}&page[number]=${page}`)
}


export function createUser(email: string, fullname: string, password: string) {
    return axios.post(USERS_URL, {
        email,
        fullname,
        password,
    })
}


export function deleteUser(id: string | number) {
    return axios.delete(`${USERS_URL}/${id}`)
}
