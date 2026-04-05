"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [typingText, setTypingText] = useState("");
    const fullText = "Transforming ideas into interactive digital reality.";

    // Preloader Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15) + 5;
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Typewriter Logic
    useEffect(() => {
        if (!isLoading) {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i <= fullText.length) {
                    setTypingText(fullText.slice(0, i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50);
            return () => clearInterval(typingInterval);
        }
    }, [isLoading]);

    useEffect(() => {
        // Year
        document.getElementById('year').textContent = new Date().getFullYear();

        // Navbar Scroll Effect
        const navbar = document.querySelector('.navbar');
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);

        // Mobile Nav
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-links a');

        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        };
        hamburger.addEventListener('click', toggleMenu);

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Intersection Observer for Scroll Reveal
        const revealElements = document.querySelectorAll('.reveal, .reveal-right');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

        // Animations
        let cursorReqId;
        const cleanupList = [];

        if (window.matchMedia("(min-width: 992px)").matches) {
            
            // 1. Custom Smooth Cursor
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            cursor.style.opacity = '0'; 
            document.body.appendChild(cursor);
            cleanupList.push(() => {
                if(document.body.contains(cursor)) document.body.removeChild(cursor);
            });

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let cursorX = mouseX;
            let cursorY = mouseY;

            const onMouseMoveCursor = (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.opacity = '1';
            };
            document.addEventListener('mousemove', onMouseMoveCursor);
            cleanupList.push(() => document.removeEventListener('mousemove', onMouseMoveCursor));

            const animateCursor = () => {
                cursorX += (mouseX - cursorX) * 0.15;
                cursorY += (mouseY - cursorY) * 0.15;
                cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
                cursorReqId = requestAnimationFrame(animateCursor);
            };
            animateCursor();

            // Cursor hover states
            const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .contact-card, .social-links a');
            interactiveElements.forEach(el => {
                const addHover = () => cursor.classList.add('hovering');
                const rmHover = () => cursor.classList.remove('hovering');
                el.addEventListener('mouseenter', addHover);
                el.addEventListener('mouseleave', rmHover);
                cleanupList.push(() => {
                    el.removeEventListener('mouseenter', addHover);
                    el.removeEventListener('mouseleave', rmHover);
                });
            });

            // 2. Magnetic Buttons
            const magneticElements = document.querySelectorAll('.btn');
            magneticElements.forEach(btn => {
                const onBtnMove = (e) => {
                    const rect = btn.getBoundingClientRect();
                    const h = rect.width / 2;
                    const v = rect.height / 2;
                    const x = e.clientX - rect.left - h;
                    const y = e.clientY - rect.top - v;
                    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                };
                const onBtnLeave = () => {
                    btn.style.transform = `translate(0px, 0px)`;
                };
                btn.addEventListener('mousemove', onBtnMove);
                btn.addEventListener('mouseleave', onBtnLeave);
                cleanupList.push(() => {
                    btn.removeEventListener('mousemove', onBtnMove);
                    btn.removeEventListener('mouseleave', onBtnLeave);
                });
            });

            // 3. 3D Tilt Effect
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                const onCardMove = (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -8; 
                    const rotateY = ((x - centerX) / centerX) * 8;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                };
                const onCardLeave = () => {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                };
                card.addEventListener('mousemove', onCardMove);
                card.addEventListener('mouseleave', onCardLeave);
                cleanupList.push(() => {
                    card.removeEventListener('mousemove', onCardMove);
                    card.removeEventListener('mouseleave', onCardLeave);
                });
            });
        }

        // 4. Spotlight Hover Glow
        const glowCards = document.querySelectorAll('.project-card, .glass-card, .skill-card');
        glowCards.forEach(card => {
            const onGlowMove = e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            };
            card.addEventListener('mousemove', onGlowMove);
            cleanupList.push(() => card.removeEventListener('mousemove', onGlowMove));
        });

        // 5. Lenis
        let lenisReqId;
        const initLenis = async () => {
            const Lenis = (await import('lenis')).default;
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
            });
            function raf(time) {
                lenis.raf(time);
                lenisReqId = requestAnimationFrame(raf);
            }
            lenisReqId = requestAnimationFrame(raf);
            cleanupList.push(() => {
                cancelAnimationFrame(lenisReqId);
                lenis.destroy();
            });
        };
        initLenis();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            hamburger.removeEventListener('click', toggleMenu);
            if(cursorReqId) cancelAnimationFrame(cursorReqId);
            cleanupList.forEach(fn => fn());
            revealObserver.disconnect();
        };
    }, []);

    return (
        <>
            {/* Preloader */}
            <div className={`preloader ${!isLoading ? 'fade-out' : ''}`}>
                <h1 className="preloader-title">Bảo<span>.Dev</span></h1>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="ambient-glow glow-1"></div>
            <div className="ambient-glow glow-2"></div>
            <div className="ambient-glow glow-3"></div>

            <nav className="navbar">
                <div className="nav-container">
                    <a href="#" className="logo">
                        <div className="logo-box">B</div>
                        BảoPhong<span>.</span>
                    </a>
                    <ul className="nav-links">
                        <li><a href="#about">About</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Work</a></li>
                        <li><a href="#contact" className="btn-contact-nav">Contact</a></li>
                    </ul>
                    <div className="hamburger">
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
            </nav>

            <main>
                <section id="hero" className="hero-section">
                    <div className="container hero-content">
                        <div className="hero-text reveal">
                            <p className="greeting">Hi 👋, I'm</p>
                            <h1 className="title">Bảo Phong</h1>
                            <h2 className="subtitle">
                                <span className="gradient-text">Frontend Developer</span> & <br/> UI/UX Learner
                            </h2>
                            <div style={{height: "30px", marginBottom: "1rem"}}>
                                <p className="description" style={{margin: 0, fontFamily: "monospace", color: "var(--accent-1)", fontSize: "1.05rem"}}>
                                    &gt; {typingText}<span className="blinking-cursor">|</span>
                                </p>
                            </div>
                            <p className="description">
                                Passionate about crafting beautiful, intuitive, and highly functional web experiences. Based in Vietnam.
                            </p>
                            <div className="cta-group">
                                <a href="#projects" className="btn btn-primary">View My Work <i className="fas fa-arrow-right"></i></a>
                                <a href="https://github.com/baophong26" target="_blank" className="btn btn-icon"><i className="fab fa-github"></i></a>
                            </div>
                        </div>
                        <div className="hero-image reveal-right">
                            <div className="image-wrapper">
                                <img src="/baophong26/assets/profile.jpg" alt="Bảo Phong Profile" id="profile-img" onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=600&auto=format&fit=crop'}} />
                                <div className="floating-badge badge-1"><i className="fab fa-js"></i></div>
                                <div className="floating-badge badge-2"><i className="fab fa-react"></i></div>
                                <div className="floating-badge badge-3"><i className="fab fa-figma"></i></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about" className="about-section pt-section">
                    <div className="container pb-section">
                        <div className="section-header reveal">
                            <h2 className="section-title">About Me</h2>
                            <div className="line"></div>
                        </div>
                        <div className="about-content">
                            <div className="glass-card full-width reveal">
                                <p>I am a highly motivated Frontend Developer and UI/UX Learner from Vietnam. I believe in the power of design to enhance user experiences, merging artistic aesthetics with highly functional logic.</p>
                                <p>Currently, my core focus is building responsive, accessible, and performant web applications using modern web technologies. I spend my free time exploring new design trends, learning new frameworks, and refining my coding skills.</p>
                                
                                <div className="stats">
                                    <div className="stat-item">
                                        <h3>2+</h3>
                                        <p>Years Coding</p>
                                    </div>
                                    <div className="stat-item">
                                        <h3>15+</h3>
                                        <p>Projects Completed</p>
                                    </div>
                                    <div className="stat-item">
                                        <h3>100%</h3>
                                        <p>Commitment</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="skills" className="skills-section">
                    <div className="container pb-section">
                        <div className="section-header reveal">
                            <h2 className="section-title">My Skills</h2>
                            <div className="line"></div>
                        </div>
                        <div className="skills-grid">
                            <div className="skill-card reveal">
                                <i className="fab fa-html5" style={{color: "#e34f26"}}></i>
                                <h3>HTML5</h3>
                            </div>
                            <div className="skill-card reveal" style={{transitionDelay: "100ms"}}>
                                <i className="fab fa-css3-alt" style={{color: "#1572b6"}}></i>
                                <h3>CSS3</h3>
                            </div>
                            <div className="skill-card reveal" style={{transitionDelay: "200ms"}}>
                                <i className="fab fa-js-square" style={{color: "#f7df1e"}}></i>
                                <h3>JavaScript</h3>
                            </div>
                            <div className="skill-card reveal" style={{transitionDelay: "300ms"}}>
                                <i className="fab fa-react" style={{color: "#61dafb"}}></i>
                                <h3>React</h3>
                            </div>
                            <div className="skill-card reveal" style={{transitionDelay: "400ms"}}>
                                <i className="fab fa-figma" style={{color: "#f24e1e"}}></i>
                                <h3>Figma</h3>
                            </div>
                            <div className="skill-card reveal" style={{transitionDelay: "500ms"}}>
                                <i className="fab fa-git-alt" style={{color: "#f05032"}}></i>
                                <h3>Git & GitHub</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="hobbies" className="skills-section">
                    <div className="container pb-section">
                        <div className="section-header reveal">
                            <h2 className="section-title">Personal Hobbies</h2>
                            <div className="line"></div>
                        </div>
                        <div className="skills-grid">
                            <div className="skill-card reveal">
                                <i className="fas fa-gamepad" style={{color: "#b224ef"}}></i>
                                <h3>Gaming</h3>
                            </div>
                            <div className="skill-card reveal" style={{transitionDelay: "100ms"}}>
                                <i className="fas fa-book" style={{color: "#00f2fe"}}></i>
                                <h3>Reading</h3>
                            </div>
                            <div className="skill-card reveal" style={{transitionDelay: "200ms"}}>
                                <i className="fas fa-running" style={{color: "#4facfe"}}></i>
                                <h3>Sports</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects" className="projects-section pt-section">
                    <div className="container pb-section">
                        <div className="section-header reveal">
                            <h2 className="section-title">Featured Work</h2>
                            <div className="line"></div>
                        </div>
                        <div className="projects-grid">
                            <div className="project-card reveal">
                                <div className="project-img">
                                    <div className="img-overlay">
                                        <a href="https://github.com/binhcuong1/cinema-project" target="_blank" className="btn-view"><i className="fab fa-github"></i> View GitHub</a>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop" alt="Cineplex Web App" />
                                </div>
                                <div className="project-info">
                                    <span className="project-badge">Web App</span>
                                    <h3>Web Rạp Chiếu Phim</h3>
                                    <p>A full-stack cinema booking application featuring an intuitive frontend interface and robust backend services.</p>
                                    <div className="project-tech">
                                        <span>Node.js</span>
                                        <span>HTML/CSS</span>
                                        <span>JavaScript</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="project-card reveal" style={{transitionDelay: "150ms"}}>
                                <div className="project-img">
                                    <div className="img-overlay">
                                        <a href="https://github.com/binhcuong1/attendance-app" target="_blank" className="btn-view"><i className="fab fa-github"></i> View GitHub</a>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Attendance App" />
                                </div>
                                <div className="project-info">
                                    <span className="project-badge">Mobile App</span>
                                    <h3>Attendance App</h3>
                                    <p>A digital attendance tracking application designed to streamline check-ins with a modern and user-friendly interface.</p>
                                    <div className="project-tech">
                                        <span>Dart/Flutter</span>
                                        <span>Frontend</span>
                                        <span>UI/UX</span>
                                    </div>
                                </div>
                            </div>

                            <div className="project-card reveal" style={{transitionDelay: "300ms"}}>
                                <div className="project-img">
                                    <div className="img-overlay">
                                        <a href="https://github.com/Tri107/FurnitureWeb" target="_blank" className="btn-view"><i className="fab fa-github"></i> View GitHub</a>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" alt="Furniture Web" />
                                </div>
                                <div className="project-info">
                                    <span className="project-badge" style={{color: "#4facfe"}}>E-commerce</span>
                                    <h3>Furniture Web</h3>
                                    <p>An elegant e-commerce platform for a furniture store, featuring a modern aesthetic design and a seamless shopping experience.</p>
                                    <div className="project-tech">
                                        <span>Web Design</span>
                                        <span>Frontend</span>
                                        <span>E-Commerce</span>
                                    </div>
                                </div>
                            </div>

                            <div className="project-card reveal" style={{transitionDelay: "450ms"}}>
                                <div className="project-img">
                                    <div className="img-overlay">
                                        <a href="https://github.com/baophong26/Techspace_Web" target="_blank" className="btn-view"><i className="fab fa-github"></i> View GitHub</a>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" alt="TechSpace Web" />
                                </div>
                                <div className="project-info">
                                    <span className="project-badge" style={{color: "#00f2fe"}}>E-commerce</span>
                                    <h3>BP TechSpace</h3>
                                    <p>A modern e-commerce storefront with a premium Cyberpunk aesthetic, high-performance UI/UX, and immersive animations.</p>
                                    <div className="project-tech">
                                        <span>Next.js</span>
                                        <span>React</span>
                                        <span>UI/UX</span>
                                    </div>
                                </div>
                            </div>

                            <div className="project-card reveal" style={{transitionDelay: "600ms"}}>
                                <div className="project-img">
                                    <div className="img-overlay">
                                        <a href="https://github.com/Jack0dev/StockLap" target="_blank" className="btn-view"><i className="fab fa-github"></i> View GitHub</a>
                                    </div>
                                    <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop" alt="StockLab Project" />
                                </div>
                                <div className="project-info">
                                    <span className="project-badge" style={{color: "#00b4d8"}}>Finance App</span>
                                    <h3>StockLab</h3>
                                    <p>A robust financial application featuring secure OTP-based authentication, Redis caching, and rigorous transaction security.</p>
                                    <div className="project-tech">
                                        <span>Fullstack</span>
                                        <span>Security</span>
                                        <span>Redis</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="contact-section pt-section">
                    <div className="container pb-section">
                        <div className="glass-card contact-card reveal">
                            <h2>Let's Get In Touch</h2>
                            <p>My inbox is always open. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!</p>
                            
                            <div className="contact-info">
                                <div className="contact-item">
                                    <i className="fas fa-phone-alt"></i>
                                    <a href="tel:0339663461" style={{color: "var(--text-primary)", textDecoration: "none"}}>0339663461</a>
                                </div>
                                <div className="contact-item">
                                    <div style={{width: "30px", textAlign: "center", color: "var(--accent-1)", fontWeight: "bold", fontFamily: "Arial, sans-serif", fontSize: "1.2rem"}}>Z</div>
                                    <a href="https://zalo.me/0339663461" target="_blank" style={{color: "var(--text-primary)", textDecoration: "none"}}>Zalo: 0339663461</a>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-envelope"></i>
                                    <a href="mailto:baophong2602@gmail.com" style={{color: "var(--text-primary)", textDecoration: "none"}}>baophong2602@gmail.com</a>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <p>520/90/19a Quốc lộ 13, Hiệp Bình Phước, Thủ Đức, HCM</p>
                                </div>
                            </div>
                            
                            <div className="social-links mt-4">
                                <a href="https://github.com/baophong26" target="_blank" title="GitHub"><i className="fab fa-github"></i></a>
                                <a href="https://www.facebook.com/phan.chi.quoc.bao?locale=vi_VN" target="_blank" title="Facebook"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://zalo.me/0339663461" target="_blank" title="Zalo" style={{fontWeight: 900, fontFamily: "Arial, sans-serif", fontSize: "1.2rem"}}>Z</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container footer-content">
                    <p>&copy; <span id="year"></span> Bảo Phong. Designed and built with ❤️.</p>
                    <a href="#" className="back-to-top" onClick={(e) => {e.preventDefault(); window.scrollTo(0,0)}}><i className="fas fa-chevron-up"></i></a>
                </div>
            </footer>
        </>
    );
}
