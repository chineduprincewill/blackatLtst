import 'react-datetime/css/react-datetime.css';

import moment from 'moment-timezone';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import DateTime from 'react-datetime';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ProfileStageProps } from './ProfileStageProps';
import usePreventScroll from '@hooks/usePreventScroll';
import { UserInfoFromApi } from '../../api/authApi';
import {
    Education,
    Experience,
    IEducation,
    ISkillSet,
    useAddEducationMutation,
    useAddExperiencesMutation,
    useAddSkillSetMutation,
    useCreateProfileMutation,
    useGetEducationQuery,
    useGetExperienceQuery,
    useGetProfileMutation,
    UserProfile,
    useUpdateEducationMutation,
    useUpdateExperienceMutation,
    useUpdateProfileMutation,
    useUploadImageToCloudMutation,
} from '../../api/profileApi';
import { useGetProfileUploadLinkMutation, useGetUserDetailQuery, UserBasicInfo, useUpdateUserMutation } from '../../api/userApi';
import CircleClose from '../../assets/circle-close.png';
import CirclePlus from '../../assets/circle-plus.png';
import CloseButton from '../../assets/close.png';
import EducationIcon from '../../assets/education.png';
import GoogleIcon from '../../assets/google-main.png';
import ProfileIcon from '../../assets/profile-hd.png';
import UploadPic from '../../assets/upload-pic.png';
import VendorProfilePic from '../../assets/vendor-profile.png';
import { Circle } from '../../components/Circle';
import Spinner from '../../components/Spinner';
import { setUser } from '../../state/slices/authSlice';
import { toggleProfileFormModal } from '../../state/slices/profileSlice';
import { RootState } from '../../state/store';
import DateUtil from '../../utils/date';
import { NoRecord, ProfileBrief } from './';
import { cropImageFromCenter } from './cropImageFromCenter';
import useSingleMediaUpload from '@hooks/useSingleMediaUpload';
import { getMediaMetadata, transformSingleFileMetaToMediaContent } from '@utils/utils';
import { useDropzone } from 'react-dropzone';
import UploadPreview from '@components/UploadPreview/UploadPreview';
import CircularUploadPreview from '@components/UploadPreview/CircularUploadPreview';
import ClickOutsideWrapper from '@components/ClickOutWrapper';
import { useGetLoggedInUserInfoQuery } from '../../api/userApi';

const CURRENT_YEAR = new Date().getFullYear();

interface YearMonthDropdownProps {
    date: `${number}-${number}`;
    onChange: (year: number, month: number) => void;
}

function getClosestValidDate(firstDate: `${number}-${number}`, secondDate: `${number}-${number}`): `${number}-${number}` {
    // Date is if format YYYY-MM
    // Compare the year and month
    // if second date is greater than first date, return second date
    // return the closest date to the first date
    const [firstYear, firstMonth] = firstDate.split('-');
    const [secondYear, secondMonth] = secondDate.split('-');
    if (Number(secondYear) > Number(firstYear)) {
        // Check if second month is greater than first month
        if (Number(secondMonth) > Number(firstMonth)) {
            if (Number(secondMonth) === 12) {
                return `${Number(secondYear) + 1}-${1}`;
            }
        }
        return secondDate;
    } else if (Number(secondYear) === Number(firstYear)) {
        if (Number(secondMonth) > Number(firstMonth)) {
            return secondDate;
        }
    }

    return firstDate;
}

