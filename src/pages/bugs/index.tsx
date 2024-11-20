import { useState, useEffect } from 'react';
import BugReport from '../../assets/bugs-rep.svg';
import ArrowBackBlack from '../../assets/back-icon.svg';
import { useNavigate } from 'react-router-dom';
import { useGetLoggedInUserInfoQuery } from 'api/userApi';
import { useContactSupportMutation } from 'api/support';
import { toast } from 'react-toastify';

export default function Bugs() {
    const navigate = useNavigate();
    const { data: loggedInUserData } = useGetLoggedInUserInfoQuery(null);
    const loggedInUser = loggedInUserData?.data.user;
    const [subject, setSubject] = useState('');
    const [detail, setDetail] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const [contactSupport, { isLoading }] = useContactSupportMutation();

    useEffect(() => {
        setIsFormValid(subject.trim() !== '' && detail.trim() !== '');
    }, [subject, detail]);

    const goBack = () => {
        navigate(-1);
    };

    const handleSubmitTicket = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const ticketData = {
            name: `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
            email: loggedInUser?.email,
            subject,
            message: detail,
            type: 'Bug-Report',
        };
        try {
            await contactSupport(ticketData).unwrap();
            toast.success('Bug reported successfully');
            setSubject('');
            setDetail('');
        } catch (error) {
            console.error('Failed to submit the ticket: ', error);
            toast.error('Failed to submit the ticket');
        }
    };

    return (
        <div className="px-5 md:px-24 bg-[#F0F0F0] h-full md:h-screen leading-0 mt-[-18px]">
            <div className="bg-black border-solid border rounded-full w-10 m-0 hidden md:block md:ml-4 my-5 ">
                <img onClick={goBack} src={ArrowBackBlack} alt="arrow back" className="w-10 h-10 cursor-pointer" />
            </div>
            <div className="block md:flex justify-center gap-32 px-5 py-12">
                <div className="w-full md:w-1/2 overflow-hidden space-y-7">
                    <div className="">
                        <h3 className="text-3xl font-semibold">
                            Help us squash <span className="text-red-500">bugs</span>!
                        </h3>
                        <h3 className="text-3xl font-semibold">We want to serve you better!</h3>
                        <p className="text-sm w-full pt-5">
                            Spot a bug? Help us squash it! We're dedicated to delivering a seamless experience, and your feedback is crucial. Report
                            any bugs or glitches you encounter, and together, let's make our platform even better.
                        </p>
                    </div>

                    <div className="">
                        <img src={BugReport} alt="Bug report illustration" />
                    </div>

                    <div className="hidden md:block">
                        <h3 className="text-xl font-medium">Send us an email</h3>
                        <p className="underline text-blue-600">
                            <a href="mailto:help@blkat.io">help@blkat.io</a>
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 my-5 md:my-0">
                    <form className="bg-white rounded-md shadow-md w-full h-[480px] p-7 space-y-5" onSubmit={handleSubmitTicket}>
                        <div className="space-y-2">
                            <label htmlFor="issue">Issue</label>
                            <div className="">
                                <input
                                    type="text"
                                    name="issue"
                                    id="issue"
                                    className="w-full bg-[#E9E9E9] border-solid border border-[#DEDEDE] rounded p-2"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email">Email Address</label>
                            <div className="">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    disabled={true}
                                    className="w-full border-solid border bg-[#E9E9E9] border-[#DEDEDE] text-gray-400 rounded p-2"
                                    value={loggedInUser?.email || ''}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="detail">Details of the issue</label>
                            <div className="">
                                <textarea
                                    name="detail"
                                    id="detail"
                                    className="w-full h-44 border bg-[#E9E9E9] border-solid border-[#DEDEDE] rounded p-2"
                                    placeholder="Write in details, the issue you’re facing"
                                    value={detail}
                                    onChange={(e) => setDetail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#ff0000] text-white rounded-2xl w-full text-center p-2"
                            disabled={isLoading || !isFormValid}
                        >
                            {isLoading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
                <div className="block md:hidden">
                    <h3 className="text-md font-medium">Send us an email</h3>
                    <p className="underline text-blue-600">
                        <a href="mailto:help@blkat.io">help@blkat.io</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
