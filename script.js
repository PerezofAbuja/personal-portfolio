// skills section script
  // Animate progress bars when section comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.bar');
        bars.forEach(bar => {
          const level = bar.getAttribute('data-level');
          bar.style.width = level + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.querySelector('.skills-section');
  observer.observe(skillsSection);

// sample data - replace with your real projects
    const DATA = [
      {id:1,title:'E-commerce Dashboard',cat:'web',year:2025,desc:'Analytics dashboard with realtime updates and custom widgets.',img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1'},
      {id:2,title:'Social App UI Kit',cat:'ui',year:2024,desc:'A complete design system and UI kit for social apps.',img:'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2'},
      {id:3,title:'Recipe Mobile App',cat:'mobile',year:2025,desc:'A delightful mobile experience for cooking and meal planning.',img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3'},
      {id:4,title:'Marketing Site',cat:'web',year:2023,desc:'High-conversion marketing site with animations and accessibility.',img:'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4'},
      {id:5,title:'Portfolio Template',cat:'ui',year:2025,desc:'A modern portfolio template with multiple themes and variants.',img:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5'},
      {id:6,title:'Fitness Tracker',cat:'mobile',year:2024,desc:'Sleek fitness app focused on daily habits and coaching.',img:'https://images.unsplash.com/photo-1511688878354-33a5a1a0a3f4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6'}
    ];

    const projectsEl = document.getElementById('projects');
    const filters = document.querySelectorAll('.filter');
    const search = document.getElementById('search');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');
    const loadMoreBtn = document.getElementById('loadMore');

    let visible = 6; // how many items to show initially

    function render(list){
      projectsEl.innerHTML = '';
      if(!list.length){projectsEl.innerHTML = '<p style="grid-column:1/-1;color:var(--muted);text-align:center">No projects found.</p>';return}
      list.slice(0,visible).forEach(p=>{
        const el = document.createElement('article');
        el.className = 'card';
        el.setAttribute('data-cat', p.cat);
        el.setAttribute('tabindex', '0');
        el.innerHTML = `
          <a class="thumb" href="#" data-id="${p.id}" aria-label="Open ${p.title}"><img loading="lazy" src="${p.img}" alt="${p.title} screenshot"></a>
          <div>
            <h3>${p.title}</h3>
            <div class="meta"><span>${p.year}</span><div style="flex:1"></div><div class="tags"><span class="tag">${p.cat}</span></div></div>
            <p style="margin:8px 0;color:var(--muted);font-size:14px">${p.desc}</p>
            <div class="actions">
              <button class="btn view" data-id="${p.id}">Details</button>
              <a class="btn demo" href="#" onclick="event.preventDefault()">Live demo</a>
            </div>
          </div>`;
        projectsEl.appendChild(el);
      });

      // fade-in small delay per card
      document.querySelectorAll('.card').forEach((c,i)=>c.style.animationDelay = (0.03 * i)+'s');

      // attach events
      projectsEl.querySelectorAll('.thumb, .btn.view').forEach(btn=>{
        btn.addEventListener('click', (e)=>{
          e.preventDefault();
          const id = Number(btn.dataset.id);
          openModal(id);
        });
      });

      loadMoreBtn.style.display = list.length > visible ? 'inline-block' : 'none';
    }

    function openModal(id){
      const p = DATA.find(x=>x.id===id);
      if(!p) return;
      modalContent.innerHTML = `
        <div>
          <div style="border-radius:10px;overflow:hidden;height:360px;background:#000"><img src="${p.img}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover"></div>
        </div>
        <aside>
          <h3 style="margin-top:0">${p.title}</h3>
          <p style="color:var(--muted)">${p.desc}</p>
          <div style="margin:12px 0" class="meta"><strong>Role:</strong>&nbsp;<span style="color:var(--muted)">Design, Dev</span></div>
          <div style="display:flex;gap:8px;margin-top:12px"><a class="btn demo" href="#" onclick="event.preventDefault()">View live</a><a class="btn view" href="#" onclick="event.preventDefault()">Source</a></div>
        </aside>`;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      // trap focus simple
      closeModal.focus();
    }

    function close(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}

    closeModal.addEventListener('click', close);
    modal.addEventListener('click', (e)=>{ if(e.target===modal) close(); });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });

    // filtering & searching
    function applyFilters(){
      const active = document.querySelector('.filter.active')?.dataset.filter || 'all';
      const q = search.value.trim().toLowerCase();
      let list = DATA.slice();
      if(active!=='all') list = list.filter(p=>p.cat===active);
      if(q) list = list.filter(p=> (p.title+ ' '+p.desc+' '+p.cat).toLowerCase().includes(q));
      render(list);
    }

    filters.forEach(btn=>btn.addEventListener('click', ()=>{
      filters.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});
      btn.classList.add('active');btn.setAttribute('aria-pressed','true');
      visible = 6; // reset visible when filter changes
      applyFilters();
    }));

    search.addEventListener('input', ()=>{visible = 6;applyFilters();});

    loadMoreBtn.addEventListener('click', ()=>{visible += 6;applyFilters();});

    // initial render
    render(DATA);

    // Accessibility: keyboard activate cards
    projectsEl.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' && e.target.closest('.card')){
        const id = e.target.closest('.card').querySelector('[data-id]')?.dataset.id;
        if(id) openModal(Number(id));
      }
    });

    // Utility: if you'd like to fetch real data, replace DATA with fetch('/api/projects') etc.
 // testimonials section script
  const testimonials = document.querySelectorAll('.testimonial');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  let current = 0;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
  }

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + testimonials.length) % testimonials.length;
    showTestimonial(current);
  });

  // Auto-rotate every 6 seconds
  setInterval(() => {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  }, 6000);

  // Auto update year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll for footer links
  document.querySelectorAll('.footer-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });