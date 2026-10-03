const projects = [
  {
    title: "CATCH THE BALL",
    desc: "Catch the Ball adalah game 2D berbasis Python menggunakan library Turtle, di mana pemain mengendalikan keranjang untuk menangkap bola yang jatuh dari atas layar. Game ini dilengkapi sistem skor, 3 nyawa, collision detection, pergerakan bola secara acak, serta peningkatan kecepatan untuk menambah tantangan. Jika semua nyawa habis, game akan menampilkan Game Over dan otomatis dimulai kembali.",
    tech: ["PYTHON"],
    github: "https://github.com/ozxew123/Catch-the-Ball",
    image: "bolaaa.png" // Sesuaikan dengan nama file gambar screenshot kamu
  },
  {
    title: "Portofolio Website",
    desc: "Sebuah situs web portofolio pribadi yang dirancang dengan estetika *pixel-art* yang bersih, serta dilengkapi elemen interaktif, tampilan proyek, dan tata letak responsif. Situs ini dibangun untuk menampilkan karya kreatif, keterampilan teknis, dan proyek pengembangan dalam sebuah pengalaman digital yang unik.",
    tech: ["HTML5", "CSS3","Google Fonts", "JavaScript", ],
    github: "https://github.com/ozxew123",
    image: "pixel-art.png" // Sesuaikan jika ada gambar untuk project ini
  },
];

const expertise = [
  {icon:"▣",title:"Game developer",desc:"Turning ideas into interactive worlds through gameplay, mechanics, and immersive digital experiences."},
  {icon:"✦",title:"Design",desc:"Crafting beautiful user interfaces with a focus on human-centered experiences."},
  {icon:"⌘",title:"UI/UX DESIGN",desc:"Transforming ideas into intuitive interfaces where thoughtful design meets seamless user experiences.."}
];

const projectsGrid=document.getElementById("projects-grid");
projectsGrid.innerHTML=projects.map((p,i)=>`
  <article class="project-card reveal" style="transition-delay:${i*.08}s" data-index="${i}">
    <div class="project-image project-trigger">
      <img src="${p.image}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover;">
    </div>
    <h3 class="project-trigger">${p.title}</h3>
    <p>${p.desc.substring(0, 90)}...</p>
    <div class="project-bottom">
      <div class="tags">${p.tech.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
      <a class="view project-trigger" href="javascript:void(0);">VIEW &gt;</a>
    </div>
  </article>`).join("");

const expertiseGrid=document.getElementById("expertise-grid");
expertiseGrid.innerHTML=expertise.map((c,i)=>`
  <article class="expertise-card reveal" style="transition-delay:${i*.12}s">
    <span class="corner"></span><span class="corner"></span><span class="corner"></span><span class="corner"></span>
    <div class="expertise-icon">${c.icon}</div>
    <h3>${c.title}</h3>
    <p>${c.desc}</p>
  </article>`).join("");

// Background stars generator
const bg=document.getElementById("pixel-background");
for(let i=0;i<70;i++){
  const star=document.createElement("span");
  star.className="star";
  star.style.left=`${Math.random()*100}%`;
  star.style.top=`${Math.random()*100}%`;
  star.style.opacity=(Math.random()*.5+.1).toFixed(2);
  star.style.width=star.style.height=Math.random()>.8?"8px":"4px";
  star.style.animationDuration=`${Math.random()*15+15}s`;
  star.style.animationDelay=`${Math.random()*-20}s`;
  bg.appendChild(star);
}

const navbar=document.getElementById("navbar");
window.addEventListener("scroll",()=>navbar.classList.toggle("scrolled",window.scrollY>50));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el=>observer.observe(el));

document.getElementById("year").textContent=new Date().getFullYear();

document.getElementById("menu-btn").addEventListener("click",()=>{
  document.querySelector(".nav-links").classList.toggle("mobile-open");
});
document.querySelector(".nav-links").addEventListener("click",e=>{
  if(e.target.tagName==="A") document.querySelector(".nav-links").classList.remove("mobile-open");
});

// --- Modal Script Logic ---
const modal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTags = document.getElementById("modal-tags");
const modalGithub = document.getElementById("modal-github");
const modalImg = document.getElementById("modal-img");

// Event listener untuk membuka modal saat card/title/view diklik
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", (e) => {
    const index = card.getAttribute("data-index");
    const proj = projects[index];

    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.desc;
    modalTags.innerHTML = proj.tech.map(t => `<span class="tag">${t}</span>`).join("");
    modalGithub.href = proj.github;
    modalImg.innerHTML = `<img src="${proj.image}" alt="${proj.title}" style="width:100%; height:100%; object-fit:cover;">`;

    modal.classList.add("active");
  });
});

// Fungsi menutup modal
const closeModal = () => modal.classList.remove("active");
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});