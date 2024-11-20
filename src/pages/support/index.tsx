import { useEffect, useState } from 'react';
import { RootState } from '../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OpenLink from '../../assets/open-link.svg';
import './style.scss';
import { DeactivateAccount } from '../../components/DeactivateAccount';
import SupportImage from '../../assets/support_hero.jpg';
import { toggleTalkToSupportModal } from '../../state/slices/supportSlice';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import BugReport from '../../assets/bugs-rep.svg';
// import Close from '../../assets/close-circle.png';
import Back from '../../assets/back-icon.svg';
import { useContactSupportMutation } from 'api/support';

const AccountSettings = () => {
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');
    const [detail, setDetail] = useState('');
    const { type: formType } = useSelector((state: RootState) => state.support);

    const [submitForm, { isLoading }] = useContactSupportMutation();

    useEffect(() => {
        if (!loggedUser) {
            navigate('/login');
        }
    }, [loggedUser, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submitForm({
            message: detail,
            name: loggedUser?.firstName + ' ' + loggedUser?.lastName,
            email: loggedUser?.email,
            subject: subject,
            type: 'Support-Request',
        });
    };

    return (
        <>
            {loggedUser && (
                <div className={`form-area ${formType} `}>
                    {formType === 'contact' ? (
                        <>
                            <div className="flex-row">
                                <div className="input-area">
                                    <label htmlFor="firstname">First Name</label>
                                    <div className="input">
                                        <input type="text" name="firstname" id="firstname" disabled={true} value={loggedUser.firstName} />
                                    </div>
                                </div>
                                <div className="input-area">
                                    <label htmlFor="lastname">Last Name</label>
                                    <div className="input">
                                        <input type="text" name="lastname" id="lastname" disabled={true} value={loggedUser.lastName} />
                                    </div>
                                </div>
                            </div>
                            <div className="input-area">
                                <label htmlFor="email">Email address</label>
                                <div className="input">
                                    <input type="email" name="email" id="email" disabled={true} value={loggedUser.email} />
                                </div>
                            </div>
                            <div className="input-area">
                                <label htmlFor="subject">Subject</label>
                                <div className="input">
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Subject"
                                    />
                                </div>
                            </div>
                            <div className="input-area flex-column">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    style={{ resize: 'none' }}
                                    id="message"
                                    value={detail}
                                    onChange={(e) => setDetail(e.target.value)}
                                    // placeholder="Write in details, the issue you’re facing"
                                />
                            </div>

                            <div className="submit_area">
                                <button type="submit" onClick={handleSubmit} style={{ cursor: 'pointer' }} className="bg-blue-500">
                                    {isLoading ? <Spinner width="20px" height="20px" /> : 'Send Message'}
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
            )}
        </>
    );
};

export default AccountSettings;

export const SupportPage = () => {
    const [selectPane, setSelectedPane] = useState<'account' | 'profile' | 'help'>('account');
    const navigate = useNavigate();
    const disptch = useDispatch();
    const { type: formType } = useSelector((state: RootState) => state.support);

    const goBack = () => {
        navigate(-1);
    };

    // const pane = {
    //     account: <AccountSettings />,
    //     profile: <AccountSettings />,
    //     help: <AccountSettings />,
    // };
    return (
        <>
            <div className="__support_page flex-column centralize-y" style={{ position: 'relative' }}>
                <div className="___container ">
                    <div className="_supp_cont flex-row">
                        <div className="left">
                            <div
                                style={{
                                    cursor: 'pointer',
                                    background: 'black',
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                className="link close flex-row centralize-y"
                                onClick={goBack}
                            >
                                <img src={Back} height={20} width={20} alt="Close" />
                            </div>
                            <div className="max-width">
                                <>
                                    <div className="pane_header flex-column">
                                        <h3>
                                            Talk to our <span>support</span>,
                                        </h3>
                                        <h3> we are happy to help you!</h3>
                                        <p className="desc">
                                            Don't hesitate to reach out; we're just a message away, ready to turn your concerns into solutions. Let's
                                            chat and make your experience with us the best it can be!"
                                        </p>
                                    </div>

                                    <div className="img_section">
                                        <img src={SupportImage} alt="" />
                                    </div>

                                    <div className="tabs flex-row centralize-y">
                                        <button
                                            className="tab"
                                            onClick={() => setSelectedPane('account')}
                                            style={{
                                                backgroundColor: selectPane === 'account' ? '#e9e9e9' : 'transparent',
                                            }}
                                        >
                                            General Inquiries
                                        </button>
                                        <button
                                            className="tab"
                                            onClick={() => setSelectedPane('profile')}
                                            style={{
                                                backgroundColor: selectPane === 'profile' ? '#e9e9e9' : 'transparent',
                                            }}
                                        >
                                            Sales & Partnership
                                        </button>
                                        <button
                                            className="tab"
                                            onClick={() => setSelectedPane('help')}
                                            style={{
                                                backgroundColor: selectPane === 'help' ? '#e9e9e9' : 'transparent',
                                            }}
                                        >
                                            Technical Support
                                        </button>
                                    </div>
                                </>
                            </div>
                            <div className="footer_sect">
                                <h5>Send us an email @</h5>
                                <div className="link open flex-row centralize-y" onClick={() => navigate('/terms')}>
                                    <p onClick={() => navigate('mailto:help@blkat.io')}>help@blkat.io</p>
                                    <img src={OpenLink} alt="" />
                                </div>
                            </div>
                        </div>

                        {/* <div className="pane">{pane[selectPane]}</div> */}
                    </div>
                </div>

                <DeactivateAccount />
            </div>
        </>
    );
};
