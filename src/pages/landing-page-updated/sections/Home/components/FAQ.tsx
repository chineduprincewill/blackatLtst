import { useState } from 'react';

import MinusWhite from '@assets/minus.svg';
import PlusWhite from '@assets/plus-white.svg';

export default function FAQ() {
    const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        if (selectedFaq === index) {
            setSelectedFaq(null);
        } else {
            setSelectedFaq(index);
        }
    };

    return (
        <div className="flex justify-center bg-black">
            <div className="mt-24 md:mt-[200px] container px-4">
                <h1 className="text-white text-4xl md:text-[4rem] dakdo text-center">FREQUENTLY ASKED QUESTIONS</h1>
                <div className="flex flex-col max-w-4xl gap-4 mx-auto mt-20">
                    {FAQS.map(({ question, answer }, index) => (
                        <div className="flex flex-col bg-[#222222AA] rounded-2xl backdrop-blur-[2.5px] border border-solid border-white/10">
                            <button onClick={() => toggleFaq(index)} className="flex justify-between w-full px-6 py-4">
                                <div className="flex items-center justify-between w-full">
                                    <h1 className="text-sm text-left text-white md:text-lg">{question}</h1>
                                    <img src={selectedFaq === index ? MinusWhite : PlusWhite} className="size-6 md:size-8" />
                                </div>
                            </button>
                            <p
                                className={` duration-300 transition-all ease-in-out overflow-hidden px-6 ${
                                    selectedFaq === index ? 'max-h-[1000px]' : 'max-h-0'
                                } `}
                            >
                                <div className="py-4 text-[#898989] leading-5 text-xs md:text-base">{answer}</div>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const FAQS = [
    {
        question: 'How do i join BlackAt?',
        answer: 'You can join BlackAt by creating an account and signing up for our events. You can also join our Discord server and ask questions in our community forums.',
    },
    {
        question: 'Is BlackAt Platform only for executives',
        answer: 'No. BlackAt is a platform that connects you with diverse businesses. We are committed to connecting you with the right individuals for your team.',
    },
    {
        question: 'Is BlackAt Platform only for executives',
        answer: 'No. BlackAt is a platform that connects you with diverse businesses. We are committed to connecting you with the right individuals for your team.',
    },
    {
        question: 'Is BlackAt Platform only for executives',
        answer: 'No. BlackAt is a platform that connects you with diverse businesses. We are committed to connecting you with the right individuals for your team.',
    },
    {
        question: 'Is BlackAt Platform only for executives',
        answer: 'No. BlackAt is a platform that connects you with diverse businesses. We are committed to connecting you with the right individuals for your team.',
    },
    {
        question: 'Is BlackAt Platform only for executives',
        answer: 'No. BlackAt is a platform that connects you with diverse businesses. We are committed to connecting you with the right individuals for your team.',
    },
];
