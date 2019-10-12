import { useReducer } from "react";
import reducer, { initialState } from "./reducer";
import { fetching, success, error } from "./actionTypes";

function useHttpRequest(axios) {
    const [state, dispatch] = useReducer(reducer, initialState);
    if (!axios || !axios.request) {
        error('No axios request');
    }

    const httpRequest = async () => {
        dispatch(fetching());
        try {
            const response = await axios.request()
            dispatch(success(response));
            axios.onSuccess && axios.onSuccess(response);
        } catch (e) {
            dispatch(error(e));
            axios.onError && axios.onError(e)
        }
    };
    return [state, httpRequest];
}

export default useHttpRequest;