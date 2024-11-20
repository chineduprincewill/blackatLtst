import { Navigate, useParams } from 'react-router-dom';

export default function RedirectToSearchedProfile() {
    const { username } = useParams();
    return <Navigate replace to={`/userprofile/${username}`} />;
}