const YearMonthDropdown = ({ date, onChange }: YearMonthDropdownProps) => {
    const yearRange: number[] = Array.from({ length: 111 }, (_, index) => CURRENT_YEAR - index);
    const monthNames: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const parseDate = (dateString: string) => {
        const [year, month] = dateString.split('-');
        return { month: Number(month), year: Number(year) };
    };

    const { year: selectedYear, month: selectedMonth } = parseDate(date);
    return (
        <div id="date-month">
            <select
                className="month"
                value={selectedMonth}
                onChange={(e) => {
                    onChange(selectedYear, Number(e.target.value));
                }}
            >
                {monthNames.map((month, index) => (
                    <option key={index} value={index + 1}>
                        {month}
                    </option>
                ))}
            </select>
            <select
                className="year"
                value={selectedYear}
                onChange={(e) => {
                    onChange(Number(e.target.value), selectedMonth);
                }}
            >
                {yearRange.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

const EditExperienceItem = ({
    experience,
    onClick,
}: {
    experience: {
        role: string;
        company: string;
        employmentType: string;
        startDate: Date;
        endDate: Date | null;
        isCurrentWorkplace: boolean;
    };
    onClick: () => void;
}) => {
    return (
        <>
            <div className="flex-row centralize-y item profile-item-to-edit">
                <div className="img-section">
                    <Circle bg="#ECECEC" height={50} width={55} key={1} noMg borderColor="#d3d3d3" img={GoogleIcon} pd={3} />
                </div>
                <div className="exp-details">
                    <p className="text-base">
                        <span className="font-semibold">{experience.role}</span> - {experience.employmentType}
                    </p>
                    <p className="company !text-base">{experience.company}</p>
                    <p className="duration !text-xs">
                        {DateUtil.getYearFromISOString(experience.startDate.toString())}
                        {' - '}
                        {experience.endDate ? DateUtil.getYearFromISOString(experience.endDate.toString()) : 'Present'}
                    </p>
                </div>
                <div className="edit-item-btn">
                    <button onClick={onClick}>Edit</button>
                </div>
            </div>
        </>
    );
};
const EditExperiences = (
    props:
        | {
              experiences?: Experience[];
              setExperienceToUpdate: (experience: ExperienceForm) => void;
              mode: 'edit';
          }
        | {
              formProps: {
                  experienceToUpdate: Omit<ExperienceForm, 'id'>;
                  updateFormField: (field: keyof ExperienceForm, value: string | boolean) => void;
              };
              mode: 'create';
          },
) => {
    return (
        <>
            {props.mode === 'edit' ? (
                props.experiences && props.experiences.length !== 0 ? (
                    <div className="items-container">
                        {
                            <>
                                {props.experiences.map((experience, index) => (
                                    <EditExperienceItem
                                        experience={experience}
                                        key={index}
                                        onClick={() => {
                                            props.setExperienceToUpdate({
                                                role: experience.role,
                                                company: experience.company,
                                                employment_type: experience.employmentType,
                                                start_date: experience.startDate.toString(),
                                                end_date: experience.endDate?.toString() ?? '',
                                                about: '',
                                                currentWork: experience.isCurrentWorkplace,
                                                id: experience.id,
                                            } as ExperienceForm);
                                        }}
                                    />
                                ))}
                            </>
                        }
                    </div>
                ) : (
                    <NoRecord />
                )
            ) : (
                props.formProps && (
                    <>
                        <div className="bio form-input">
                            <label htmlFor="">Role</label>
                            <input
                                type="text"
                                placeholder="Ex: Sales Manager"
                                value={props.formProps.experienceToUpdate.role}
                                onChange={(e) => props.formProps.updateFormField('role', e.target.value)}
                            />
                        </div>
                        <div className="bio form-input">
                            <label htmlFor="">Company</label>
                            <input
                                type="text"
                                placeholder="Ex: BlackAt"
                                value={props.formProps.experienceToUpdate.company}
                                onChange={(e) => props.formProps.updateFormField('company', e.target.value)}
                            />
                        </div>
                        <div className="employment-type form-input">
                            {/* Dropdown to select employment type */}
                            <label htmlFor="dropdown">Employment type</label>
                            <select
                                id="dropdown"
                                value={props.formProps.experienceToUpdate.employment_type}
                                onChange={(e) => props.formProps.updateFormField('employment_type', e.target.value)}
                            >
                                <option value="-- Select --">-- Select --</option>
                                <option value="Full time">Full time</option>
                                <option value="Part time">Part time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                        <div className="flex-row date centralize-y">
                            <div className="start-date form-input" style={{ position: 'relative' }}>
                                <label htmlFor="">Start date</label>
                                <YearMonthDropdown
                                    date={props.formProps.experienceToUpdate.start_date as `${number}-${number}`}
                                    onChange={(year, month) => {
                                        props.formProps.updateFormField('start_date', `${year}-${month}-${1}`);
                                    }}
                                />
                            </div>
                            <div className="end-date form-input" style={{ position: 'relative' }}>
                                <label htmlFor="">End date</label>
                                <YearMonthDropdown
                                    date={props.formProps.experienceToUpdate.end_date as `${number}-${number}`}
                                    onChange={(year, month) => {
                                        props.formProps.updateFormField('end_date', `${year}-${month}-${1}`);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex-row current-work centralize-y">
                            <input
                                type="checkbox"
                                style={{
                                    marginRight: 10,
                                }}
                                checked={props.formProps.experienceToUpdate.currentWork}
                                onChange={(e) => props.formProps.updateFormField('currentWork', e.target.checked)}
                            />
                            <p style={{ fontSize: 12 }}>I currently work here</p>
                        </div>
                    </>
                )
            )}
        </>
    );
};
const EditPane = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="edit-item-container">{children}</div>
        </>
    );
};

const EditEducationItem = ({
    education,
    onClick,
}: {
    education: {
        school: string;
        degree: string;
        fieldOfStudy: string;
        startDate: Date;
        endDate: Date | null;
    };
    onClick: () => void;
}) => {
    let degreePlusFieldOfStudy = education.degree + ' - ' + education.fieldOfStudy;
    degreePlusFieldOfStudy = degreePlusFieldOfStudy.length > 20 ? degreePlusFieldOfStudy.slice(0, 20) + '...' : degreePlusFieldOfStudy;

    return (
        <>
            <div className="flex-row _education centralize-y item profile-item-to-edit">
                <div className="img-section">
                    <Circle bg="transparent" height={30} width={30} key={1} noMg borderColor="#d3d3d3" img={EducationIcon} pd={0} />
                </div>
                <div className="flex-row exp-details centralize-y">
                    <div className="det">
                        <p className="title degree">
                            <span>{degreePlusFieldOfStudy}</span>{' '}
                        </p>
                        <p className="school_name">{education.school}</p>
                    </div>
                    <p className="ed-duration">
                        {DateUtil.getYearFromISOString(education.startDate.toString())}
                        {' - '}
                        {education.endDate ? DateUtil.getYearFromISOString(education.endDate.toString()) : 'Present'}
                    </p>
                </div>
                <div className="flex-row edit-item-btn centralize-y">
                    <button onClick={onClick}>Edit</button>
                </div>
            </div>
        </>
    );
};
const EditEducations = (
    props:
        | {
              educations?: Education[];
              setEducationToUpdate: (education: EducationForm) => void;
              mode: 'edit';
          }
        | {
              formProps: {
                  educationToUpdate: Omit<EducationForm, 'id'>;
                  updateFormField: (field: keyof EducationForm, value: string) => void;
              };
              mode: 'create';
          },
) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.mode === 'edit' && props.educations?.length === 0) {
            // Go to create education
            dispatch(
                toggleProfileFormModal({
                    show: true,
                    modalType: 'create',
                    stageToStartFrom: 'education',
                }),
            );
        }
    }, [props, dispatch]);
    return (
        <>
            {props.mode === 'edit'
                ? props.educations &&
                  props.educations.length !== 0 && (
                      <div className="items-container">
                          {
                              <>
                                  {props.educations.map((education, index) => (
                                      <EditEducationItem
                                          education={education}
                                          key={index}
                                          onClick={() => {
                                              props.setEducationToUpdate({
                                                  school: education.school,
                                                  degree: education.degree,
                                                  field_of_study: education.fieldOfStudy,
                                                  start_date: education.startDate.toString(),
                                                  end_date: education.endDate?.toString() ?? '',
                                                  id: education.id,
                                              });
                                          }}
                                      />
                                  ))}
                              </>
                          }
                      </div>
                  )
                : props.formProps && (
                      <>
                          <div className="form">
                              <div className="school form-input">
                                  <label htmlFor="">School</label>
                                  <input
                                      type="text"
                                      placeholder="Ex: Design"
                                      value={props.formProps.educationToUpdate.school}
                                      onChange={(e) => props.formProps.updateFormField('school', e.target.value)}
                                  />
                              </div>
                              <div className="degree form-input">
                                  <label htmlFor="">Degree</label>
                                  <input
                                      type="text"
                                      placeholder="Ex: Bachelors of Science"
                                      value={props.formProps.educationToUpdate.degree}
                                      onChange={(e) => props.formProps.updateFormField('degree', e.target.value)}
                                  />
                              </div>
                              <div className="field-of-study form-input">
                                  <label htmlFor="">Field of study</label>
                                  <input
                                      type="text"
                                      placeholder="Enter your field of study"
                                      value={props.formProps.educationToUpdate.field_of_study}
                                      onChange={(e) => props.formProps.updateFormField('field_of_study', e.target.value)}
                                  />
                              </div>
                              <div className="flex-row date centralize-y">
                                  <div className="start-date form-input" style={{ position: 'relative' }}>
                                      <label htmlFor="">Start date</label>
                                      <DateTime
                                          onChange={(e) => props.formProps.updateFormField('start_date', e?.toString() ?? '')}
                                          closeOnSelect
                                          timeFormat={false}
                                          dateFormat="DD/MM/YYYY" // Adjust the date format as needed
                                      />
                                  </div>
                                  <div className="end-date form-input" style={{ position: 'relative' }}>
                                      <label htmlFor="">End date</label>
                                      <DateTime
                                          onChange={(e) => props.formProps.updateFormField('end_date', e?.toString() ?? '')}
                                          closeOnSelect
                                          timeFormat={false}
                                          dateFormat="DD/MM/YYYY" // Adjust the date format as needed
                                      />
                                  </div>
                              </div>
                          </div>
                      </>
                  )}
        </>
    );
};

interface FormState {
    firstName: string;
    lastName: string;
    bio: string;
    about: string;
    location: string;
}
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = {
    'image/jpeg': [],
    'image/png': [],
    'image/gif': [],
    'image/bmp': [],
    'image/tiff': [],
};

