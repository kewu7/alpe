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
                "images/parnusild1.jpg",
                "images/parnusild2.jpg",
                "images/parnusild3.jpg",
                "images/parnusild5.jpg",
                "images/parnusild6.jpg",
                "images/parnusild7.jpg",
                "images/parnusild8.jpg"
            ]
        },
        masikka: {
            title: "Masikkakoski raudteesild (2022–2023)",
            client: "MPV-Infrarakenne Oy",
            work: "Objekti üldtööd, montaažitööd",
            images: ["images/Mansikkakoski1.jpg", "images/Mansikkakoski2.jpg", "images/Mansikkakoski3.jpg"]
        },
        sindi: {
            title: "Sindi–Lodja sild (2025)",
            client: "INF Infra OÜ",
            work: "Objekti üldtööd, raadamine ja kändude freesimine",
            images: ["images/sindilodja.jpg"]
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

const contactForm = document.getElementById("contactForm");
const formStatusMsg = document.getElementById("form-status-msg");
const submitBtn = document.getElementById("submit-btn");

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById("contactForm");
    const formStatusMsg = document.getElementById("form-status-msg");
    const submitBtn = document.getElementById("submit-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = "Saadan...";
            }
            
            const formData = new FormData(event.target);
            
            fetch(event.target.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    if (formStatusMsg) {
                        formStatusMsg.innerHTML = "Täname! Teie päring on edukalt saadetud.";
                        formStatusMsg.className = "success";
                    }
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (formStatusMsg) {
                            if (Object.hasOwn(data, 'errors')) {
                                formStatusMsg.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                            } else {
                                formStatusMsg.innerHTML = "Viga saatmisel. Kontrollige e-posti aadressi seadeid.";
                            }
                            formStatusMsg.className = "error";
                        }
                    })
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Saada päring";
                }
            }).catch(error => {
                if (formStatusMsg) {
                    formStatusMsg.innerHTML = "Viga! Palun kontrollige internetiühendust.";
                    formStatusMsg.className = "error";
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Saada päring";
                }
            });
        });
    }
});