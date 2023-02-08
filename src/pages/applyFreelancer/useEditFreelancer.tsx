import { useSnackbar } from 'notistack';
import { useAppDispatch } from '../../redux/hooks';
import { editFreelancerProfileAction } from '../../redux/profile/profileActions';

export function useEditFreelancer() {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    return (data: any) => {
        return new Promise((resolve, reject) => {
            dispatch(editFreelancerProfileAction(data)).then((res) => {
                if (res.payload && res.payload.success) {
                    const freelancerApplicationInfo = sessionStorage.getItem('freelancer-application-info') ? JSON.parse(`${sessionStorage.getItem('freelancer-application-info')}`) : {};
                    sessionStorage.setItem('freelancer-application-info', JSON.stringify({ ...freelancerApplicationInfo, ...data }))
                    resolve(true);
                } else {
                    if (res.payload.error && res.payload.error === 'NAME_UNABLE_MODIFY') {
                        resolve(true);
                    } else {
                        reject(res);
                    }
                    enqueueSnackbar(res.payload.message);
                }
            }).catch((err) => {
                enqueueSnackbar(err.message);
                reject(err);
            })
        })
    }
}