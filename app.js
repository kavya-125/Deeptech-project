/* Sample data embedded to avoid local-fetch CORS issues. Replace or adapt as needed. */
const DATA = [
  { id: 1, title: "Deep Learning for Educators", summary: "A practical guide to applying deep learning in education.", tags: ["EdTech","AI"], date: "2025-11-01", image: "images/book1.svg", details: "Techniques and case studies showing how neural models improve personalization." },
  { id: 2, title: "Cognitive UX Patterns", summary: "Design patterns informed by cognition.", tags: ["Design","EdTech"], date: "2025-10-12", image: "images/book2.svg", details: "UX patterns that reduce cognitive load and improve retention." },
  { id: 3, title: "Innovation at Scale", summary: "How teams create products from research.", tags: ["Innovation","Leadership"], date: "2025-09-20", image: "images/book3.svg", details: "Leadership and process strategies to ship research-driven products." },
  { id: 4, title: "Adaptive Assessment Techniques", summary: "Assessments that evolve with learners.", tags: ["Assessment","Research"], date: "2025-08-04", image: "images/book8.svg", details: "Systems that change item difficulty dynamically based on learner responses." },
  { id: 5, title: "Level-5 Leadership", summary: "Leadership principles for technical teams.", tags: ["Leadership","Culture"], date: "2025-07-14", image: "images/book5.svg", details: "A synthesis of leadership practices that enable high-performing engineering teams." },
  { id: 6, title: "Designing for Learning", summary: "Practical course design guided by cognitive science.", tags: ["Design","Education"], date: "2025-06-10", image: "images/book6.svg", details: "Step-by-step guides to create courses that stick." },
  { id: 7, title: "Real-World Projects", summary: "Hands-on experience with industry challenges.", tags: ["Projects","Practice"], date: "2025-05-01", image: "images/book7.svg", details: "Project briefs, templates, and mentorship models for interns." },
  { id: 8, title: "Leadership Practices", summary: "Techniques to grow engineering leaders.", tags: ["Leadership","Practice"], date: "2025-04-20", image: "images/book5.svg", details: "Practical exercises and reflection prompts to build leadership." },
  { id: 9, title: "Assessment Techniques", summary: "Modern approaches to learner evaluation.", tags: ["Assessment","Tools"], date: "2025-03-12", image: "images/book4.svg", details: "From item-response models to adaptive quizzes." },
  { id: 10, title: "Psychology-Driven Learning", summary: "Courses designed using cognitive science research.", tags: ["Psychology","Research"], date: "2025-02-01", image: "images/book1.svg", details: "Research-backed methods that inform course structure and pacing." }
];

// State
let state = {
  query: '',
  activeTag: null,
  sort: 'newest'
};

// DOM
const cardsEl = document.getElementById('cards');
const searchInput = document.getElementById('searchInput');
const tagContainer = document.getElementById('tagContainer');
const sortSelect = document.getElementById('sortSelect');
const emptyState = document.getElementById('emptyState');

// Modal
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalDate = document.getElementById('modalDate');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCloseBackdrop = document.getElementById('modalClose');

function formatDate(d){
  try{ return new Date(d).toLocaleDateString(); }catch(e){return d}
}

function uniqueTags(data){
  const s = new Set();
  data.forEach(it=> it.tags.forEach(t=>s.add(t)));
  return [...s];
}

function renderTags(){
  const tags = uniqueTags(DATA);
  tagContainer.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'tag' + (state.activeTag===null? ' active':'');
  allBtn.textContent = 'All';
  allBtn.onclick = ()=>{ state.activeTag=null; render(); };
  tagContainer.appendChild(allBtn);

  tags.forEach(t=>{
    const b = document.createElement('button');
    b.className = 'tag'+(state.activeTag===t? ' active':'');
    b.textContent = t;
    b.onclick = ()=>{ state.activeTag = state.activeTag===t? null: t; render(); };
    tagContainer.appendChild(b);
  });
}

function applyFilters(data){
  let out = data.slice();
  if(state.query && state.query.trim().length){
    const q = state.query.toLowerCase();
    out = out.filter(it => (it.title+" "+it.summary+" "+(it.details||'')).toLowerCase().includes(q));
  }
  if(state.activeTag){
    out = out.filter(it => it.tags.includes(state.activeTag));
  }
  if(state.sort==='alpha'){
    out.sort((a,b)=> a.title.localeCompare(b.title));
  }else{ // newest
    out.sort((a,b)=> new Date(b.date) - new Date(a.date));
  }
  return out;
}

