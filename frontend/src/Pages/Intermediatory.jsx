import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login, reset } from '../app/store';

const Intermediatory = () => {

    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get("code")

    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            window.location.href = ('/');
        }
        dispatch(reset());
    }, [isError, isSuccess, user, dispatch]);

    useEffect(() => {
        async function fetchAccessToken() {
            const response = await axios.post('https://aais-kitchen-backend.onrender.com/api/users/getGoogleAuthCode', { code })
            return response.data;
        }
        fetchAccessToken().then((res) => { dispatch(login(res)) }).catch((e) => { toast.error(e.message); window.location.href = '/' })
    }, [])

    return (
        <div>

        </div>
    )
}

export default Intermediatory
