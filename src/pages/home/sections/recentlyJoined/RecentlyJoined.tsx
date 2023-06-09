import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Avatar, ButtonBase, Chip, Stack, Typography } from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import StarIcon from '@mui/icons-material/Star';
import { Box } from "@mui/system"
import dayjs from 'dayjs';
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getRecommendedFreelancersAction } from "../../../../redux/freelancer/freelancerActions";
import { useSnackbar } from "notistack";
import { FREELANCER_REQ_TYPES, FUNCTION_TYPES, ONLINE_STATUS } from "../../../../redux/constants";
import { profileImageDownload } from "../../../../redux/profile/profileActions";
import { useNavigate } from "../../../../routes/Router";
import './recentlyJoined.css';
import { addRecentlyJoinedPhotoToCache } from "../../../../redux/freelancer/freelancerSlice";
import Marquee from 'react-fast-marquee';

const RecentlyJoinedSection = () => {
    const { t, i18n } = useTranslation();
    const { language } = useAppSelector(state => state.resources)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const { recentlyJoinedFreelancer } = useAppSelector(state => state.freelancer);
    const [backdrop, setBackdrop] = useState(false);

    const callApi = useCallback(() => {
        setBackdrop(true);
        dispatch(getRecommendedFreelancersAction({ req_type: FREELANCER_REQ_TYPES.FREELANCER_RECENTLY, page_size: 20 })).then((res: any) => {
            if (res.payload?.success) {
            } else {
                enqueueSnackbar(res.payload.message);
            }
        }).then((err: any) => {
            if (err) {
                enqueueSnackbar(err?.payload?.message);
            }
        }).finally(() => {
            setBackdrop(false)
        })
    }, [dispatch, enqueueSnackbar]);

    useEffect(() => {
        if (!recentlyJoinedFreelancer) {
            callApi();
        }
    }, [callApi, recentlyJoinedFreelancer]);

    useEffect(() => {
        if (recentlyJoinedFreelancer) {
            if (language && i18n.language && i18n.language !== language) {
                callApi();
            }
        }
    }, [i18n, language, recentlyJoinedFreelancer, callApi])

    useLayoutEffect(() => {
        if (recentlyJoinedFreelancer && recentlyJoinedFreelancer.records) {
            const totalElements = recentlyJoinedFreelancer.records?.length;
            const root = document.body;
            const marqueeWidth = window.innerWidth;
            const elementsToBeAppended = Math.ceil(marqueeWidth / 396);
            root.style.setProperty('--total-elements', `${totalElements}`);
            root.style.setProperty('--elements-to-be-appended', `${elementsToBeAppended}`)
        }
    }, [recentlyJoinedFreelancer])

    return (
        <Box className="home-recently-joind-container">
            <Typography className="home-section-title" style={{ textAlign: 'center', marginBottom: '95px' }}>
                {t('homepage.recently-joined')}
            </Typography>
            <Box className="home-recently-joind-list">

                <Marquee speed={80} pauseOnHover={true} gradient={false}>
                    <div className="recently-profile-animation">
                        {!backdrop && recentlyJoinedFreelancer && recentlyJoinedFreelancer.records ?
                            recentlyJoinedFreelancer?.records.map((record: any, index: number) => {
                                return (<ButtonBase key={index} className="button-base-profile">
                                    <RecentlyJoinedProfileContainer {...record} index={index} />
                                </ButtonBase>)
                            })
                            :
                            [...new Array(5 + Math.ceil(window.innerWidth / 378))].map((record: any, index: number) => {
                                return <RecentlyJoinedProfileSkeleton {...record} key={index} />
                            })
                        }
                    </div>
                </Marquee>
            </Box>
        </Box>
    )
}

