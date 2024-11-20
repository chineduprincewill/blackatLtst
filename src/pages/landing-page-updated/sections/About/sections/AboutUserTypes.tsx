import AboutItem, { IAboutItem } from '../components/AboutItem';

export default function AboutUserTypes() {
    return (
        <div className="flex flex-col gap-[3.75rem]">
            {ABOUT_USERTYPES_DATA.map((item) => (
                <AboutItem key={item.title} {...item} />
            ))}
        </div>
    );
}

const ABOUT_USERTYPES_DATA: IAboutItem[] = [
    {
        title: 'Executives',
        desc: 'BlackAt is uniquely tailored for executives who are neither SVPs, CMOs, nor CEOs, but are pivotal to their organizations. We provide a structured pathway for personal and professional development, including the assignment of personal assistants, masterclasses led by experienced leaders, and opportunities for global mentorship. Our tiered system recognizes and nurtures talent at local, regional, and global levels.',
    },
    {
        title: 'Vendors',
        desc: 'Vendors have the unique opportunity to showcase their capabilities and attract new business. By creating a business page on BlackAt, vendors can interact with top executives, engage with brands, and leverage these relationships for mutual success.',
    },
    {
        title: 'Creatives',
        theme: 'light',
        desc: "Our platform serves as a launchpad for creatives seeking growth. Whether you're an established professional or an emerging talent, BlackAt is your stage to connect with like-minded individuals and access exclusive events and opportunities.",
    },
];
