// Changement de thème
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Vérifier le thème sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Carte interactive flip
const interactiveCard = document.querySelector('.interactive-card');
const flipButtons = document.querySelectorAll('.card-flip-btn');

flipButtons.forEach(button => {
    button.addEventListener('click', () => {
        interactiveCard.classList.toggle('flipped');
    });
});

// Nuage de compétences filtré
const cloudFilters = document.querySelectorAll('.cloud-filter');
const cloudItems = document.querySelectorAll('.cloud-item');

cloudFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Retirer la classe active de tous les filtres
        cloudFilters.forEach(f => f.classList.remove('active'));
        // Ajouter la classe active au filtre cliqué
        filter.classList.add('active');
        
        const filterValue = filter.getAttribute('data-filter');
        
        // Afficher/masquer les items selon le filtre
        cloudItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'inline-block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.5)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animation des compétences au survol
cloudItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const skill = this.textContent;
        const level = this.getAttribute('data-level');
        
        // Créer un tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `${skill} - ${level === 'expert' ? 'Expert' : level === 'advanced' ? 'Avancé' : 'Intermédiaire'}`;
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'var(--card-bg)';
        tooltip.style.color = 'var(--text-color)';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '6px';
        tooltip.style.boxShadow = 'var(--shadow)';
        tooltip.style.zIndex = '1000';
        tooltip.style.border = '1px solid var(--border-color)';
        
        document.body.appendChild(tooltip);
        
        // Positionner le tooltip
        const rect = this.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        
        // Stocker le tooltip pour le supprimer plus tard
        this.tooltip = tooltip;
    });
    
    item.addEventListener('mouseleave', function() {
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
    });
});

// Copie d'email/téléphone
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-text');
        
        // Utiliser l'API Clipboard
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // Afficher une confirmation
                const originalIcon = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                    this.style.backgroundColor = '';
                }, 2000);
            })
            .catch(err => {
                console.error('Erreur lors de la copie: ', err);
            });
    });
});

// Ouverture des liens LinkedIn et GitHub
const linkButtons = document.querySelectorAll('.link-btn');

linkButtons.forEach(button => {
    button.addEventListener('click', function() {
        const contactItem = this.closest('.contact-item');
        const platform = contactItem.querySelector('h4').textContent;
        
        let url = '';
        if (platform === 'LinkedIn') {
            url = 'https://linkedin.com/in/fergal-dorian-kolat-djoko-466973332';
        } else if (platform === 'GitHub') {
            url = 'https://github.com/kayido';
        }
        
        if (url) {
            window.open(url, '_blank');
        }
    });
});

// Animation au défilement
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer les widgets
document.querySelectorAll('.widget').forEach(widget => {
    observer.observe(widget);
});

// Ajout de la classe visible avec délai pour l'animation
document.addEventListener('DOMContentLoaded', () => {
    // Animation progressive des sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, index * 200);
    });
});

