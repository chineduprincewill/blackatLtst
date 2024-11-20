import React from 'react';

export interface IAboutItem {
    title: string;
    desc: React.ReactNode;
    theme?: 'primary' | 'light';
}

export default function AboutItem({ title, desc, theme = 'primary' }: IAboutItem) {
    return (
        <div className="flex flex-col gap-8">
            <h3 className={`text-4xl md:text-5xl dakdo uppercase ${theme === 'primary' ? 'text-[#F04950]' : 'text-white'}`}>{title}</h3>
            <div className="text-base text-white md:text-xl">{desc}</div>
        </div>
    );
}
