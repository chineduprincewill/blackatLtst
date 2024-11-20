import ChatIcon from '@assets/chat-icon.svg';
import IntercomIcon from '@assets/intercom-icon.svg';
import MessageIcon from '@assets/message-icon.svg';

export default function Contact() {
    return (
        <div className="container px-4 mx-auto">
            <div className="flex flex-col mt-12 md:flex-row md:mt-24 gap-y-12">
                <div className="flex flex-wrap items-center md:items-start  flex-col  justify-center md:justify-start md:flex-col w-full md:w-2/5 lg:w-max gap-20 md:pr-16 md:border-r border-solid border-r-[#B3B3B3] pt-8">
                    <div className="flex flex-col gap-6 w-max">
                        <div className="flex items-center justify-center gap-4 md:justify-start">
                            <img src={MessageIcon} />
                            <h4 className="dakdo text-white text-[2rem]">EMAIL US</h4>
                        </div>
                        <button className="bg-white rounded-10 h-16 px-10 text-[#333]">hello@blkat.io</button>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-center gap-4 md:justify-start">
                            <img src={ChatIcon} />
                            <h4 className="dakdo text-white text-[2rem]">CHAT US</h4>
                        </div>
                        <div className="flex w-full">
                            <button className="bg-white rounded-10 h-16 px-10 text-[#333]">
                                <img src={IntercomIcon} className="object-contain" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full max-w-3xl gap-8 px-6 lg:max-w-3xl md:w-3/5 md:px-20 lg:w-4/5">
                    <h2 className="text-4xl text-white md:text-5xl dakdo">SEND US A MESSAGE</h2>
                    <section className="flex flex-col gap-4">
                        <label htmlFor="name" className="font-medium text-white">
                            Your name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Input your name"
                            className="p-4 rounded-10 bg-[#B3B3B3] placeholder:text-[#959595] text-black focus:bg-white focus:text-black"
                        />
                    </section>
                    <section className="flex flex-col gap-4">
                        <label htmlFor="email" className="font-medium text-white">
                            Your email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Input your email"
                            className="p-4 rounded-10 bg-[#B3B3B3] placeholder:text-[#959595] text-black focus:bg-white invalid:outline-red-600 focus:text-black"
                        />
                    </section>
                    <section className="flex flex-col gap-4">
                        <label htmlFor="message" className="font-medium text-white">
                            Your name
                        </label>
                        <textarea
                            rows={6}
                            id="message"
                            placeholder="what would you love us to know?"
                            className="p-4 rounded-10 bg-[#B3B3B3] placeholder:text-[#959595] text-black focus:bg-white focus:text-black"
                        />
                    </section>
                    <div className="flex justify-end">
                        <button className="px-10 py-4 font-medium text-black bg-white rounded-full">Send message</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