const RecentlyJoinedProfileContainer = ({
    avatar_file_name,
    identity_status,
    profile_file_name,
    join_time,
    location,
    name,
    about,
    skills,
    star_rating,
    username,
    online_status
}: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { recentlyJoinedPhotosCache } = useAppSelector(state => state.freelancer);

    useEffect(() => {
        if (avatar_file_name && !recentlyJoinedPhotosCache[avatar_file_name]) {
            dispatch(addRecentlyJoinedPhotoToCache({ name: avatar_file_name, data: 'loading' }))
            dispatch(profileImageDownload({ functionType: FUNCTION_TYPES.USER_AVATAR, fileName: avatar_file_name })).then((res: any) => {
                if (res.payload.success) {
                    dispatch(addRecentlyJoinedPhotoToCache({ name: avatar_file_name, data: URL.createObjectURL(res.payload.file) }))
                }
            }).catch(() => {
                dispatch(addRecentlyJoinedPhotoToCache({ name: avatar_file_name, data: undefined }))
            })
        }
    }, [dispatch, avatar_file_name, recentlyJoinedPhotosCache])

    useEffect(() => {
        if (profile_file_name && !recentlyJoinedPhotosCache[profile_file_name]) {
            dispatch(addRecentlyJoinedPhotoToCache({ name: profile_file_name, data: 'loading' }))
            dispatch(profileImageDownload({ functionType: FUNCTION_TYPES.USER_PROFILE, fileName: profile_file_name })).then((res: any) => {
                if (res.payload.success) {
                    dispatch(addRecentlyJoinedPhotoToCache({ name: profile_file_name, data: URL.createObjectURL(res.payload.file) }))
                }
            }).catch(() => {
                dispatch(addRecentlyJoinedPhotoToCache({ name: profile_file_name, data: undefined }))
            })
        }
    }, [dispatch, profile_file_name, recentlyJoinedPhotosCache])

    return (
        <Box
            className="home-recently-joined-profile-box"
            onClick={() => {
                navigate(`/${username}`)
            }}
        >
            <Box style={{ height: 186 }}>
                <Box className="home-recently-joined-profile-image-box">
                    {recentlyJoinedPhotosCache[profile_file_name] && recentlyJoinedPhotosCache[profile_file_name] !== 'loading' ?
                        <img className='home-recently-joined-profile-image' alt="profile_image" src={recentlyJoinedPhotosCache[profile_file_name]} />
                        :
                        <img className='home-recently-joined-profile-image' alt="profile_image" src="/images/profile-placeholder.png" />
                    }
                </Box>
                <Box style={{ display: 'flex' }}>
                    <Box className="home-recently-joined-avatar-image-box">
                        {recentlyJoinedPhotosCache[avatar_file_name] && recentlyJoinedPhotosCache[avatar_file_name] !== 'loading' ?
                            <Avatar className='home-recently-joined-avatar-image' alt="avatar_image" src={recentlyJoinedPhotosCache[avatar_file_name]} />
                            :
                            <Avatar className='home-recently-joined-avatar-image' alt="avatar_image" src="/images/avatar-placeholder.png" />
                        }
                        {online_status === ONLINE_STATUS.ONLINE ?
                            <div className="home-recently-joined-online-status"></div>
                            :
                            ""
                        }
                    </Box>
                </Box>
            </Box>
            <Box className="home-recently-joined-user-details">
                <Box className="home-recently-joined-user-name">
                    {name}
                    {identity_status === 'PASSED' && <VerifiedIcon className="home-recently-joined-user-verified-icon" />}
                </Box>
                <Box className="home-recently-joined-basic-details">
                    <div className="basic-details-wrapper">
                        <div className="basic-details-box">
                            <LocationOnIcon className="profile-location-icon" />
                            {location}
                        </div>
                        <div className="basic-details-box" style={{ marginLeft: -2 }}>
                            <StarIcon className="profile-star-icon" />
                            {star_rating?.toPrecision(2)}
                        </div>
                        <div className="basic-details-box">
                            <DateRangeIcon className="profile-date-icon" />
                            {dayjs(join_time).format('YYYY-MM-DD')}
                        </div>
                    </div>
                </Box>
            </Box>
            <Box className="home-recently-joined-bottom-wrapper">
                <Box className={`home-recently-joined-about-wrapper ${skills.length > 0 ? '' : 'no-skills-about'}`}>
                    <div className={`home-recently-joined-about`}>{about ? about : t('homepage.default-description')}</div>
                </Box>
                {skills.length > 0 ?
                    <Box className="home-recently-joined-skills">
                        <Stack
                            display={'flex'}
                            direction='row'
                            overflow={'hidden'}
                            flexWrap={'nowrap'}
                            gap={'10px'}
                            alignItems='flex-start'
                            spacing={1}
                            className="stack-skills-box"
                        >
                            {skills?.slice(0, 3)?.map((skill: any, index: number) => {
                                return (
                                    <Chip className="freelancer-skill-chip" key={index} label={skill.skill_name} variant="outlined" />
                                )
                            })}
                            {skills.length > 3 ?
                                <div className="freelancer-skill-chip-extra">
                                    {`+ ${skills.length - skills?.slice(0, 2)?.length}`}
                                </div>
                                :
                                ''
                            }
                        </Stack>
                    </Box>
                    :
                    ''
                }
            </Box>
        </Box>
    )
}

const RecentlyJoinedProfileSkeleton = () => {
    return (
        <Box className="home-recently-joined-profile-box">
            <Box style={{ marginBottom: -28 }}>
                <Box className="home-recently-joined-profile-image-box" style={{ height: '128px' }}>
                    <div className='home-recently-joined-profile-image skeleton' />
                </Box>
                <Box style={{ display: 'flex' }}>
                    <Box className="home-recently-joined-avatar-image-box">
                        <div className='home-recently-joined-avatar-image skeleton' />
                    </Box>
                </Box>
            </Box>
            <Box className="home-recently-joined-user-details">
                <Box className="home-recently-joined-user-name skeleton" style={{ color: 'transparent', width: '55%' }}>
                    Mask
                </Box>

                <Box className="home-recently-joined-basic-details">
                    <div>
                        <div className="skeleton basicDetailsContent">R</div>
                        <div className="skeleton basicDetailsContent">R</div>
                    </div>
                    <div>
                        <div className="skeleton basicDetailsContent">R</div>
                        <div className="skeleton basicDetailsContent">R</div>
                    </div>
                    <div>
                        <div className="skeleton basicDetailsContent">R</div>
                        <div className="skeleton basicDetailsContent">R</div>
                    </div>
                </Box>

                <Box className="home-recently-joined-about">
                    <div className="skeleton about" style={{ marginBottom: '4px' }}></div>
                    <div className="skeleton about"></div>
                </Box>

                <Box className="home-recently-joined-skills">
                    <div className="skeleton chip" style={{ marginLeft: 10 }}></div>
                    <div className="skeleton chip"></div>
                </Box>
            </Box>
        </Box>
    )
}

export default RecentlyJoinedSection;