// Navigation active
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Ajouter du CSS pour l'animation visible
const style = document.createElement('style');
style.textContent = `
    .widget, .section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .widget.visible, .section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);


// Gestion du bouton "Voir plus" pour les projets
const moreProjectsBtn = document.getElementById('moreProjectsBtn');
const projectCards = document.querySelectorAll('.project-card');
const filterButtons = document.querySelectorAll('.filter-btn');
let allProjectsVisible = false;

// Données des projets pour la modal
const projectsData = {
    meteo: {
        title: "Pipeline de traitement de données météorologiques",
        image: "assets/projects/meteoriologique.jpg",
        description: "Mise sur pied d'un système permettant de collecter périodiquement les prévisions de météo de différents pays africains et de les visualiser dans un rapport dans Power BI. Collecte des données brutes via API, traitement avec PySpark, stockage dans PostgreSQL, automatisation de ce processus avec Apache Airflow et visualisation des données stockées sur Power BI.",
        tech: ['Python', 'PySpark', 'Apache Airflow', 'PostgreSQL', 'Power BI', 'API'],
        features: [
            "Collecte automatisée via API météo",
            "Traitement avec PySpark pour le Big Data",
            "Orchestration avec Apache Airflow",
            "Stockage dans base de données PostgreSQL",
            "Visualisation interactive avec Power BI",
            "Dashboard temps réel pour analyse"
        ],
        demo : false
    },
    cinema: {
        title: "Pipeline de traitement des données cinématographiques",
        image: "assets/projects/movielens.jpg",
        description: "Pipeline ETL permettant de traiter les données cinématographiques issues du dataset MovieLens. Utilisation de Hadoop pour le stockage distribué des fichiers, Spark pour le traitement des données, Docker pour la gestion des conteneurs, et Hive pour leur manipulation en SQL ainsi que leur stockage direct dans la base de données.",
        tech: ['Hadoop', 'Apache Spark', 'Docker', 'Hive', 'ETL', 'Big Data'],
        features: [
            "Architecture Big Data complète",
            "Stockage distribué avec Hadoop HDFS",
            "Traitement parallèle avec Spark",
            "Conteneurisation avec Docker",
            "Requêtage SQL avec Hive",
            "Pipeline ETL optimisé"
        ]
        ,demo : false
    },
    ecommerce: {
        title: "Plateforme e-commerce avec Java Spring boot",
        image: "projet-ecommerce.jpg",
        description: "Conception et mise en place des API REST nécessaires au fonctionnement d'une plateforme e-commerce : authentification et autorisations des utilisateurs, gestion des produits, gestion des commandes et intégration API externe. Développement avec Java Spring boot, en prenant en compte la sécurité (Spring Security, gestions des rôles et permissions) et la gestion des données (JPA/Hibernate).",
        tech: ['Java', 'Spring Boot', 'Spring Security', 'JPA/Hibernate', 'REST API', 'MySQL'],
        features: [
            "Authentification JWT sécurisée",
            "Gestion des rôles et permissions",
            "API REST complète CRUD",
            "Intégration paiement externe",
            "Base de données relationnelle",
            "Architecture microservices"
        ],
        demo : false
    },
    scala: {
        title: "Pipeline de traitement des données des pays en Scala",
        image: "assets/projects/map.png",
        description: "Développement d'un pipeline de traitement de données géographiques et démographiques en Scala utilisant Apache Spark. Le pipeline inclut le nettoyage, la transformation et l'agrégation de données sur les pays du monde entier.",
        tech: ['Scala', 'Functional Programming', 'ETL', 'Data Processing'],
        features: [
            "Programmation fonctionnelle Scala",
            "Nettoyage et transformation données",
            "Aggrégation de données complexes",
            "Optimisation des performances",
            "Code scalable et maintenable"
        ],
        demo : false
    },
    poubelles: {
        title: "Plateforme de Détection intelligente des états des poubelles publiques",
        image: "assets/projects/trashero.png",
        description: "Plateforme conçue pour collecter les données des états poubelles sur un territoire spécifique (Île-de-France) et de cartographier les zones à hauts risques de naissance de dépôts sauvages à partir des données collectées. Utilisation de Django pour la création de la plateforme web et des API backend.",
        tech: ['Django', 'Python', 'JavaScript', 'API', 'Data Visualization' , 'OpenCV', 'Scikit-Learn', 'Python', 'Chart.js'],
        features: [
            "Cartographie interactive des zones à risque",
            "Collecte de données en temps réel",
            "API REST avec Django REST Framework",
            "Dashboard d'administration",
            "Alertes automatiques",
            "Traitement d'images avec OpenCV",
            "Classification ML avec Scikit-Learn",
            "Visualisation des résultats avec Chart.js"

        ],
        demo : false
    },
    carburants : {
        title: "Plateforme de visualisation des prix des carburants en France",
        image: "assets/projects/carburant.png",
        description: "Plateforme de visualisation des données de prix des carburants en France pour analyser les tendances et variations géographiques. Utilisation de Streamlit pour la création de la plateforme web et l'ensemble des graphiques interactifs.",
        tech: ['Streamlit', 'Python', 'Pandas', 'Data Visualization'],
        features: [
            "Cartographie interactive des prix des carburants",
            "Nettoyage et analyse des données",
            "Visualisation des tendances et variations",
            "dashboard interactif pour l'exploration des données",
            "exportation de rapports"

        ],
        demo : true,
        demoURL : "https://new2cxxtemyjmi9wxif97g.streamlit.app/",
        GitHubURL : "https://github.com/kayido/streamlit_app-fuel-in-france"
    }
};

// Fonction pour afficher plus de projets
const hiddenProjects = document.querySelectorAll('.project-card.hidden');

function showMoreProjects() {
    
    if (allProjectsVisible) {
        // Cacher les projets supplémentaires
        hiddenProjects.forEach((project, index) => {
            setTimeout(() => {
                project.classList.add('hidden');
                project.style.display = 'none';
            }, index * 100);
        });
        console.log(allProjectsVisible)
        moreProjectsBtn.innerHTML = '<i class="fas fa-plus"></i> Voir plus de projets <span class="projects-count">(+3 projets)</span>';
        allProjectsVisible = false;
    } else {
        // Afficher tous les projets
        hiddenProjects.forEach((project, index) => {
            setTimeout(() => {
                project.classList.remove('hidden');
                project.style.display = 'block';
                
                // Animation d'apparition
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 50);
            }, index * 150);
        });
      

        moreProjectsBtn.innerHTML = '<i class="fas fa-minus"></i> Voir moins de projets';
        allProjectsVisible = true;
    }
}

// Fonction pour filtrer les projets
function filterProjects(category) {
    projectCards.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        
        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
    
    // Réinitialiser l'état du bouton "Voir plus"
    allProjectsVisible = false;
    moreProjectsBtn.innerHTML = '<i class="fas fa-plus"></i> Voir plus de projets <span class="projects-count">(+3 projets)</span>';
    
    // Afficher seulement les premiers projets après filtrage
    const visibleProjects = document.querySelectorAll(`.project-card[data-category="${category}"], .project-card[data-category="all"]`);
    let visibleCount = 0;
    
    visibleProjects.forEach((project, index) => {
        if (project.style.display !== 'none') {
            if (visibleCount < 3) {
                project.classList.remove('hidden');
                visibleCount++;
            } else {
                project.classList.add('hidden');
            }
        }
    });
}

// Fonction pour afficher les détails d'un projet dans la modal
function showProjectDetails(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    // Remplir la modal avec les données du projet
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectImage').src = project.image;
    document.getElementById('modalProjectImage').alt = project.title;
    document.getElementById('modalProjectDescription').textContent = project.description;
    
    // Technologies
    const techContainer = document.getElementById('modalProjectTech');
    techContainer.innerHTML = '';
    project.tech.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techContainer.appendChild(tag);
    });
    
    // Fonctionnalités
    const featuresContainer = document.getElementById('modalProjectFeatures');
    featuresContainer.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresContainer.appendChild(li);
    });
    // Edit button
    const demoButton = document.getElementById('modalDemoButton');
    const githubButton = document.getElementById('modalGithubButton');

    if (!project.demo) {
        demoButton.style.display = 'none';
    }

    demoButton.onclick = () => {
        window.open(project.demoURL, '_blank');
    };
    githubButton.onclick = () => {
        window.open(project.GitHubURL, '_blank');
    };


    // Afficher la modal
    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le scroll
}

// Initialisation des événements pour les projets
document.addEventListener('DOMContentLoaded', () => {
    // Bouton "Voir plus"
    if (moreProjectsBtn) {
        moreProjectsBtn.addEventListener('click', showMoreProjects);
    }
    
    // Filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
    
    // Boutons de détails des projets
    const detailButtons = document.querySelectorAll('.project-details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            showProjectDetails(projectId);
        });
    });
    
    // Fermer la modal
    const modalClose = document.getElementById('modalClose');
    const projectModal = document.getElementById('projectModal');
    
    if (modalClose && projectModal) {
        modalClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Fermer la modal en cliquant à l'extérieur
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Fermer avec la touche Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Initialiser le radar des compétences académiques (si Chart.js est inclus)
    if (typeof Chart !== 'undefined') {
        initializeAcademicRadar();
    }
});

// Fonction pour initialiser le radar des compétences académiques
function initializeAcademicRadar() {
    const ctx = document.getElementById('academicRadar');
    if (!ctx) return;
    
    const academicRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Big Data', 'ML/AI', 'Cloud', 'Dev Web', 'Bases de Données', 'Gestion Projet'],
            datasets: [{
                label: 'Niveau Actuel',
                data: [85, 86, 74, 79, 85, 80],
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: '#2563eb',
                borderWidth: 2,
                pointBackgroundColor: '#2563eb'
            }, {
                label: 'Objectif Final',
                data: [95, 95, 90, 85, 95, 90],
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                borderColor: '#7c3aed',
                borderWidth: 2,
                pointBackgroundColor: '#7c3aed',
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(100, 100, 100, 0.2)'
                    },
                    grid: {
                        color: 'rgba(100, 100, 100, 0.2)'
                    },
                    pointLabels: {
                        color: 'var(--text-color)',
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: 'var(--text-light)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Mettre à jour le menu de navigation pour inclure le parcours académique
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        // Ajouter l'item "Parcours" au menu
        const parcoursItem = document.createElement('li');
        parcoursItem.innerHTML = '<a href="#parcours" class="nav-link">Parcours</a>';
        
        // Insérer après l'item "Profil"
        const profilLink = Array.from(navMenu.children).find(item => 
            item.querySelector('a[href="#profil"]')
        );
        
        if (profilLink) {
            navMenu.insertBefore(parcoursItem, profilLink.nextSibling);
        }
    }
});