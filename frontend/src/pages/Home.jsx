import React, { useState } from 'react';
import './Home.css';

export default function Home({
                                 onNavigateToCatalog,
                                 onNavigateToCart,
                                 onNavigateToProfile,
                             }) {
    const [selectedGuitarist, setSelectedGuitarist] = useState(null);

    const guitarists = [
        {
            id: 'jimi-hendrix',
            name: 'Jimi Hendrix',
            style: 'Stratocaster • Blues Rock',
            image: '/images/guitarists/jimi-hendrix.jpg',
        },
        {
            id: 'eric-clapton',
            name: 'Eric Clapton',
            style: 'Stratocaster • Blues',
            image: '/images/guitarists/eric-clapton.jpg',
        },
        {
            id: 'jimmy-page',
            name: 'Jimmy Page',
            style: 'Les Paul • Rock',
            image: '/images/guitarists/jimmy-page.jpg',
        },
        {
            id: 'eddie-van-halen',
            name: 'Eddie Van Halen',
            style: 'Superstrat • Hard Rock',
            image: '/images/guitarists/eddie-van-halen.jpg',
        },
        {
            id: 'carlos-santana',
            name: 'Carlos Santana',
            style: 'PRS • Latin Rock',
            image: '/images/guitarists/carlos-santana.jpg',
        },
        {
            id: 'mark-knopfler',
            name: 'Mark Knopfler',
            style: 'Stratocaster • Rock',
            image: '/images/guitarists/mark-knopfler.jpg',
        },
        {
            id: 'stevie-ray-vaughan',
            name: 'Stevie Ray Vaughan',
            style: 'Stratocaster • Blues',
            image: '/images/guitarists/stevie-ray-vaughan.jpg',
        },
    ];

    const handleGuitaristClick = (guitarist) => {
        setSelectedGuitarist(guitarist);
        if (onNavigateToCatalog) {
            onNavigateToCatalog(guitarist.id);
        }
    };

    return (
        <div className="home-container">
            <header className="riff-navbar">
                <div className="nav-container">
                    <nav className="nav-left">
                        <button className="nav-link active">HOME</button>
                        <button
                            className="nav-link"
                            onClick={() => onNavigateToCatalog && onNavigateToCatalog()}
                        >
                            CATÁLOGO
                        </button>
                    </nav>

                    <div className="nav-brand">Riff Store</div>

                    <div className="nav-right">
                        <button className="icon-btn" onClick={onNavigateToCart} title="Carrinho">
                            🛒
                        </button>
                        <button className="icon-btn" onClick={onNavigateToProfile} title="Perfil">
                            👤
                        </button>
                    </div>
                </div>
            </header>

            <section className="hero-gif-section">
                <img
                    src="/videos/homeguitargif.gif"
                    alt="Guitar Animation"
                    className="bg-gif"
                />
            </section>

            <section className="guitarists-section">
                <div className="section-header">
                    <div>
                        <span className="section-tag">LENDAS DO ROCK</span>
                        <h2 className="section-title">Inspiradas por gigantes.</h2>
                    </div>
                    <p className="section-description">
                        Descubra os modelos e tonalidades que moldaram gerações e marcaram os maiores solos do mundo.
                    </p>
                </div>

                <div className="guitarists-grid">
                    {guitarists.map((g) => (
                        <div
                            key={g.id}
                            className={`guitarist-card ${
                                selectedGuitarist?.id === g.id ? 'active' : ''
                            }`}
                            onClick={() => handleGuitaristClick(g)}
                        >
                            <img src={g.image} alt={g.name} className="card-bg-image" />
                            <div className="card-overlay">
                                <span className="card-style">{g.style}</span>
                                <h3 className="card-name">{g.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}