const CompleteProfileFormStage = (props: ProfileStageProps & { showProfileUploadFlow?: boolean }) => {
    const dispatch = useDispatch();
    const { data: loggedInUserData } = useGetLoggedInUserInfoQuery(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State Management
    const [formState, setFormState] = useState<FormState>({
        firstName: loggedInUserData?.data?.user.firstName ?? '',
        lastName: loggedInUserData?.data?.user.lastName ?? '',
        bio: loggedInUserData?.data?.user.profile.bio ?? '',
        about: loggedInUserData?.data?.user.profile.about ?? '',
        location: loggedInUserData?.data?.user.profile.location ?? '',
    });

    // UI State
    const [showProfilePicUploadFlow, setShowProfilePicUploadFlow] = useState(props.showProfileUploadFlow ?? false);
    const [formValid, setFormValid] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [displayImage, setDisplayImage] = useState<string>(props.user.displayImage || ProfileIcon);

    // API Mutations
    const [updateUserProfile, { isLoading: updateUserProfileIsLoading }] = useUpdateProfileMutation();
    const [updateUser, { isLoading: updateUserIsLoading }] = useUpdateUserMutation();
    const [uploadImageToCloud] = useUploadImageToCloudMutation();
    const [getCloudUploadLink, { isLoading: getCloudUploadLinkIsLoading }] = useGetProfileUploadLinkMutation();

    // Upload handling with custom hook
    const { selectedFile, uploadMedia, uploadProgress, onSelectFile, progressState } = useSingleMediaUpload({
        infoUploadUrl: 'user/upload/profile-url',
        onSuccessfulUpload: useCallback(({ uploadKey, preSignedUrl }) => {
            handleUpdateProfilePic(uploadKey, preSignedUrl);
        }, []),
    });

    // Form validation
    useEffect(() => {
        const isValid = Object.values(formState).every((value) => value.trim() !== '');
        setFormValid(isValid);
    }, [formState]);

    // File upload handling
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (files) => {
            try {
                const fileMetadata = await getMediaMetadata(files);
                onSelectFile(fileMetadata[0]);

                // Create preview URL
                const previewUrl = URL.createObjectURL(files[0]);
                setImagePreview(previewUrl);
            } catch (error) {
                toast.error('Error processing file');
            }
        },
        maxFiles: 1,
        multiple: false,
        accept: ACCEPTED_FILE_TYPES,
        maxSize: MAX_FILE_SIZE,
    });

    // Cleanup preview URL
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleFormUpdate = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleUpdateProfile = async () => {
        const isProfileChanged =
            formState.bio !== props.user.profile.bio ||
            formState.location !== props.user.profile.location ||
            formState.about !== props.user.profile.about;

        if (!isProfileChanged) {
            props.nextStage();
            return;
        }

        try {
            await updateUserProfile(formState).unwrap();

            dispatch(
                setUser({
                    ...props.user,
                    profile: {
                        ...props.user.profile,
                        ...formState,
                        created: true,
                    },
                }),
            );

            toast.success('Profile updated successfully');
            props.nextStage();
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    const handleCloseUploadModal = () => {
        setShowProfilePicUploadFlow(false);
        setImagePreview(null);
    };

    // Updated profile picture update handling
    async function handleUpdateProfilePic(uploadKey: string, preSignedUrl: string) {
        // if (!selectedFile) return;

        try {

            console.log('uploading<<<<>>>>>>>>>');
            // Update user profile with new image
            const response = await updateUser({ uploadKey }).unwrap();
            console.log({ response });
            // Update local state and Redux store
            if (response.data.displayImage) {
                setDisplayImage(response.data.displayImage);
            }
            dispatch(
                setUser({
                    ...props.user,
                    displayImage: response.data.displayImage,
                }),
            );

            // Clear upload state and close modal
            handleCloseUploadModal();
            toast.success('Profile picture updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile picture');
        }
    }

    const isLoading = updateUserProfileIsLoading || updateUserIsLoading || getCloudUploadLinkIsLoading;

    return (
        <>
            {showProfilePicUploadFlow ? (
                <div className="pic-upload-flow flex-column centralize-x centralize-y">
                    <div className="profile-pic-modal">
                        <button className="close" onClick={handleCloseUploadModal}>
                            <img src={CloseButton} alt="Close" />
                        </button>

                        <div className="profile-header-section flex-column centralize-x">
                            <p className="section-header">Change your profile picture</p>
                            <p className="desc-img-type">
                                You can upload images in formats like <span>JPEG</span>, <span>PNG</span>,<span>GIF</span>, <span>BMP</span>, and{' '}
                                <span>TIFF</span>. Keep your file under 5MB
                            </p>
                        </div>

                        <CircularUploadPreview file={selectedFile || undefined} progress={uploadProgress} progressState={progressState}>
                            <div className="flex-row click-to-upload centralize-x centralize-y">
                                <div {...getRootProps()}>
                                    {imagePreview ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="relative">
                                                <img src={imagePreview} alt="Preview" className="w-[220px] h-[220px] rounded-full object-cover" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setImagePreview(null);
                                                        onSelectFile(null);
                                                    }}
                                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-gray-600"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-sm font-medium">
                                                {selectedFile?.file.name && selectedFile.file.name.length > 20
                                                    ? `${selectedFile.file.name.slice(0, 20)}...`
                                                    : selectedFile?.file.name}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3">
                                            <img className="flex justify-center" src={UploadPic} alt="Upload" />
                                            <p>Click here to upload</p>
                                        </div>
                                    )}
                                </div>
                                <input ref={fileInputRef} type="file" className="hidden" accept=".jpg,.png,.jpeg" {...getInputProps()} />
                            </div>
                        </CircularUploadPreview>

                        {/* Profile preview section */}
                        <div className="relative w-full mt-4">
                            <div className="flex items-center gap-5">
                                <div className="h-[74px] w-[74px] rounded-full overflow-hidden">
                                    <img src={imagePreview || displayImage} alt="Profile" className="object-cover w-full h-full" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium text-xs text-wrap max-w-32">
                                        {props.user.firstName} {props.user.lastName}
                                    </p>
                                    <p className="text-xs">{props.user.profile.bio}</p>
                                    <p className="uppercase max-w-[60px] text-white bg-black w-full rounded text-[8px] px-2 py-1">
                                        {props.user.role.name}
                                    </p>
                                </div>
                                <p className="absolute top-2 right-7 bg-[#E0E0E0] text-[8px] rounded-2xl px-2 py-1 text-[#444444]">
                                    @{props.user.username}
                                </p>
                            </div>
                        </div>

                        {/* Upload button */}
                        <button
                            onClick={() => selectedFile && uploadMedia(transformSingleFileMetaToMediaContent(selectedFile))}
                            className={`rounded-3xl px-4 py-3 w-full mt-7 text-white ${selectedFile ? 'bg-[#ff0000]' : 'bg-[#A1A1A1]'}`}
                            disabled={!selectedFile || isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-5">
                                    <Spinner width="20px" height="20px" />
                                    <p>Updating...</p>
                                </div>
                            ) : (
                                'Upload Profile Picture'
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <ClickOutsideWrapper onClickOutside={() => dispatch(toggleProfileFormModal({ show: false, modalType: 'create' }))}>
                    <div className="profile-header-section flex-column centralize-x">
                        <p className="section-header">{props.user.profile.created ? 'Update' : 'Create'} profile</p>
                        <p className="description">Almost there! Just a few more steps to unlock your full potential on our platform. 🚀</p>
                    </div>

                    <div className="flex-row profile-pic-area centralize-y">
                        <Circle bg="white" height={60} width={60} noMg style={{ marginRight: 20 }} img={displayImage} pd={0} />
                        <div className="details">
                            <button className="upload-pic" onClick={() => setShowProfilePicUploadFlow(true)}>
                                Upload new Picture
                            </button>
                            <p className="desc-img-type">
                                You can upload images in formats like <span>JPEG</span>, <span>PNG</span>,<span>GIF</span>, <span>BMP</span>, and{' '}
                                <span>TIFF</span>. Keep your file under 5MB
                            </p>
                        </div>
                    </div>

                    <div className="form">
                        <div className="flex-row names centralize-y">
                            <div className="name form-input">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    disabled
                                    value={formState.firstName}
                                    onChange={handleFormUpdate('firstName')}
                                />
                            </div>
                            <div className="name form-input">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                    disabled
                                    value={formState.lastName}
                                    onChange={handleFormUpdate('lastName')}
                                />
                            </div>
                        </div>

                        <div className="bio form-input">
                            <label>Short bio</label>
                            <input type="text" placeholder="Ex: Professional Developer" value={formState.bio} onChange={handleFormUpdate('bio')} />
                        </div>

                        <div className="location form-input">
                            <label>Your Location</label>
                            <input
                                type="text"
                                placeholder="Search your location"
                                value={formState.location}
                                onChange={handleFormUpdate('location')}
                            />
                        </div>

                        <div className="about form-input">
                            <label>About Me</label>
                            <textarea
                                value={formState.about}
                                style={{
                                    resize: 'none',
                                    padding: '30px 10px',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: 10,
                                }}
                                placeholder="Write a detailed bio about yourself, your achievements and capabilities"
                                onChange={handleFormUpdate('about')}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-5 mt-5">
                        <button
                            className={`text-white text-xs px-5 rounded-3xl py-3 ${
                                formValid ? 'bg-[#ff0000] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!formValid || isLoading}
                            onClick={handleUpdateProfile}
                        >
                            {isLoading ? <Spinner width="20px" height="20px" /> : 'Proceed - Experience'}
                        </button>
                        <p
                            className="text-xs underline cursor-pointer"
                            onClick={() => dispatch(toggleProfileFormModal({ show: false, modalType: 'create' }))}
                        >
                            Cancel
                        </p>
                    </div>
                </ClickOutsideWrapper>
            )}
        </>
    );
};

interface ExperienceForm {
    role: string;
    company: string;
    employment_type: string;
    start_date: string;
    end_date: string;
    currentWork: boolean;
}
const ExperienceProfileFormState = (props: ProfileStageProps) => {
    const dispatch = useDispatch();
    const [addExperience, { isLoading }] = useAddExperiencesMutation();

    const emptyExperienceForm = {
        role: '',
        company: '',
        employment_type: '',
        start_date: '',
        end_date: '',
        currentWork: false as boolean,
    };
    const [experiences, setExperience] = useState<Experience[]>([]);
    const [form, setFormData] = useState(emptyExperienceForm);

    const validateForm = useCallback((formData: typeof form) => {
        let isValid = true;
        Object.entries(formData).forEach(([field, value]: [string, string | boolean]) => {
            // if form field is end_date and currentWork is true, return true
            let currentValidation = false;
            if (field === 'end_date' || field === 'start_date') {
                const year = DateUtil.getYearFromISOString(value as string) ?? 0;
                let dateIsValid = false;
                if (year < 1800) {
                    dateIsValid = true;
                } else {
                    dateIsValid = true;
                }

                currentValidation = dateIsValid;

                if (field === 'end_date') {
                    currentValidation = dateIsValid || form.currentWork;
                }
            } else if (field === 'currentWork') {
                currentValidation = true;
            } else {
                currentValidation = (value as string).length > 2;
            }

            isValid = isValid && currentValidation;
        });

        return isValid;
    }, []);

    const updateFormField = (field: keyof ExperienceForm, value: string | boolean) => {
        // Check if the current end date is set
        // check if it is greater than the start date
        // if it is, set it to the start date
        // else leave it as is

        if (field === 'end_date') {
            const dateIsValid = moment(form.start_date).isBefore(value as string);
            if (!dateIsValid) {
                value = getClosestValidDate(form.start_date as any, value as any);
            }
        }

        setFormData({
            ...form,
            [field]: value,
        });
    };
    const submitForm = async (proceedToNextStage = true) => {
        const validForm = validateForm(form);
        const data = {
            role: form.role,
            company: form.company,
            employmentType: form.employment_type,
            startDate: form.start_date as unknown as Date,
            endDate: (form.end_date === '' ? null : form.end_date) as unknown as Date,
            isCurrentWorkplace: form.currentWork,
        };
        if (validForm) {
            await addExperience([data])
                .unwrap()
                .then((res) => {
                    // toast.success(res.message);
                    setExperience([...experiences, ...res.data]);
                    proceedToNextStage && props.nextStage();
                })
                .catch((error: Error) => {
                    toast.error(error?.message);
                });
        } else if (experiences.length !== 0) {
            props.nextStage();
        }
    };

    const submitFormAndClearState = async () => {
        await submitForm(false).then(() => {
            setFormData(emptyExperienceForm);
        });
    };

    const AddNavButton = ({
        action,
        formValidated,
        experiences,
        isLoading,
    }: {
        action: () => void;
        formValidated: boolean;
        experiences: Experience[];
        isLoading: boolean;
    }) => {
        return (
            <>
                <button
                    className="next-stage-btn"
                    style={{
                        backgroundColor: formValidated ? '' : experiences.length !== 0 ? '' : '#cccc',
                        cursor: 'pointer',
                        marginLeft: 10,
                    }}
                    onClick={() => action()}
                >
                    {isLoading ? <Spinner width="20px" height="20px" /> : 'Proceed - Education'}
                </button>
            </>
        );
    };

    const CreateNewNavButton = ({
        formValidated,
        isLoading,
        action,
    }: {
        action: () => void;
        formValidated: boolean;
        experiences: Experience[];
        isLoading: boolean;
    }) => {
        return (
            <>
                <button
                    className="next-stage-btn"
                    style={{
                        backgroundColor: formValidated ? 'grey' : '#cccc',
                        cursor: formValidated ? 'pointer' : 'not-allowed',
                        marginLeft: 10,
                    }}
                    onClick={() => action()}
                >
                    {isLoading ? <Spinner width="20px" height="20px" /> : '+  Add another'}
                </button>
            </>
        );
    };

    // Check if start date is greater than end date else change end date to start date

    useEffect(() => {
        // if date '' set to default value in YearMonthDropdown component this is because
        //  getting the current date from the dropdown is complex, and the default value is 2022-01-01
        // this is to account for the fact that the user might not have selected a date
        // and the default value is CurrentYear-01-01
        // If they have selected a date, then the default value will be overwritten

        const formDataToUpdate = form;
        if (formDataToUpdate.end_date === '') {
            formDataToUpdate.end_date = CURRENT_YEAR.toString() + '-01-01';
        }
        if (formDataToUpdate.start_date === '') {
            formDataToUpdate.start_date = CURRENT_YEAR.toString() + '-01-01';
        }

        const dateIsValid = moment(formDataToUpdate.start_date).isBefore(formDataToUpdate.end_date);
        if (!dateIsValid && formDataToUpdate.end_date !== '') {
            formDataToUpdate.end_date = getClosestValidDate(formDataToUpdate.start_date as any, formDataToUpdate.end_date as any);
        }

        setFormData(formDataToUpdate);
    }, [form]);
    return (
        <>
            <div className="profile-header-section flex-column centralize-x">
                <p className="section-header">Enter your experience</p>
                <p className="description">{'Almost there! Just a few more steps to unlock your full potential on our platform. 🚀'}</p>
            </div>

            <div className="flex-row profile-pic-area centralize-y"></div>

            <div className="form">
                <div className="bio form-input">
                    <label htmlFor="">Role</label>
                    <input type="text" placeholder="Ex: Sales Manager" value={form.role} onChange={(e) => updateFormField('role', e.target.value)} />
                </div>
                <div className="bio form-input">
                    <label htmlFor="">Company</label>
                    <input type="text" placeholder="Ex: BlackAt" value={form.company} onChange={(e) => updateFormField('company', e.target.value)} />
                </div>
                <div className="employment-type form-input">
                    {/* Dropdown to select employment type */}
                    <label htmlFor="dropdown">Employment type</label>
                    <select id="dropdown" value={form.employment_type} onChange={(e) => updateFormField('employment_type', e.target.value)}>
                        <option value="-- Select --">-- Select --</option>
                        <option value="Full time">Full time</option>
                        <option value="Part time">Part time</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>
                <div className="flex-row date centralize-y">
                    <div className="start-date form-input" style={{ position: 'relative' }}>
                        <label htmlFor="">Start date</label>
                        <YearMonthDropdown
                            date={form.start_date as `${number}-${number}`}
                            onChange={(year, month) => {
                                updateFormField('start_date', `${year}-${month}-${1}`);
                            }}
                        />
                    </div>
                    <div className="end-date form-input" style={{ position: 'relative' }}>
                        <label htmlFor="">End date</label>
                        <YearMonthDropdown
                            date={form.end_date as `${number}-${number}`}
                            onChange={(year, month) => {
                                updateFormField('end_date', `${year}-${month}-${1}`);
                            }}
                        />
                    </div>
                </div>
                <div className="flex-row current-work centralize-y">
                    <input
                        type="checkbox"
                        style={{
                            marginRight: 10,
                        }}
                        checked={form.currentWork}
                        onChange={(e) => updateFormField('currentWork', e.target.checked)}
                    />
                    <p style={{ fontSize: 12 }}>I currently work here</p>
                </div>
            </div>

            <div className="flex-row navs centralize-y">
                <div className="flex-row centralize-y">
                    <AddNavButton action={() => submitForm()} formValidated={validateForm(form)} experiences={experiences} isLoading={isLoading} />
                    <CreateNewNavButton
                        action={() => submitFormAndClearState()}
                        formValidated={validateForm(form)}
                        experiences={experiences}
                        isLoading={isLoading}
                    />
                </div>
                <p
                    className="cancel"
                    onClick={() =>
                        dispatch(
                            toggleProfileFormModal({
                                show: false,
                                modalType: 'create',
                            }),
                        )
                    }
                >
                    Cancel
                </p>
            </div>
        </>
        // Lorem50
    );
};
const EducationProfileFormState = (props: ProfileStageProps) => {
    const dispatch = useDispatch();
    const [formValidated, setFormValidated] = useState(false);
    const [schools, setSchools] = useState<IEducation[]>([]);
    const [form, setFormData] = useState({
        school: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
    });
    const [addEducation, { isLoading }] = useAddEducationMutation();

    const validateForm = (formData: typeof form) => {
        // All fields are required and should be at least 3 characters long
        const isValid = Object.values(formData).every((value) => value && value.toString().length > 2);
        return isValid;
    };

    const submitForm = async () => {
        if (validateForm(form)) {
            await addEducation([
                {
                    school: form.school,
                    degree: form.degree,
                    fieldOfStudy: form.field_of_study,
                    startDate: form.start_date as unknown as Date,
                    endDate: form.end_date as unknown as Date,
                },
            ])
                .unwrap()
                .then(() => {
                    // toast.success(res.message);
                    setFormData({
                        school: '',
                        degree: '',
                        field_of_study: '',
                        start_date: '',
                        end_date: '',
                    });
                    setSchools([
                        ...schools,
                        {
                            school: form.school,
                            degree: form.degree,
                            fieldOfStudy: form.field_of_study,
                            startDate: form.start_date as unknown as Date,
                            endDate: form.end_date as unknown as Date,
                        },
                    ]);
                    props.nextStage();
                })
                .catch((error: Error) => {
                    toast.error(error?.message);
                });
        } else if (schools.length !== 0) {
            props.nextStage();
        }
    };
    const submitFormAndClearState = async () => {
        if (validateForm(form)) {
            await addEducation([
                {
                    school: form.school,
                    degree: form.degree,
                    fieldOfStudy: form.field_of_study,
                    startDate: form.start_date as unknown as Date,
                    endDate: form.end_date as unknown as Date,
                },
            ])
                .unwrap()
                .then(() => {
                    // toast.success(res.message);
                    setFormData({
                        school: '',
                        degree: '',
                        field_of_study: '',
                        end_date: '',
                        start_date: '',
                    });
                    setSchools([
                        ...schools,
                        {
                            school: form.school,
                            degree: form.degree,
                            fieldOfStudy: form.field_of_study,
                            startDate: form.start_date as unknown as Date,
                            endDate: form.end_date as unknown as Date,
                        },
                    ]);
                })
                .catch((error: Error) => {
                    toast.error(error?.message);
                });
        }
    };

    const updateFormField = (field: keyof typeof form, value: (typeof form)[keyof typeof form]) => {
        if (field === 'end_date') {
            const dateIsValid = moment(form.start_date).isBefore(value as string);
            if (!dateIsValid) {
                value = getClosestValidDate(form.start_date as any, value as any);
            }
        }

        setFormData({
            ...form,
            [field]: value,
        });
    };

    useEffect(() => {
        const formDataToUpdate = form;
        if (formDataToUpdate.end_date === '') {
            formDataToUpdate.end_date = CURRENT_YEAR.toString() + '-01-01';
        }

        if (formDataToUpdate.start_date === '') {
            formDataToUpdate.start_date = CURRENT_YEAR.toString() + '-01-01';
        }

        const dateIsValid = moment(formDataToUpdate.start_date).isBefore(formDataToUpdate.end_date);
        if (!dateIsValid && formDataToUpdate.end_date !== '') {
            formDataToUpdate.end_date = getClosestValidDate(formDataToUpdate.start_date as any, formDataToUpdate.end_date as any);
        }

        setFormData(formDataToUpdate);

        setFormValidated(validateForm(form));
    }, [form]);

    return (
        <>
            <div className="profile-header-section flex-column centralize-x">
                <p className="section-header">Enter your Educational background</p>
                <p className="description">{'Almost there! Just a few more steps to unlock your full potential on our platform. 🚀'}</p>
            </div>

            <div className="flex-row profile-pic-area centralize-y"></div>

            <div className="form">
                <div className="school form-input">
                    <label htmlFor="">School</label>
                    <input type="text" placeholder="Ex: Design" value={form.school} onChange={(e) => updateFormField('school', e.target.value)} />
                </div>
                <div className="degree form-input">
                    <label htmlFor="">Degree</label>
                    <input
                        type="text"
                        placeholder="Ex: Bachelors of Science"
                        value={form.degree}
                        onChange={(e) => updateFormField('degree', e.target.value)}
                    />
                </div>
                <div className="field-of-study form-input">
                    <label htmlFor="">Field of study</label>
                    <input
                        type="text"
                        placeholder="Enter your field of study"
                        value={form.field_of_study}
                        onChange={(e) => updateFormField('field_of_study', e.target.value)}
                    />
                </div>
                <div className="flex-row date centralize-y">
                    <div className="start-date form-input" style={{ position: 'relative' }}>
                        <label htmlFor="">Start date</label>
                        <YearMonthDropdown
                            date={form.start_date as `${number}-${number}`}
                            onChange={(year, month) => {
                                updateFormField('start_date', `${year}-${month}-${1}`);
                            }}
                        />
                    </div>
                    <div className="end-date form-input" style={{ position: 'relative' }}>
                        <label htmlFor="">End date</label>
                        <YearMonthDropdown
                            date={form.end_date as `${number}-${number}`}
                            onChange={(year, month) => {
                                updateFormField('end_date', `${year}-${month}-${1}`);
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-row navs centralize-y">
                <div>
                    <button
                        className="next-stage-btn"
                        style={{
                            backgroundColor: formValidated ? '' : schools.length !== 0 ? '' : '#cccc',
                            cursor: formValidated ? 'pointer' : schools.length !== 0 ? 'pointer' : 'not-allowed',
                        }}
                        onClick={submitForm}
                    >
                        {isLoading ? <Spinner width="20px" height="20px" /> : 'Proceed - Skill set'}
                    </button>
                    <button
                        className="next-stage-btn"
                        style={{
                            backgroundColor: formValidated ? 'grey' : '#cccc',
                            cursor: formValidated ? 'pointer' : 'not-allowed',
                            marginLeft: 10,
                        }}
                        onClick={submitFormAndClearState}
                    >
                        {isLoading ? <Spinner width="20px" height="20px" /> : '+  Add another'}
                    </button>
                </div>
                <p
                    className="cancel"
                    onClick={() =>
                        dispatch(
                            toggleProfileFormModal({
                                show: false,
                                modalType: 'create',
                            }),
                        )
                    }
                >
                    Cancel
                </p>
            </div>
        </>
    );
};
export const ProfileFormModal = (props: { userInfo: UserInfoFromApi, view: 'owner | user' }) => {
    usePreventScroll();
    const { stageToStartFrom, modalType, showProfilePicUploadFlow } = useSelector((state: RootState) => state.profile);
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const {
        data: loggedUserBasicInfo,
        isLoading: getUserIsLoading,
        isError: getUsersIsError,
    } = useGetUserDetailQuery({ username: loggedUser?.username ?? '' });
    const [stage, setStage] = useState<(typeof stages)[number]>(stageToStartFrom);
    const dispatch = useDispatch();

    const stages = ['profile-creation', 'experience', 'education', 'skillset'] as const;
    const nextStage = () => {
        const index = stages.indexOf(stage);
        const indexOutOfRange = index + 1 >= stages.length;
        if (indexOutOfRange) {
            dispatch(toggleProfileFormModal({ show: false, modalType: 'create' }));
            return;
        }

        setStage(stages[index + 1]);
    };

    useEffect(() => {
        if (getUsersIsError) {
            toast.error('Error fetching user details');
            dispatch(toggleProfileFormModal({ show: false, modalType: 'create' }));
        }
    }, [getUsersIsError, dispatch]);
    useEffect(() => {
        // If no profile has been created for the user, start from the first stage
        // else proceed to the stage the user initiated the profile creation from
        if (!loggedUser?.profile.created) {
            setStage('profile-creation');
        }
    }, [loggedUser]);

    const mode = loggedUser?.profile.created ? 'edit' : 'create';

    const stageForm: {
        update: Record<typeof stage, ReactNode>;
        create: Record<typeof stage, ReactNode>;
    } = {
        update: {
            'profile-creation': (
                <CompleteProfileFormStage nextStage={nextStage} user={props.userInfo} mode={mode} showProfileUploadFlow={showProfilePicUploadFlow} />
            ),
            experience: <EditExperienceProfileFormState nextStage={nextStage} user={props.userInfo} mode={mode} />,
            education: <EditEducationProfileFormState nextStage={nextStage} user={props.userInfo} mode={mode} />,
            skillset: (
                <EditSkillsetProfileFormState userBasicInfo={loggedUserBasicInfo?.data} nextStage={nextStage} user={props.userInfo} mode={mode} />
            ),
        },
        create: {
            'profile-creation': (
                <CompleteProfileFormStage nextStage={nextStage} user={props.userInfo} mode={mode} showProfileUploadFlow={showProfilePicUploadFlow} />
            ),
            experience: <ExperienceProfileFormState nextStage={nextStage} user={props.userInfo} mode={mode} />,
            education: <EducationProfileFormState nextStage={nextStage} user={props.userInfo} mode={mode} />,
            skillset: (
                <EditSkillsetProfileFormState userBasicInfo={loggedUserBasicInfo?.data} nextStage={nextStage} user={props.userInfo} mode={mode} />
            ),
        },
    };

    return (
        <>
            <div className="flex-row profile-stage centralize-x centralize-y !fixed z-10">
                {getUserIsLoading ? (
                    <Spinner width="40px" height="40px" />
                ) : (
                    <div className="stage flex-column top-0 !mt-0 overflow-auto max-h-[80dvh] min-h-[unset] !mb-0">{stageForm[modalType][stage]}</div>
                )}
            </div>
        </>
    );
};

const InputArrayItem = ({ text, removeItem }: { text: string; removeItem: (value: string) => void }) => {
    return (
        <>
            <div className="cta list-item">
                <button className="flex-row add-skillset centralize-x centralize-y" onClick={() => removeItem(text)}>
                    <p className="add">{text}</p>
                    <Circle width={12} height={12} noMg borderColor="transparent" bg="transparent" pd={0} img={CircleClose} />
                </button>
            </div>
        </>
    );
};

const AddTextInputArray = ({
    title,
    setValues,
    placeholder,
    currentRecords,
}: {
    title: string;
    currentRecords?: string[];
    placeholder: string;
    setValues: (values: string[]) => void;
}) => {
    const [inputValue, setInputValue] = useState('');
    const [list, setList] = useState<string[]>([]);

    const addItemToList = () => {
        if (inputValue === '' || list.includes(inputValue) || list.length === 3) return;

        const newList = [...list, inputValue];
        setList([...list, inputValue]);
        setInputValue('');
        setValues(newList);
    };

    const removeItemFromList = (item: string) => {
        const newList = list.filter((listItem) => listItem !== item);
        setList(newList);
        setValues(newList);
    };

    useEffect(() => {
        if (currentRecords) {
            setList(currentRecords);
        }
    }, [currentRecords]);

    return (
        <>
            <div className="bio form-input">
                <label htmlFor="">{title}</label>
                <div className="flex-row input-area centralize-y">
                    <div className="flex-row list-section centralize-y">
                        {list.map((item) => (
                            <InputArrayItem text={item} removeItem={removeItemFromList} />
                        ))}
                    </div>
                    <div className="flex-row cta centralize-y ">
                        <div id="input-area-array">
                            <input
                                type="text"
                                placeholder={placeholder}
                                value={inputValue}
                                maxLength={12}
                                onKeyDown={(e) => e.key === 'Enter' && addItemToList()}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                }}
                            />
                        </div>
                        <button className="flex-row add-skillset centralize-x centralize-y" onClick={addItemToList}>
                            <p className="add">Add</p>
                            <Circle width={12} height={12} noMg borderColor="transparent" bg="transparent" pd={0} img={CirclePlus} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
interface ExperienceForm {
    role: string;
    company: string;
    employment_type: string;
    start_date: string;
    end_date: string;
    currentWork: boolean;
    id: string;
}
const EditExperienceProfileFormState = (props: ProfileStageProps) => {
    const dispatch = useDispatch();
    const _experiences = useGetExperienceQuery();
    const [updateExperience, { isLoading: updateIsLoading }] = useUpdateExperienceMutation();
    const [mode, setMode] = useState<'create' | 'edit'>(props.mode);

    const emptyExperienceForm = {
        role: '',
        company: '',
        employment_type: '',
        start_date: '',
        end_date: '',
        currentWork: false as boolean,
        id: '',
    };
    const [experienceToUpdate, setExperienceToUpdate] = useState<ExperienceForm>(emptyExperienceForm);
    const [experiences, setExperience] = useState<Experience[]>([]);
    const [form, setFormData] = useState<ExperienceForm>(emptyExperienceForm);

    const validateForm = useCallback((formData: typeof form) => {
        // All fields are required and should be at least 3 characters long
        let isValid = true;
        Object.entries(formData).forEach(([field, value]: [string, string | boolean]) => {
            // if form field is end_date and currentWork is true, return true
            let currentValidation = false;
            if (field === 'end_date') {
                currentValidation = (value as string).length > 2 || ((value as string).length < 2 && formData.currentWork);
            } else if (typeof value === 'boolean') {
                currentValidation = (value === false && formData.end_date.length > 2) || value === true;
            } else if (field === 'about') {
                currentValidation = true;
            } else {
                currentValidation = (value as string).length > 2;
            }
            isValid = isValid && currentValidation;
        });

        return isValid;
    }, []);

    const updateFormFieldForExperienceToUpdate = (field: keyof ExperienceForm, value: string | boolean) => {
        setExperienceToUpdate({
            ...experienceToUpdate,
            [field]: value,
        });
    };

    const submitForm = async () => {
        const validForm = validateForm(form);
        if (validForm) {
            const data = {
                role: form.role,
                company: form.company,
                employmentType: form.employment_type,
                startDate: form.start_date as unknown as Date,
                endDate: (form.end_date === '' ? null : form.end_date) as unknown as Date,
                isCurrentWorkplace: form.currentWork,
                id: form.id,
            };
            await updateExperience({ data, id: data.id })
                .unwrap()
                .then((res) => {
                    // toast.success(res.message);
                    setExperience(
                        experiences.map((experience) => {
                            if (experience.id === res.data.id) {
                                return data;
                            }
                            return experience;
                        }),
                    );
                    setExperienceToUpdate(emptyExperienceForm);
                    // TODO: Dispatch event to update all experiences state
                    // Open list of experiences
                    setMode('edit');
                })
                .catch((error: Error) => {
                    toast.error(error?.message);
                });
        }
    };

    useEffect(() => {
        if (!_experiences.data?.data || _experiences.data?.data.length === 0) {
            dispatch(
                toggleProfileFormModal({
                    show: true,
                    modalType: 'create',
                    stageToStartFrom: 'experience',
                }),
            );
        }
    }, [_experiences.data?.data, dispatch]);
    useEffect(() => {
        // if date '' set to default value in YearMonthDropdown component this is because
        //  getting the current date from the dropdown is complex, and the default value is 2022-01-01
        // this is to account for the fact that the user might not have selected a date
        // and the default value is currentYear-01-01
        // If they have selected a date, then the default value will be overwritten

        const formDataToUpdate = { ...experienceToUpdate };

        if (experienceToUpdate.end_date === '') {
            formDataToUpdate.end_date = CURRENT_YEAR.toString() + '-01-01';
        }
        if (experienceToUpdate.start_date === '') {
            formDataToUpdate.start_date = CURRENT_YEAR.toString() + '-01-01';
        }

        // Check if start date is greater than end date else change end date to start date
        const dateIsValid = moment(experienceToUpdate.start_date).isBefore(experienceToUpdate.end_date);
        if (!dateIsValid && experienceToUpdate.start_date !== '') {
            formDataToUpdate.end_date = getClosestValidDate(experienceToUpdate.start_date as any, experienceToUpdate.end_date as any);
        }
        setFormData(experienceToUpdate);
    }, [experienceToUpdate]);

    const selectExperienceToUpdate = (experience: ExperienceForm) => {
        setExperienceToUpdate(experience);
    };

    const UpdateNavButton = ({
        action,
        formValidated,
        experiences,
        isLoading,
        mode,
    }: {
        action: () => void;
        formValidated: boolean;
        experiences: Experience[];
        isLoading: boolean;
        mode: 'create' | 'edit';
    }) => {
        let text = 'Update';
        if (mode === 'edit') {
            formValidated = true;
            action = () => props.nextStage();
            isLoading = false;
            text = 'Proceed - Education';
        }
        return (
            <>
                <button
                    className="next-stage-btn"
                    style={{
                        backgroundColor: formValidated ? '' : experiences.length !== 0 ? '' : '#cccc',
                        cursor: formValidated ? 'pointer' : experiences.length !== 0 ? 'pointer' : 'not-allowed',
                    }}
                    onClick={() => action()}
                >
                    {isLoading ? <Spinner width="20px" height="20px" /> : text}
                </button>
            </>
        );
    };

    const CreateNewNavButton = ({
        formValidated,
        isLoading,
        action,
    }: {
        action?: () => void;
        formValidated: boolean;
        experiences: Experience[];
        isLoading: boolean;
    }) => {
        return (
            <>
                <button
                    className="next-stage-btn"
                    style={{
                        backgroundColor: formValidated ? 'grey' : '#cccc',
                        cursor: formValidated ? 'pointer' : 'not-allowed',
                        marginLeft: 10,
                    }}
                    onClick={() =>
                        action
                            ? action()
                            : dispatch(
                                  toggleProfileFormModal({
                                      show: true,
                                      modalType: 'create',
                                      stageToStartFrom: 'experience',
                                  }),
                              )
                    }
                >
                    {isLoading ? <Spinner width="20px" height="20px" /> : '+  Add another'}
                </button>
            </>
        );
    };

    return (
        <>
            <div className="profile-header-section flex-column centralize-x">
                <p className="section-header">Update your experience</p>
                <p className="description">{'Almost there! Just a few more steps to unlock your full potential on our platform. 🚀'}</p>
            </div>

            <div className="flex-row profile-pic-area centralize-y"></div>

            <div className="form">
                {mode === 'edit' ? (
                    <EditPane>
                        <EditExperiences
                            mode={'edit'}
                            experiences={_experiences.data?.data ?? []}
                            setExperienceToUpdate={(experience) => {
                                setMode('create');
                                selectExperienceToUpdate(experience);
                            }}
                        />
                    </EditPane>
                ) : (
                    <EditExperiences
                        mode={'create'}
                        formProps={{
                            experienceToUpdate,
                            updateFormField: updateFormFieldForExperienceToUpdate,
                        }}
                    />
                )}
            </div>

            <div className="flex-row navs centralize-y">
                <div className="flex-row centralize-y">
                    <UpdateNavButton
                        action={submitForm}
                        mode={mode}
                        formValidated={validateForm(experienceToUpdate)}
                        experiences={experiences}
                        isLoading={updateIsLoading}
                    />
                    {mode === 'edit' ? (
                        <CreateNewNavButton
                            action={() => {
                                dispatch(
                                    toggleProfileFormModal({
                                        show: true,
                                        modalType: 'create',
                                        stageToStartFrom: 'experience',
                                    }),
                                );
                            }}
                            formValidated={true}
                            experiences={experiences}
                            isLoading={false}
                        />
                    ) : (
                        <CreateNewNavButton formValidated={validateForm(experienceToUpdate)} experiences={experiences} isLoading={updateIsLoading} />
                    )}
                </div>
                <p
                    className="cancel"
                    onClick={() =>
                        dispatch(
                            toggleProfileFormModal({
                                show: false,
                                modalType: 'update',
                            }),
                        )
                    }
                >
                    Cancel
                </p>
            </div>
        </>
    );
};
interface EducationForm {
    school: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    id: string;
}
const EditEducationProfileFormState = (props: ProfileStageProps) => {
    const dispatch = useDispatch();
    const _schools = useGetEducationQuery();
    const [updateEducation, { isLoading }] = useUpdateEducationMutation();
    const [mode, setMode] = useState<'create' | 'edit'>(props.mode);
    const emptyEducationForm = {
        school: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
        id: '',
    };
    const [form, setFormData] = useState<EducationForm>(emptyEducationForm);
    const [educationToUpdate, setEducationToUpdate] = useState<EducationForm>(emptyEducationForm);
    const [educations, setEducation] = useState<(IEducation & { id: string })[]>([]);

    const validateForm = useCallback((formData: typeof form) => {
        let isValid = true;
        Object.entries(formData).forEach(([field, value]: [string, string | Date | null]) => {
            let currentValidation = (value ? value.toString().length : 0) > 2;

            if (field === 'end_date' || field === 'start_date') {
                const year = DateUtil.getYearFromISOString(value as string) ?? 0;
                let dateIsValid = false;
                if (year < 1800) {
                    dateIsValid = true;
                } else {
                    dateIsValid = true;
                }

                currentValidation = dateIsValid;
            }

            isValid = isValid && currentValidation;
        });

        return isValid;
    }, []);

    const updateFormFieldForEducationToUpdate = (field: keyof EducationForm, value: string) => {
        if (field === 'end_date') {
            const dateIsValid = moment(educationToUpdate.start_date).isBefore(value as string);
            if (!dateIsValid) {
                value = getClosestValidDate(educationToUpdate.start_date as any, value as any);
            }
        }

        setEducationToUpdate({
            ...educationToUpdate,
            [field]: value,
        });
    };

    const submitForm = async () => {
        const form = educationToUpdate;
        const validForm = validateForm(form);
        if (validForm) {
            const data = {
                school: form.school,
                degree: form.degree,
                fieldOfStudy: form.field_of_study,
                startDate: form.start_date as unknown as Date,
                endDate: form.end_date as unknown as Date,
                id: form.id,
            };
            await updateEducation({ data, id: data.id })
                .unwrap()
                .then((res) => {
                    // toast.success(res.message);
                    setEducation(
                        educations.map((education) => {
                            if (education.id === res.data.id) {
                                return data;
                            }
                            return education;
                        }),
                    );
                    setEducationToUpdate(emptyEducationForm);
                    setMode('edit');
                })
                .catch((error: Error) => {
                    toast.error(error?.message);
                });
        }
    };

    useEffect(() => {
        const formDataToUpdate = { ...educationToUpdate };

        if (formDataToUpdate.end_date === '') {
            formDataToUpdate.end_date = CURRENT_YEAR.toString() + '-01-01';
        }

        if (formDataToUpdate.start_date === '') {
            formDataToUpdate.start_date = CURRENT_YEAR.toString() + '-01-01';
        }

        const dateIsValid = moment(educationToUpdate.start_date).isBefore(educationToUpdate.end_date);
        if (!dateIsValid && educationToUpdate.end_date !== '') {
            formDataToUpdate.end_date = getClosestValidDate(educationToUpdate.start_date as any, educationToUpdate.end_date as any);
        }

        setEducationToUpdate(educationToUpdate);
        setFormData(educationToUpdate);
    }, [educationToUpdate, form]);

    const selectEducationToUpdate = (education: EducationForm) => {
        setEducationToUpdate(education);
    };

    const UpdateNavButton = ({
        action,
        formValidated,
        educations,
        isLoading,
        mode,
    }: {
        action: () => void;
        formValidated: boolean;
        educations: Education[];
        isLoading: boolean;
        mode: 'create' | 'edit';
    }) => {
        let text = 'Update';
        if (mode === 'edit') {
            formValidated = true;
            action = () => props.nextStage();
            isLoading = false;
            text = 'Proceed - Skill set';
        }
        return (
            <>
                <button
                    className="next-stage-btn"
                    style={{
                        backgroundColor: formValidated ? '' : educations.length !== 0 ? '' : '#cccc',
                        cursor: formValidated ? 'pointer' : educations.length !== 0 ? 'pointer' : 'not-allowed',
                    }}
                    onClick={() => action()}
                >
                    {isLoading ? <Spinner width="20px" height="20px" /> : text}
                </button>
            </>
        );
    };

    const CreateNewNavButton = ({ formValidated, isLoading, action }: { action?: () => void; formValidated: boolean; isLoading: boolean }) => {
        return (
            <>
                <button
                    className="next-stage-btn"
                    style={{
                        backgroundColor: formValidated ? 'grey' : '#cccc',
                        cursor: formValidated ? 'pointer' : 'not-allowed',
                        marginLeft: 10,
                    }}
                    onClick={() =>
                        action
                            ? action()
                            : dispatch(
                                  toggleProfileFormModal({
                                      show: true,
                                      modalType: 'create',
                                      stageToStartFrom: 'education',
                                  }),
                              )
                    }
                >
                    {isLoading ? <Spinner width="20px" height="20px" /> : '+  Add another'}
                </button>
            </>
        );
    };

    return (
        <>
            <div className="profile-header-section flex-column centralize-x">
                <p className="section-header">Update your education</p>
                <p className="description">{'Almost there! Just a few more steps to unlock your full potential on our platform. 🚀'}</p>
            </div>

            <div className="flex-row profile-pic-area centralize-y"></div>

            <div className="form">
                {mode === 'edit' ? (
                    <EditPane>
                        <EditEducations
                            mode={'edit'}
                            educations={_schools.data?.data ?? []}
                            setEducationToUpdate={(education) => {
                                setMode('create');
                                selectEducationToUpdate(education);
                            }}
                        />
                    </EditPane>
                ) : (
                    <>
                        <div className="form">
                            <div className="school form-input">
                                <label htmlFor="">School</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Design"
                                    value={educationToUpdate.school}
                                    onChange={(e) => updateFormFieldForEducationToUpdate('school', e.target.value)}
                                />
                            </div>
                            <div className="degree form-input">
                                <label htmlFor="">Degree</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Bachelors of Science"
                                    value={form.degree}
                                    onChange={(e) => updateFormFieldForEducationToUpdate('degree', e.target.value)}
                                />
                            </div>
                            <div className="field-of-study form-input">
                                <label htmlFor="">Field of study</label>
                                <input
                                    type="text"
                                    placeholder="Enter your field of study"
                                    value={form.field_of_study}
                                    onChange={(e) => updateFormFieldForEducationToUpdate('field_of_study', e.target.value)}
                                />
                            </div>
                            <div className="flex-row date centralize-y">
                                <div className="start-date form-input" style={{ position: 'relative' }}>
                                    <label htmlFor="">Start date</label>
                                    <YearMonthDropdown
                                        date={form.start_date as `${number}-${number}`}
                                        onChange={(year, month) => {
                                            updateFormFieldForEducationToUpdate('start_date', `${year}-${month}-${1}`);
                                        }}
                                    />
                                </div>
                                <div className="end-date form-input" style={{ position: 'relative' }}>
                                    <label htmlFor="">End date</label>
                                    <YearMonthDropdown
                                        date={form.end_date as `${number}-${number}`}
                                        onChange={(year, month) => {
                                            updateFormFieldForEducationToUpdate('end_date', `${year}-${month}-${1}`);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="flex-row navs centralize-y">
                <div className="flex-row centralize-y">
                    <UpdateNavButton
                        action={submitForm}
                        mode={mode}
                        formValidated={validateForm(educationToUpdate)}
                        educations={_schools.data?.data ?? []}
                        isLoading={isLoading}
                    />
                    {mode === 'edit' ? (
                        <CreateNewNavButton
                            action={() => {
                                dispatch(
                                    toggleProfileFormModal({
                                        show: true,
                                        modalType: 'create',
                                        stageToStartFrom: 'education',
                                    }),
                                );
                            }}
                            formValidated={true}
                            isLoading={false}
                        />
                    ) : (
                        <CreateNewNavButton formValidated={validateForm(educationToUpdate)} isLoading={isLoading} />
                    )}
                </div>
                <p
                    className="cancel"
                    onClick={() =>
                        dispatch(
                            toggleProfileFormModal({
                                show: false,
                                modalType: 'update',
                            }),
                        )
                    }
                >
                    Cancel
                </p>
            </div>
        </>
    );
};

const EditSkillsetProfileFormState = (props: ProfileStageProps & { userBasicInfo?: UserBasicInfo }) => {
    const dispatch = useDispatch();
    const [form, setFormData] = useState<{
        interests: string[];
        skillset: string[];
        industry: string[];
    }>({ interests: [], skillset: [], industry: [] });
    const [formValidated, setFormValidated] = useState(false);
    const [skillSet, setSkillSet] = useState<ISkillSet[]>([]);
    const [addSkillSet, { isLoading }] = useAddSkillSetMutation();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [getUserProfile] = useGetProfileMutation();
    const [infoHasBeenUpdated, setInfoHasBeenUpdated] = useState(false);

    const updateFormField = (field: keyof typeof form, value: string[]) => setFormData({ ...form, [field]: value });

    const validateForm = useCallback((formData: typeof form) => {
        // All fields are required and should be at least 3 characters long
        const isValid = Object.values(formData).every((value) => value.length > 0);
        return isValid;
    }, []);

    const submitForm = async () => {
        if (validateForm(form)) {
            if (!infoHasBeenUpdated) {
                props.nextStage();
                return;
            }
            await addSkillSet({
                interests: form.interests,
                skillSet: form.skillset,
                industry: form.industry,
            })
                .unwrap()
                .then(() => {
                    // toast.success(res.message);
                    setSkillSet([
                        ...skillSet,
                        {
                            interests: form.interests,
                            skillSet: form.skillset,
                            industry: form.industry,
                        },
                    ]);
                    props.nextStage();
                })
                .catch((error: Error) => {
                    toast.error(error?.message);
                });
        } else if (Object.values(skillSet).length !== 0) {
            props.nextStage();
        }
    };

    useEffect(() => {
        if (props.userBasicInfo && !userProfile) {
            getUserProfile(undefined)
                .unwrap()
                .then((res) => {
                    setUserProfile(res.data);
                })
                .catch((error: Error) => {
                    toast.error(error?.message);
                });
        }
        setFormValidated(validateForm(form));
    }, [form, validateForm, getUserProfile, userProfile, props.userBasicInfo]);

    useEffect(() => {
        if (userProfile?.skillset) {
            setFormData({
                interests: userProfile.skillset.interests,
                skillset: userProfile.skillset.skillSet,
                industry: userProfile.skillset.industry,
            });
        }
    }, [userProfile?.skillset]);

    return (
        <>
            <div className="profile-header-section flex-column centralize-x">
                <p className="section-header">Enter your skillset</p>
                <p className="description">{'Almost there! Just a few more steps to unlock your full potential on our platform. 🚀'}</p>
            </div>

            <div className="flex-row profile-pic-area centralize-y"></div>

            <div className="form skillset-form">
                <AddTextInputArray
                    title="Interests"
                    currentRecords={userProfile?.skillset?.interests}
                    placeholder="Ex: Design"
                    setValues={(values) => {
                        setInfoHasBeenUpdated(true);
                        updateFormField('interests', values);
                    }}
                />
                <AddTextInputArray
                    title="Skillset"
                    currentRecords={userProfile?.skillset?.skillSet}
                    placeholder="Ex: Computer programming"
                    setValues={(values) => {
                        setInfoHasBeenUpdated(true);
                        updateFormField('skillset', values);
                    }}
                />
                <AddTextInputArray
                    title="Industry"
                    currentRecords={userProfile?.skillset?.industry}
                    placeholder="Ex: Construction"
                    setValues={(values) => {
                        setInfoHasBeenUpdated(true);
                        updateFormField('industry', values);
                    }}
                />
            </div>

            <div className="flex-row navs centralize-y">
                <div>
                    <button
                        className="next-stage-btn"
                        style={{
                            backgroundColor: formValidated ? '' : skillSet.length !== 0 ? '' : '#cccc',
                            cursor: formValidated ? 'pointer' : skillSet.length !== 0 ? 'pointer' : 'not-allowed',
                        }}
                        onClick={submitForm}
                    >
                        {isLoading ? <Spinner width="20px" height="20px" /> : 'Proceed'}
                    </button>
                </div>
                <p
                    className="cancel"
                    onClick={() =>
                        dispatch(
                            toggleProfileFormModal({
                                show: false,
                                modalType: 'update',
                            }),
                        )
                    }
                >
                    Cancel
                </p>
            </div>
        </>
    );
};
