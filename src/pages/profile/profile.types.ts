import { UserInfoFromApi } from 'api/authApi';

interface TStatus {
    activated: boolean;
    emailVerified: boolean;
}

interface TSettings {
    joinDate: string;
    isBlocked: boolean;
    lastLogin: string;
    suggestUpgrade: boolean;
}

interface TSocials {
    x: string;
    linkedIn: string;
}

interface TProfileStats {
    followersCount: number;
    followingCount: number;
}

interface TProfile {
    id: string;
    location: string;
    address: string;
    socials: TSocials;
    bio: string;
    about: string;
    phone: string;
    profileStats: TProfileStats;
    created: boolean;
}

type TRoleName = 'executive' | 'creative' | 'vendor';

interface TRole {
    name: TRoleName;
}

interface TEducation {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    profileId: string;
    createdAt: string;
    updatedAt: string;
}

interface TExperience {
    id: string;
    role: string;
    company: string;
    employmentType: string;
    location: string;
    startDate: string;
    endDate: string | null;
    isCurrentWorkplace: boolean;
    profileId: string;
    createdAt: string;
    updatedAt: string;
}

interface TSkillset {
    id: string;
    interests: string[];
    skillSet: string[];
    industry: string[];
    profileId: string;
    createdAt: string;
    updatedAt: string;
}

interface TUser {
    username: string;
    firstName: string;
    lastName: string;
    displayImage: string;
    role: TRole;
}

export interface TUserProfile extends UserInfoFromApi {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    otherName: string | null;
    gender: string;
    displayImage: string;
    username: string;
    status: TStatus;
    referrals: number;
    createdAt: string;
    updatedAt: string;
    settings: TSettings;
    profile: TProfile;
    role: TRole;
    bio: string;
    location: string;
    address: string | null;
    socials: TSocials;
    about: string;
    phone: string;
    userId: string;
    villageId: string | null;
    communityId: string | null;
    profileStats: TProfileStats;
    education: TEducation[];
    experience: TExperience[];
    skillset: TSkillset;
    user: TUser;
}
