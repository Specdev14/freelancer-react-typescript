import { useEffect, useState, useRef } from "react";
import { Avatar, ButtonBase, Chip, Stack, Typography } from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import StarIcon from '@mui/icons-material/Star';
import { Box } from "@mui/system"
import dayjs from 'dayjs';
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getRecommendedFreelancersAction } from "../../../redux/freelancer/freelancerActions";
import { useSnackbar } from "notistack";
import { FREELANCER_REQ_TYPES, FUNCTION_TYPES } from "../../../redux/constants";
import { profileImageDownload } from "../../../redux/profile/profileActions";
import { useNavigate } from "../../../routes/Router";
import Autoplay from "embla-carousel-autoplay";

const RecentlyJoinedSection = () => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const { recentlyJoinedFreelancer } = useAppSelector(state => state.freelancer);
    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        if (!recentlyJoinedFreelancer) {
            setBackdrop(true);
            dispatch(getRecommendedFreelancersAction({ req_type: FREELANCER_REQ_TYPES.FREELANCER_RECENTLY, page_size: 20 })).then((res) => {
                if (!res.payload.success) {
                    enqueueSnackbar(res.payload.message);
                }
            }).then((err: any) => {
                enqueueSnackbar(err.payload.message);
            }).finally(() => {
                setBackdrop(false)
            })
        }
    }, [dispatch, enqueueSnackbar, recentlyJoinedFreelancer]);

    const autoplay = useRef(
        Autoplay(
            { delay: 3000, stopOnInteraction: false },
            //@ts-ignore
            (emblaRoot: any) => emblaRoot.parentElement
        )
    );

    const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true, containScroll: 'trimSnaps' }, [autoplay.current]);

    return (
        <Box className="home-recently-joind-container">
            <Typography className="home-section-title" style={{ textAlign: 'center', marginBottom: '95px' }}>
                {t('homepage.recently-joined')}
            </Typography>
            <Box className="home-recently-joind-list">
                <div className="embla">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {!backdrop && recentlyJoinedFreelancer && recentlyJoinedFreelancer.records ?
                                recentlyJoinedFreelancer.records.map((record: any, index: number) => {
                                    return <div className="embla__slide" key={index}>
                                        <ButtonBase className="button-base-profile">
                                            <RecentlyJoinedProfileContainer {...record} />
                                        </ButtonBase>
                                    </div>
                                })
                                :
                                [...new Array(5)].map((record: any, index: number) => {
                                    return <div className="embla__slide" key={index}>
                                        <RecentlyJoinedProfileSkeleton {...record} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
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
    username
}: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [userAvatar, setUserAvatar] = useState<any>(null);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loadingProfile, setLoadingProfile] = useState(false);

    useEffect(() => {
        if (avatar_file_name && !userAvatar && !loadingAvatar) {
            setLoadingAvatar(true)
            dispatch(profileImageDownload({ functionType: FUNCTION_TYPES.USER_AVATAR, fileName: avatar_file_name })).then((res: any) => {
                if (res.payload.success) {
                    setUserAvatar(URL.createObjectURL(res.payload.file))
                }
            }).catch(() => { })
                .finally(() => {
                    setLoadingAvatar(false);
                })
        }
    }, [dispatch, loadingAvatar, avatar_file_name, userAvatar])

    useEffect(() => {
        if (profile_file_name && !userProfile && !loadingProfile) {
            setLoadingProfile(true)
            dispatch(profileImageDownload({ functionType: FUNCTION_TYPES.USER_PROFILE, fileName: profile_file_name })).then((res: any) => {
                if (res.payload.success) {
                    setUserProfile(URL.createObjectURL(res.payload.file))
                }
            }).catch(() => { })
                .finally(() => {
                    setLoadingProfile(false);
                })
        }
    }, [dispatch, loadingProfile, profile_file_name, userProfile])

    return (
        <Box
            className="home-recently-joined-profile-box"
            onClick={() => {
                navigate(`/${username}`)
            }}
        >
            <Box style={{ marginBottom: -27 }}>
                <Box className="home-recently-joined-profile-image-box">
                    {userProfile ?
                        <img className='home-recently-joined-profile-image' alt="profile_image" src={userProfile} />
                        :
                        <img className='home-recently-joined-profile-image' alt="profile_image" src="/images/profile-placeholder.png" />
                    }
                </Box>
                <Box style={{ display: 'flex' }}>
                    <Box className="home-recently-joined-avatar-image-box">
                        {userAvatar ?
                            <Avatar className='home-recently-joined-avatar-image' alt="avatar_image" src={userAvatar} />
                            :
                            <Avatar className='home-recently-joined-avatar-image' alt="avatar_image" src="/images/avatar-placeholder.png" />
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
                    <div>
                        <LocationOnIcon className="profile-location-icon" />
                        {location}
                    </div>
                    <div>
                        <StarIcon className="profile-star-icon" />
                        {star_rating?.toPrecision(2)}
                    </div>
                    <div>
                        <DateRangeIcon className="profile-date-icon" />
                        {dayjs(join_time).format('YYYY-MM-DD')}
                    </div>
                </Box>
                <Box className={`home-recently-joined-about ${about ? '' : 'no-about-style'}`}>
                    {about ? about : t('homepage.default-description')}
                </Box>
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
                        {skills?.slice(0, 2)?.map((skill: any, index: number) => {
                            return (
                                <Chip className="freelancer-skill-chip" key={index} label={skill.skill_name} variant="outlined" />
                            )
                        })}
                    </Stack>
                    {skills.length > 2 ?
                        <div className="freelancer-skill-chip-extra">
                            {`+ ${skills.length - skills?.slice(0, 2)?.length}`}
                        </div>
                        :
                        ''
                    }
                </Box>
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
                    <div className="skeleton chip"></div>
                    <div className="skeleton chip"></div>
                </Box>
            </Box>
        </Box>
    )
}

export default RecentlyJoinedSection;