import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProfileState {
    show: boolean;
    stageToStartFrom: UpdateProfileFlowStages;
    modalType: 'create' | 'update';
    showProfilePicUploadFlow?: boolean;
    progress: number;
}

const initialState: ProfileState = {
    show: false,
    stageToStartFrom: 'profile-creation',
    showProfilePicUploadFlow: false,
    modalType: 'update',
    progress: 0,
};

export type UpdateProfileFlowStages = 'profile-creation' | 'education' | 'experience' | 'skillset';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        toggleProfileFormModal: (
            state,
            action: PayloadAction<{
                show: boolean;
                modalType?: ProfileState['modalType'];
                stageToStartFrom?: UpdateProfileFlowStages;
                showProfilePicUploadFlow?: boolean;
            }>,
        ) => {
            state.show = action.payload.show;
            state.stageToStartFrom = action.payload.stageToStartFrom ?? 'profile-creation';
            state.modalType = action.payload.modalType ?? 'update';
            state.showProfilePicUploadFlow = action.payload.showProfilePicUploadFlow ?? false;
        },
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
    },
});

export const { toggleProfileFormModal, setProgress } = profileSlice.actions;
export type { ProfileState };
export default profileSlice.reducer;
