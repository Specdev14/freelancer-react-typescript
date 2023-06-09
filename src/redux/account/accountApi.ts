import { apiCall } from "../apiCall";
import { ChangePasswordInterface, ChangeEmailInterface, DeleteRecoveryEmailInterface } from "./accountActions";

export const changePassword = (data: ChangePasswordInterface) => {
    const requestOptions: RequestInit = {
        method: 'PUT',
        body: JSON.stringify(data)
    };
    return apiCall(`/user/v1/change-password`, requestOptions, true);
}

export const changePrimaryEmail = (data: ChangeEmailInterface) => {
    const requestOptions: RequestInit = {
        method: 'PUT',
        body: JSON.stringify(data)
    };
    return apiCall(`/user/v1/primary-email`, requestOptions, true);
}

export const changeRecoveryEmail = (data: ChangeEmailInterface) => {
    const requestOptions: RequestInit = {
        method: 'PUT',
        body: JSON.stringify(data)
    };
    return apiCall(`/user/v1/recovery-email`, requestOptions, true);
}

export const deleteRecoveryEmail = (data: DeleteRecoveryEmailInterface) => {
    const requestOptions: RequestInit = {
        method: 'DELETE',
        body: JSON.stringify(data)
    };
    return apiCall(`/user/v1/recovery-email`, requestOptions, true);
}

export const setTokens = (data: any) => {
    const dataToSave = { ...data };
    delete dataToSave.language;
    localStorage.setItem('user-info', JSON.stringify(dataToSave));
}

export const removeTokens = (doRefresh: boolean = false) => {
    localStorage.removeItem('user-info')
    if (doRefresh) {
        window.location.reload();
    }
}

export const getuserDataFromStorage = () => {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
        try {
            const parseData = JSON.parse(userInfo);
            return parseData;
        } catch (err) {
            return null;
        }
    }
}

export const refreshToken = (error?: any, previous: boolean = false) => {
    const userData = getuserDataFromStorage();

    if (!userData) {
        return Promise.reject(error)
    }

    const requestConfigs: any = {
        method: 'post',
        headers: {
            'refresh-token': userData['refresh_token']
        }
    };

    return apiCall(`/user/v1/refresh-token`, requestConfigs, true).then(response => {
        if (response.success) {
            setTokens(response.data);
            if (previous && error) {
                const { config } = error.response;
                return apiCall(config.url, {
                    method: config.method,
                    body: config.data,
                    headers: config.headers
                } as any);
            } else {
                return Promise.resolve(response);
            }
        } else {
            removeTokens(previous);
            return Promise.reject(error);
        }
    }).catch(error => {
        removeTokens(previous);
        return Promise.reject(error);
    })
}; 
