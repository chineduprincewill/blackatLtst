import React, { useState, ChangeEvent } from 'react';
import { useUpdateProfileMutation } from '../../../api/profileApi';
import SettingsLayout from '../SettingsLayout';

export default function EditProfile() {
    const [bio, setBio] = useState('');
    const [about, setAbout] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [socials, setSocials] = useState({
        x: '',
        linkedIn: '',
    });
    const [updateProfile, { isLoading, isError, isSuccess }] = useUpdateProfileMutation();

    const handleSubmit = async () => {
        const updateData = {
            bio,
            about,
            phone,
            location,
            socials,
        };
        await updateProfile(updateData);
    };

    return (
        <>
            <SettingsLayout pageHeader="Edit Profile" subtitle="See your profile information like name, location and date of birth">
                <form
                    className=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <div className="w-full md:w-[70%] flex flex-col space-y-5">
                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            placeholder="Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            placeholder="About"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            name="x"
                            placeholder="Social X Handle (e.g., www.x.com/userHandle)"
                            value={socials.x}
                            onChange={(e) => setSocials({ ...socials, x: e.target.value })}
                        />
                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            name="linkedIn"
                            placeholder="LinkedIn ID (e.g., www.linkedIn.com/userId)"
                            value={socials.linkedIn}
                            onChange={(e) => setSocials({ ...socials, linkedIn: e.target.value })}
                        />

                        <button type="submit" className="text-black text-xs bg-[#E9E9E9] w-32 p-3 rounded-3xl" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Save'}
                        </button>
                        {isError && <p className="text-red-500">Failed to update profile.</p>}
                        {isSuccess && <p className="text-green-500">Profile updated successfully!</p>}
                    </div>
                </form>
            </SettingsLayout>
        </>
    );
}
