import axios from 'axios';
import {API_URL} from '../env';

export const instance = axios.create({baseURL: API_URL});
