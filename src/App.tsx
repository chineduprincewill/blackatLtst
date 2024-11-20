import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource-variable/plus-jakarta-sans';
import 'react-dropzone-uploader/dist/styles.css';
import './pages/my-village/Villages/villagesstyle.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LandingPage from '@pages/landing-page-updated/LandingPage';
import About from '@pages/landing-page-updated/sections/About';
import Contact from '@pages/landing-page-updated/sections/Contact';
import OurEvents from '@pages/landing-page-updated/sections/Events';
import Home from '@pages/landing-page-updated/sections/Home';
import RedirectToSearchedProfile from '@pages/profile/RedirectToSearchedProfile';

import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import NavigationContainer from './components/NavigationContainer';
import NavigationContainerWithSidebar from './components/NavigationContainerWithSidebar';
import NotificationsNew from './components/NotificationNew';
import Bugs from './pages/bugs';
import Connections from './pages/connections';
import { CreateAccount } from './pages/createAccount';
import { EnterName } from './pages/enterName';
import EventDetail from './pages/eventDetail';
import Events from './pages/events';
import { FeedsSection } from './pages/feeds/components/FeedSection';
import { FeedRouteContainer } from './pages/feeds/FeedRouteContainer';
import { Feeds } from './pages/feeds/Feeds';
import { MessengerView } from './pages/feeds/MessageView';
import { ForgotPassword } from './pages/forgotPassword';
import Jobs from './pages/jobs';
import ViewJob from './pages/jobs/subPages/ViewJob';
import MasterClass from './pages/masterClass';
import MasterClassUpload from './pages/masterClass/subPages/MasterClassUpload';
import MasterClassView from './pages/masterClass/subPages/MasterClassView';
import MentorshipBooking from './pages/Mentorship/subPages/MentorshipBooking';
import MentorshipBookingDetails from './pages/Mentorship/subPages/MentorshipBookingDetails';
import MentorshipTopics from './pages/Mentorship/subPages/MentorshipTopics';
import Community from './pages/my-village/Community';
import TestCommunity from './pages/my-village/Community/TestCommunity';
import MyVillage from './pages/my-village/MyVillage';
import Village from './pages/my-village/Village';
import NotificationsMobile from './pages/notifications';
import { PersonalInfo } from './pages/personalInfo';
import { Profile, SearchedProfile } from './pages/profile';
import { CommingSoon } from './pages/profile/CommingSoon';
import { Questionnaire } from './pages/questionaire';
import Sample from './pages/sample';
import { SelectUserType } from './pages/selectUserType';
import { SetPassword } from './pages/setPassword';
import AccountInformation from './pages/settings-new/AccountSettings/AccountInformation';
import ChangePassword from './pages/settings-new/AccountSettings/ChangePassword';
import CloseAccount from './pages/settings-new/AccountSettings/CloseAccount';
import EditProfile from './pages/settings-new/AccountSettings/EditProfile';
import SettingsPageLayout from './pages/settings-new/layout/SettingsPageLayout';
import SettingsAccount from './pages/settings-new/SettingsAccount';
import SettingsHelpSupport from './pages/settings-new/SettingsHelpSupport';
import ContactSupport from './pages/settings-new/SettingsHelpSupport/ContactSupport';
import Faqs from './pages/settings-new/SettingsHelpSupport/Faqs';
import SettingsMobile from './pages/settings-new/SettingsMobile';
import SettingsNotifications from './pages/settings-new/SettingsNotifications';
import SettingsPrivacy from './pages/settings-new/SettingsPrivacy';
import SettingsSecurity from './pages/settings-new/SettingsSecurity';
import BlockedPeople from './pages/settings-new/SettingsSecurity/BlockedPeople';
import { SetUserName } from './pages/setUserName';
import { SupportPage } from './pages/support';
import { Survey } from './pages/survey';
import { Terms } from './pages/Terms';
import UserInfo from './pages/userInfo';
import { VerifyAccount } from './pages/verifyAccount';
import { WelcomeBack } from './pages/welcomeBack';
import ScrollToTop from './ScrollToTop';
import { MessagingProvider } from '@components/NavigationContainer/MessagingHook';

function App() {
    return (
        <div>
            <BrowserRouter>
                <ScrollToTop />
                <ToastContainer position="top-center" limit={2} />
                <CommingSoon />
                <NotificationsNew />

                <Routes>
                    <Route path="/sample" element={<Sample />} />
                    <Route path="/" element={<LandingPage />}>
                        <Route index element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/our-events" element={<OurEvents />} />
                        <Route path="/contact" element={<Contact />} />
                    </Route>
                    <Route path="/:page" element={<LandingPage />} />
                    <Route path="/login" element={<WelcomeBack />} />
                    <Route path="/create-acc" element={<CreateAccount />} />
                    <Route path="/name" element={<EnterName />} />
                    <Route path="/username" element={<SetUserName />} />
                    <Route path="/verify" element={<VerifyAccount />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ForgotPassword />} />
                    <Route path="/password" element={<SetPassword />} />
                    <Route path="/personal-info" element={<PersonalInfo />} />
                    <Route path="/user-type" element={<SelectUserType />} />
                    <Route path="/user-info/:userType" element={<UserInfo />} />
                    <Route path="/questionaire/:userType" element={<Questionnaire />} />
                    <Route path="/survey" element={<Survey />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/masterclass-upload/:id" element={<MasterClassUpload />} />

                    {/* Protected Routes with Messaging */}
                    <Route
                        path="/"
                        element={
                            <AuthenticatedRoute
                                component={
                                    <MessagingProvider>
                                        <NavigationContainer />
                                    </MessagingProvider>
                                }
                            />
                        }
                    >
                        <Route path="/notifications" element={<NotificationsMobile />} />
                        <Route path="/report-bug" element={<Bugs />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/userprofile/:id/:username" element={<RedirectToSearchedProfile />} />
                        <Route path="/userprofile/:username" element={<SearchedProfile />} />
                        <Route path="/settings-mobile" element={<SettingsMobile />} />

                        {/* SETTINGS */}
                        <Route path="/settings" element={<SettingsPageLayout />}>
                            <Route index element={<SettingsAccount />} />
                            <Route path="/settings/my-account" element={<SettingsAccount />} />
                            <Route path="/settings/edit-profile" element={<EditProfile />} />
                            <Route path="/settings/notifications" element={<SettingsNotifications />} />
                            <Route path="/settings/account-information" element={<AccountInformation />} />
                            <Route path="/settings/change-password" element={<ChangePassword />} />
                            <Route path="/settings/close-account" element={<CloseAccount />} />
                            <Route path="/settings/blocked-users" element={<BlockedPeople />} />
                            <Route path="/settings/security" element={<SettingsSecurity />} />
                            <Route path="/settings/privacy" element={<SettingsPrivacy />} />
                            <Route path="/settings/help" element={<SettingsHelpSupport />} />
                            <Route path="/settings/contact-support" element={<ContactSupport />} />
                            <Route path="/settings/help/faqs" element={<Faqs />} />
                        </Route>

                        {/* Routes with Sidebar */}
                        <Route element={<NavigationContainerWithSidebar />}>
                            {/* FEEDS */}
                            <Route path="/feeds" element={<FeedRouteContainer />}>
                                <Route index element={<Feeds />} />
                                <Route path="/feeds/:postId" element={<FeedsSection />} />
                            </Route>

                            {/* JOBS */}
                            <Route path="/jobs" element={<Jobs />} />
                            <Route path="/jobs/:id" element={<ViewJob />} />

                            {/* MENTORSHIP */}
                            <Route path="/mentorship" element={<MentorshipTopics />} />
                            <Route path="/mentorship/booking" element={<MentorshipBooking />} />
                            <Route path="/mentorship/booking/:id" element={<MentorshipBookingDetails />} />

                            {/* MASTERCLASS */}
                            <Route path="/masterclass" element={<MasterClass />} />
                            <Route path="/masterclass/:id" element={<MasterClassView />} />

                            {/* MY VILLAGE */}
                            <Route path="/village" element={<MyVillage />} />
                            <Route path="/village/:id" element={<Village />} />

                            {/* COMMUNITY */}
                            <Route path="/community/:id" element={<Community />} />

                            {/* MESSAGES */}
                            <Route path="/messages" element={<MessengerView />} />

                            {/* CONNECTIONS */}
                            <Route path="/connections" element={<Connections />} />

                            {/* EVENTS */}
                            <Route path="/events" element={<Events />} />
                            <Route path="/events/:id" element={<EventDetail />} />

                            <Route path="/test-community" element={<TestCommunity />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
