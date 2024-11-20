import FAQ from './components/FAQ';
import Features from './components/Features';
import GetStarted from './components/GetStarted';
import Hero from './components/Hero';

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <GetStarted />
            <FAQ />
        </>
    );
}
