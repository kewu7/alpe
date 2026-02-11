/**
 * Navigation Logic
 * Handles mobile hamburger menu interactions
 */
const Navigation = {
    init() {
        this.hamburger = document.getElementById("hamburger");
        this.nav = document.getElementById("nav");
        this.links = document.querySelectorAll("nav a");
        
        if (this.hamburger) {
            this.hamburger.addEventListener("click", () => this.toggle());
        }

        // Close menu when a link is clicked
        this.links.forEach(link => {
            link.addEventListener("click", () => this.close());
        });
    },

    toggle() {
        this.nav.classList.toggle("active");
    },

    close() {
        this.nav.classList.remove("active");
    }
};

/**
 * Portfolio & Modal Logic
 * Manages the display of project details in the modal
 */
const Portfolio = {
    data: {
        parnu: {
            title: "Pärnu uus sild (2023–2025)",
            client: "INF Infra OÜ",
            work: "Objekti üldtööd, betoonitööd, pinnasetööd, montaažitööd, tungimistööd",
            images: [
                "https://images.unsplash.com/photo-1487956382158-bb926046304a", 
                "https://images.unsplash.com/photo-1517089534706-33c2ec3b9b31"
            ]
        },
        masikka: {
            title: "Masikkakoski raudteesild (2022–2023)",
            client: "MPV-Infrarakenne Oy",
            work: "Objekti üldtööd, montaažitööd",
            images: ["https://images.unsplash.com/photo-1501594907352-04cda38ebc29"]
        },
        sindi: {
            title: "Sindi–Lodja sild (2025)",
            client: "INF Infra OÜ",
            work: "Objekti üldtööd, raadamine ja kändude freesimine",
            images: ["https://images.unsplash.com/photo-1492724441997-5dc865305da7"]
        },
        kallas: {
            title: "Pärnu kaldakindlustus (2025)",
            client: "GRK Eesti AS",
            work: "Objekti üldtööd, pinnasetööd",
            images: ["images/kaldakindlus.JPG"]
        },
        audru: {
            title: "Audru Keskväljaku vaateplatvorm (2025)",
            client: "Tref Nord AS",
            work: "Betoonitööd",
            images: ["images/audru.jpg"]
        },
        veski: {
            title: "Veskimetsa AJ vundament (2025)",
            client: "INF Infra OÜ",
            work: "Betoonitööd, montaažitööd",
            images: ["images/AJ.jpg"]
        },
        lagedi: {
            title: "Lagedi rippsild (2025)",
            client: "GRK Eesti AS",
            work: "Betoonitööd",
            images: [
                "images/lagedi1.jpg", 
                "images/lagedi2.jpg", 
                "images/lagedi3.jpg", 
                "images/lagedi4.jpg"
            ]
        }
    },
    
    open(id) {
        const project = this.data[id];
        if (!project) return;

        const body = document.getElementById("modal-body");
        const modal = document.getElementById("modal");

        let galleryHTML = project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('');

        body.innerHTML = `
            <h2>${project.title}</h2>
            <p><strong>Tellija:</strong> ${project.client}</p>
            <p><strong>Teostatud tööd:</strong> ${project.work}</p>
            <div class="gallery">${galleryHTML}</div>
        `;

        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent background scroll
    },

    close() {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scroll
    }
};

/**
 * Event Listeners Initialization
 */
window.addEventListener("DOMContentLoaded", () => {
    Navigation.init();
    
    // Global Modal Click-away handler
    window.addEventListener("click", (e) => {
        const modal = document.getElementById("modal");
        if (e.target === modal) {
            Portfolio.close();
        }
    });

    // Optional: Form submission placeholder
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Handle form data here (e.g., fetch API)
            console.log("Päring saadetud!"); 
            contactForm.reset();
        });
    }
});