function render(){
  renderTags();
  const list = applyFilters(DATA);
  cardsEl.innerHTML = '';
  if(list.length===0){ emptyState.hidden = false; } else { emptyState.hidden = true; }
    list.forEach(item=>{
      const c = document.createElement('article');
      c.className = 'card';
      c.tabIndex = 0;
      c.onclick = ()=>openModal(item);
      c.onkeypress = (e)=>{ if(e.key==='Enter') openModal(item); };

      // thumbnail (if present)
      if(item.image){
        const thumbWrap = document.createElement('div'); thumbWrap.className = 'card-thumb';
        const img = document.createElement('img'); img.src = item.image; img.alt = item.title + ' cover'; img.loading = 'lazy';
        thumbWrap.appendChild(img);
        c.appendChild(thumbWrap);
      }

      const h = document.createElement('h3'); h.textContent = item.title;
      const s = document.createElement('div'); s.className='summary'; s.textContent = item.summary;
      const meta = document.createElement('div'); meta.className='meta';
      const badge = document.createElement('div'); badge.className='badge'; badge.textContent = item.tags[0] || '';
      const d = document.createElement('div'); d.className='muted'; d.textContent = formatDate(item.date);
      meta.appendChild(badge); meta.appendChild(d);

      c.appendChild(h); c.appendChild(s); c.appendChild(meta);
      cardsEl.appendChild(c);
    });
}

function openModal(item){
  modal.setAttribute('aria-hidden','false');
  modal.classList.add('show');
  modalTitle.textContent = item.title;
  modalDate.textContent = formatDate(item.date) + ' · ' + item.tags.join(', ');
  modalContent.textContent = item.details || item.summary || '';
}
function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modal.classList.remove('show');
}

// Event wiring
searchInput.addEventListener('input', e=>{ state.query = e.target.value; render(); });
sortSelect.addEventListener('change', e=>{ state.sort = e.target.value; render(); });
modalCloseBtn.addEventListener('click', closeModal);
modalCloseBackdrop.addEventListener('click', closeModal);
window.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

// Initial render
render();

// ---- Auth modal + forms (login / signup) ----
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

function openModalById(el){
  if(!el) return;
  el.setAttribute('aria-hidden','false');
  el.classList.add('show');
}
function closeModalByEl(el){
  if(!el) return;
  el.setAttribute('aria-hidden','true');
  el.classList.remove('show');
}

function closeAllAuthModals(){
  [loginModal, signupModal].forEach(m=>{ if(m) closeModalByEl(m); });
}

// openers
loginBtn && loginBtn.addEventListener('click', ()=> openModalById(loginModal));
signupBtn && signupBtn.addEventListener('click', ()=> openModalById(signupModal));

// delegate close on data-close elements
document.addEventListener('click', (e)=>{
  const t = e.target;
  if(t && t.getAttribute && t.getAttribute('data-close')==='true'){
    // find closest parent modal
    const parent = t.closest('.modal');
    if(parent) closeModalByEl(parent);
  }
});

// simple validation helpers
function isValidEmail(v){ return /\S+@\S+\.\S+/.test(v); }

// Login form
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
if(loginForm){
  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const pass = form.password.value;
    if(!isValidEmail(email)){
      loginMessage.textContent = 'Please enter a valid email.'; return;
    }
    if(pass.length < 6){ loginMessage.textContent = 'Password must be at least 6 characters.'; return; }
    // fake success
    loginMessage.textContent = 'Login successful — (demo only)';
    setTimeout(()=> closeModalByEl(loginModal), 900);
  });
}

// Signup form
const signupForm = document.getElementById('signupForm');
const signupMessage = document.getElementById('signupMessage');
if(signupForm){
  signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const pass = form.password.value;
    const confirm = form.confirm.value;
    if(!name){ signupMessage.textContent = 'Please enter your name.'; return; }
    if(!isValidEmail(email)){ signupMessage.textContent = 'Please enter a valid email.'; return; }
    if(pass.length < 6){ signupMessage.textContent = 'Password must be at least 6 characters.'; return; }
    if(pass !== confirm){ signupMessage.textContent = 'Passwords do not match.'; return; }
    // fake account creation
    signupMessage.textContent = 'Account created — (demo only)';
    setTimeout(()=> closeModalByEl(signupModal), 900);
  });
}

// Close auth modals with Esc
window.addEventListener('keydown', e=>{ if(e.key==='Escape') closeAllAuthModals(); });
