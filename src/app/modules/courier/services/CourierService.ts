import axios from 'axios'
import { object } from 'yup/lib/locale'

const API_URL = process.env.REACT_APP_API_URL

export const USERS_URL = `${API_URL}/users`


export function getUsers(page: number, search: string) {
    console.log('get users service..........')
    return axios.get(`${USERS_URL}?filter[search]=${search}&page[number]=${page}&page[size]=75`)
}


export function addCourier(values: object) {

    console.log(values)
    return axios.get(`${USERS_URL}`)
}


