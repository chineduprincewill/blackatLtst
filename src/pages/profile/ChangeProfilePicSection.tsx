// import React from 'react';
// import CloseButton from '../../assets/close.png';
// import useSingleMediaUpload from '@hooks/useSingleMediaUpload';
// import { useAppSelector } from '@state/store';
// import { selectProfile } from '@state/slices/profile';
// import { setProfilePicUpdatePreview, setShowProfileUploadFlow } from '@state/slices/profile';

// export default function ChangeProfilePicSection({}) {
//     return (
//         <div className="pic-upload-flow flex-column centralize-x centralize-y ">
//             <div className="profile-pic-modal">
//                 <button
//                     className="close"
//                     onClick={() => {
//                         setShowProfileUploadFlow(false);
//                         setProfilePicUpdatePreview(undefined);
//                     }}
//                 >
//                     <img src={CloseButton} alt="" />
//                 </button>

//                 <div className="profile-header-section flex-column centralize-x">
//                     <p className="section-header">Change your profile picture</p>
//                     <p className="description">
//                         <p className="desc-img-type">
//                             You can upload images in formats like <span>JPEG</span>, <span>PNG</span>, <span>GIF</span>, <span>BMP</span>, and{' '}
//                             <span>TIFF</span>. Keep your file under 5MB
//                         </p>
//                     </p>
//                 </div>
//             </div>
//             <div className="click-to-upload flex-row centralize-x centralize-y">
//                 <button id="upload-btn" className="flex-row centralize-x centralize-y " onClick={pickFile}>
//                     <Circle bg="#e0e0e0" height={220} width={220} key={1} img={''} noMg normalImage pd={1}>
//                         <Circle bg="white" height={210} width={210} key={1} pd={1} img={''} noMg normalImage>
//                             <div className="flex flex-col items-center gap-3">
//                                 <img className="flex justify-center" src={UploadPic} alt="" />
//                                 <p>
//                                     {selectedFile?.name
//                                         ? selectedFile.name.length > 20
//                                             ? selectedFile.name.slice(0, 20) + '...'
//                                             : selectedFile.name
//                                         : 'Click here to upload'}
//                                 </p>
//                             </div>
//                         </Circle>
//                     </Circle>
//                 </button>
//                 <input ref={fileInputRef} type="file" style={{ display: 'none' }} accept=".jpg,.png,.jpeg" onChange={handleFileChange} />
//             </div>

//             {/* <ProfileBrief
//         userType="vendor"
//         verificationStatus="unverified"
//         jobTitle={props.user?.profile?.bio ?? ''}
//         user={{ ...props.user }}
//         profilePic={VendorProfilePic}
//         previewImage={profilePicUpdatePreview ? profilePicUpdatePreview : undefined}
//         style={{
//             alignSelf: 'center',
//             justifyContent: 'center',
//             margin: '30px 0',
//         }}
//     /> */}

//             <div className="w-full relative">
//                 <div className="flex gap-5 items-center">
//                     <div className="h-[74px] w-[74px] rounded-full overflow-hidden">
//                         <img
//                             src={props.user.displayImage === '' ? ProfileIcon : props.user.displayImage}
//                             alt="image"
//                             className="w-full object-cover"
//                         />
//                     </div>
//                     <div className="space-y-1">
//                         <p className="text font-medium">
//                             {props.user.firstName} {props.user.lastName}
//                         </p>
//                         <p className="text-xs">{props.user.profile.bio}</p>
//                         <p className="uppercase max-w-[60px] text-white bg-black w-full rounded text-[8px] px-2 py-1">creative</p>
//                     </div>

//                     <p className="absolute top-2 right-7 bg-[#E0E0E0] text-[8px] rounded-2xl px-2 py-1  text-[#444444] text-">
//                         @{props.user.username}
//                     </p>
//                 </div>
//             </div>

//             <button
//                 className="rounded-3xl px-4 py-3 bg-[#A1A1A1] text-white mt-7"
//                 style={{
//                     backgroundColor: selectedFile ? '#ff0000' : '',
//                     minWidth: '100%',
//                 }}
//                 onClick={initProfilePicUpdate}
//             >
//                 {/* {getCloudUploadLinkIsLoading || updateUserIsLoading || updateUserProfileIsLoading ? (
//             <Spinner width="20px" height="20px" />
//         ) : (
//             'Change Profile Picture'
//         )} */}
//                 Change Profile Picture
//             </button>
//         </div>
//     );
// }
