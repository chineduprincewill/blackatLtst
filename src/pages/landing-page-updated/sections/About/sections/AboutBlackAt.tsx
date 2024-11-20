import AboutItem, { IAboutItem } from '../components/AboutItem';

export default function AboutBlackAt() {
    return (
        <div className="flex flex-col gap-[3.75rem]">
            {ABOUT_BLACKAT_DATA.map((item) => (
                <AboutItem key={item.title} {...item} />
            ))}
        </div>
    );
}

const ABOUT_BLACKAT_DATA: IAboutItem[] = [
    {
        title: 'Our mission',
        desc: (
            <p className="text-white">
                Welcome to <span className="font-bold text-white"> BlackAt</span> Platform, where our mission is to revolutionize the way black
                executives and agencies connect, grow, and succeed in today's dynamic business world.
            </p>
        ),
    },
    {
        title: 'Our vision',
        desc: (
            <p className="text-white">
                At <span className="font-bold text-white">BlackAt</span>, we believe in unlocking the potential of every black executive and vendor.
                We are dedicated to creating a vibrant ecosystem where C-suite executives, who are at the heart of our community, can thrive beyond
                traditional roles. Our platform is not just about business transactions; it's about fostering relationships, sharing knowledge, and
                achieving personal growth.
            </p>
        ),
    },
    {
        title: 'Join Us in Redefining Access',
        theme: 'light',
        desc: (
            <p className="text-white">
                We've long talked about access and opportunity. Now, we're making it a reality.<span className="font-bold text-white"> BlackAt</span>{' '}
                Platform is not just a platform; it's a movement. Join us in creating a world where every black executive and agency can reach
                unparalleled heights of success.Together, we grow, succeed, and lead. Welcome to BlackAt Platform - where opportunities are endless,
                and growth is a constant journey.
            </p>
        ),
    },
];
