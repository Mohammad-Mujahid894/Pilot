'use strict';

/* ========= Parallax starfields (3 layers for depth) ========= */
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const layers = [
      { id: 'stars1', count: 110, speed: 0.15, size: 1.0 }, // far
      { id: 'stars2', count: 90, speed: 0.35, size: 1.6 }, // mid
      { id: 'stars3', count: 60,  speed: 0.65, size: 2.0 }  // near
    ];

    function Starfield(layer){
      const cvs = document.getElementById(layer.id); const ctx = cvs.getContext('2d');
      let w, h, stars=[]; let mx=0, my=0; // parallax
      function resize(){ w = cvs.width = innerWidth * DPR; h = cvs.height = innerHeight * DPR; cvs.style.width = innerWidth+'px'; cvs.style.height = innerHeight+'px';
        stars = Array.from({length: layer.count}, ()=>({ x: Math.random()*w, y: Math.random()*h, a: Math.random()*0.7+0.2 })); }
      resize(); addEventListener('resize', resize);
      addEventListener('mousemove', (e)=>{ mx = (e.clientX/innerWidth - .5); my = (e.clientY/innerHeight - .5); });
      function draw(){ ctx.clearRect(0,0,w,h); ctx.fillStyle = '#fff';
        for(const s of stars){ const px = s.x + mx*20*layer.speed; const py = s.y + my*20*layer.speed; ctx.globalAlpha = s.a; ctx.fillRect(px, py, layer.size*DPR, layer.size*DPR); }
        requestAnimationFrame(draw); }
      draw();
      return {ctx, get size(){return {w,h}}, pushMeteor};

      function pushMeteor(x,y,vx,vy){ // gradient trail line
        const grad = ctx.createLinearGradient(x,y, x-vx*14, y-vy*14);
        grad.addColorStop(0,'rgba(255,255,255,.95)'); grad.addColorStop(1,'rgba(122,162,255,0)');
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5*DPR; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-vx*14, y-vy*14); ctx.stroke();
      }
    }
    const fields = layers.map(Starfield);

    /* ========= Random shooting stars ========= */
    const meteors = [];
    function spawnMeteor(){ if(document.visibilityState !== 'visible') return; const {w,h} = fields[2].size;
      meteors.push({ x: Math.random()*w, y: -20, vx: -6*DPR, vy: 6*DPR, life: 180 }); }
    setInterval(spawnMeteor, 2200);
    function drawMeteors(){ for(let i=meteors.length-1;i>=0;i--){ const m = meteors[i]; m.x += m.vx; m.y += m.vy; m.life -= 1; fields[2].pushMeteor(m.x,m.y,m.vx,m.vy); if(m.x < -50 || m.y > fields[2].size.h+50 || m.life<=0){ meteors.splice(i,1); } }
      requestAnimationFrame(drawMeteors); }
    drawMeteors();

    /* ========= Glitter comet cursor ========= */
    const sparks=[]; let last=0; function spawnSpark(x,y){ const s=document.createElement('span'); s.className='spark'; s.style.left=x+'px'; s.style.top=y+'px'; document.body.appendChild(s); sparks.push(s); if(sparks.length>40){ const old=sparks.shift(); old.remove(); } setTimeout(()=>s.remove(), 900); }
    addEventListener('mousemove', (e)=>{ if(matchMedia('(pointer:fine)').matches) { const now=performance.now(); if(now-last>12){ spawnSpark(e.clientX, e.clientY); last=now; } } });

    /* ========= 3D Hover Tilt ========= */
    const tilts = [...document.querySelectorAll('.tilt')];
    tilts.forEach(el=>{
      el.addEventListener('mousemove', (e)=>{ const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height; const rx = (0.5 - y) * 10; const ry = (x - 0.5) * 10; el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; });
      el.addEventListener('mouseleave', ()=>{ el.style.transform = 'rotateX(0deg) rotateY(0deg)'; });
    });


    /* ========= Reduce motion toggle ========= */
    let motionReduced = false; function toggleMotion(){ motionReduced = !motionReduced; document.body.style.setProperty('animation-play-state', motionReduced ? 'paused' : 'running'); }
    window.toggleMotion = toggleMotion;

function goHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
    // Counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200; // smaller = faster

const animateCounters = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;

      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;

        const increment = Math.ceil(target / speed);

        if (current < target) {
          counter.innerText = current + increment;
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
      observer.unobserve(counter);
    }
  });
};

const observer = new IntersectionObserver(animateCounters, { threshold: 0.3 });
counters.forEach(counter => observer.observe(counter));

const entries = document.querySelectorAll('.entry');
const stars = document.querySelectorAll('.star');

window.addEventListener('scroll', () => {
  entries.forEach((entry, i) => {
    const rect = entry.getBoundingClientRect();
    if (rect.top >= 100 && rect.top < window.innerHeight / 2) {
      entries.forEach(e => e.classList.remove('active'));
      stars.forEach(s => s.classList.remove('active'));
      entry.classList.add('active');
      stars[i].classList.add('active');
    }
  });
});

const openCertifications = document.getElementById("openCertifications");

  openCertifications?.addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to("body", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => (window.location.href = "Certifications.html")
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.getElementById("navbar");

  // 🔹 Toggle hamburger & menu
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    navbar.classList.toggle("show");
  });

  // 🔹 Toggle dropdown ("More ▾") on mobile
  document.querySelectorAll(".dropdown > .dropbtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const parent = btn.parentElement;
        parent.classList.toggle("open");
      }
    });
  });

  // 🔹 Close all menus when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
      navbar.classList.remove("show");
      hamburger.classList.remove("active");
      document.querySelectorAll(".dropdown").forEach((d) => d.classList.remove("open"));
    }
  });

  // 🔹 Optional: disable scroll fade animations on small screens for smoother experience
  if (window.matchMedia("(max-width: 768px)").matches) {
    document.querySelectorAll(".timeline-content").forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
  }
});

const qaMeetBtn = document.getElementById("qa-meet");

if (qaMeetBtn) {
  qaMeetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to("body", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => (window.location.href = "Certifications.html")
    });
  });
}

// Fade-in timeline items on scroll
  const timelineItems = document.querySelectorAll('.timeline-content');
  const observerTimeline = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observerTimeline.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => observerTimeline.observe(item));



const texts = [
  "Order to Cash New Associate",
  "Process Optimization Enthusiast",
  "B.Com Graduate",
  "ICMAI Intermediate Student"
];

const typewriter = document.getElementById("typewriter");
let textIndex = 0, charIndex = 0, typing = true;

function animateTyping() {
  if (typing) {
    if (charIndex < texts[textIndex].length) {
      typewriter.textContent += texts[textIndex].charAt(charIndex++);
      setTimeout(animateTyping, 70);
    } else {
      typing = false;
      setTimeout(animateTyping, 1000);
    }
  } else {
    if (charIndex > 0) {
      typewriter.textContent = texts[textIndex].substr(0, --charIndex);
      setTimeout(animateTyping, 35);
    } else {
      typing = true;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(animateTyping, 400);
    }
  }
}
animateTyping();

// === Animate skill bars once ===
const bars = document.querySelectorAll('.skillbar span');
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.width = en.target.style.getPropertyValue('--w') || '0%';
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.3 });
bars.forEach(b => io.observe(b));


// === Radar Chart ===
const ctx = document.getElementById('radarChart').getContext('2d');

window.radarChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Finance','Banking Platforms','ERPs','Analytics','O2C Operations','Professional'],
    datasets: [{
      label: 'Skill Map',
      data: [85, 80, 60, 75, 82, 88],
      fill: true,
      backgroundColor: 'rgba(122,162,255,0.15)',
      borderColor: '#7aa2ff',
      borderWidth: 2,
      pointBackgroundColor: '#4ff0b0',
      pointBorderColor: '#fff',
      pointRadius: 6,
      pointHoverRadius: 9,
      pointHoverBackgroundColor: '#ffcc00'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.3)' },
        grid: { color: 'rgba(122,162,255,0.3)' },
        pointLabels: { color: '#eaf2ff', font: { size: 15, weight: 'bold' } },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        callbacks: { label: x => `${x.label}: ${x.raw}%` }
      }
    },
    animation: { duration: 600, easing: 'easeOutQuad' }
  }
});


// === Radar data (must match data-filter keys) ===
window.radarSets = {
  all:       [85, 80, 60, 75, 82, 88],
  ops:       [90, 55, 50, 65, 95, 72],
  banking:   [55, 92, 60, 50, 70, 68],
  tools:     [65, 70, 55, 60, 68, 66],
  erp:       [60, 55, 85, 50, 65, 70],
  analytics: [60, 50, 55, 92, 65, 72],
  soft:      [70, 60, 55, 65, 68, 90]
};


// === Skills filter with moving pill ===
(function () {
  const tab = document.querySelector('.skills-filter-tab');
  if (!tab) return;

  const buttons = [...tab.querySelectorAll('.filter-btn')];
  const pill = tab.querySelector('.filter-active-pill');

 function movePill(btn) {
  if (!pill || !btn) return;

  // Position relative to parent container
  const container = btn.parentElement;

  pill.style.left = btn.offsetLeft + 'px';
  pill.style.top  = btn.offsetTop + 'px';
  pill.style.width = btn.offsetWidth + 'px';
  pill.style.height = btn.offsetHeight + 'px';
}

  function setActive(btn) {
    buttons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected','true');
    movePill(btn);
  }

  function applyFilter(filter) {
    document.querySelectorAll('#skills-grid .skill-tag').forEach(tag => {
      tag.style.display = (filter === 'all' || tag.dataset.cat === filter) ? 'inline-block' : 'none';
    });
  }

  function updateRadar(filter) {
    const data = window.radarSets[filter] || window.radarSets.all;
    window.radarChart.data.datasets[0].data = data;
    window.radarChart.update();
  }

  // Initialize
  const initial = tab.querySelector('.filter-btn.is-active') || buttons[0];
  if (initial) {
    setActive(initial);
    const f = initial.dataset.filter || 'all';
    applyFilter(f);
    updateRadar(f);
  }

  // Handle clicks
  tab.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    setActive(btn);
    const f = btn.dataset.filter || 'all';
    applyFilter(f);
    updateRadar(f);
  });

  // Keep pill aligned
  const realign = () => {
    const current = tab.querySelector('.filter-btn.is-active') || buttons[0];
    if (current) movePill(current);
  };
  window.addEventListener('resize', realign);
  window.addEventListener('load', realign);
  setTimeout(realign, 0);
})();

function toggleDetails(btn) {
    const details = btn.nextElementSibling;
    const open = btn.getAttribute('aria-expanded') === 'true';
    if (!details) return;

    if (!open) {
      if (details.hasAttribute('hidden')) details.removeAttribute('hidden');
      details.style.maxHeight = details.scrollHeight + 'px';
      details.style.paddingTop = '8px';
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'Hide Details ▴';
      details.addEventListener('transitionend', function onEnd() {
        details.style.maxHeight = 'none';
        details.removeEventListener('transitionend', onEnd);
      });
    } else {
      const h = details.scrollHeight;
      details.style.maxHeight = h + 'px';
      requestAnimationFrame(() => {
        details.style.maxHeight = '0px';
        details.style.paddingTop = '0px';
      });
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'View Details ▾';
      details.addEventListener('transitionend', function onEnd() {
        details.setAttribute('hidden', '');
        details.removeEventListener('transitionend', onEnd);
      });
    }
  }

  // Optional: Disable scroll fade-in on small screens to avoid jank
  if (window.matchMedia("(max-width: 768px)").matches) {
    document.querySelectorAll('.timeline-content').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
  }

/* ============================
   DATA: 34 strengths with domains and short descriptions
   ============================ */
const strengths = [
  { rank:1, name:"Relator", domain:"RELATIONSHIP", short:"I build close relationships and trust.", tips:"Use with customers: develop one-to-one rapport; in O2C, call the same AR contact to nurture relationships." },
  { rank:2, name:"Deliberative", domain:"EXECUTING", short:"Careful, cautious, risk-aware decision maker.", tips:"Use to evaluate exceptions and ACH/NSF cases before pushing for automation." },
  { rank:3, name:"Learner", domain:"STRATEGIC", short:"I love learning and improving.", tips:"Great for studying ICMAI — set micro-goals and learn one accounting concept per shift." },
  { rank:4, name:"Intellection", domain:"STRATEGIC", short:"I enjoy deep thinking and reflection.", tips:"Use for root-cause analysis when investigating complex payment mismatches." },
  { rank:5, name:"Input", domain:"STRATEGIC", short:"I collect ideas, facts and resources.", tips:"Build and maintain a quick-reference folder for bank codes and comment codes." },
  { rank:6, name:"Empathy", domain:"RELATIONSHIP", short:"I sense other people's feelings.", tips:"Helpful when handling upset customers; reflect back feelings to de-escalate." },
  { rank:7, name:"Individualization", domain:"RELATIONSHIP", short:"I see each person's uniqueness.", tips:"Customize communication templates — some customers prefer short emails, others phone calls." },
  { rank:8, name:"Developer", domain:"RELATIONSHIP", short:"I see and grow potential in others.", tips:"Mentor a new teammate on TANDEM processes gradually." },
  { rank:9, name:"Harmony", domain:"RELATIONSHIP", short:"I look for agreement and avoid conflict.", tips:"In dispute resolution, focus on shared goals to reach a compromise." },
  { rank:10, name:"Restorative", domain:"EXECUTING", short:"I love solving problems and fixing issues.", tips:"Perfect for exception queues — you’ll enjoy resolving partial remits and unclear checks." },

  { rank:11, name:"Ideation", domain:"STRATEGIC", short:"I generate fresh, creative ideas.", tips:"Propose small automation or template ideas to reduce repetitive manual steps." },
  { rank:12, name:"Connectedness", domain:"RELATIONSHIP", short:"I see links and a larger story.", tips:"Use when mapping how payments, credit holds, and statements affect customers." },
  { rank:13, name:"Competition", domain:"INFLUENCING", short:"I measure myself and like to win.", tips:"Set a safe productivity target (e.g., daily matched checks) and beat your own score." },
  { rank:14, name:"Strategic", domain:"STRATEGIC", short:"I spot patterns and best paths forward.", tips:"Use to design an efficient daily workflow for ACH + check queues." },
  { rank:15, name:"Positivity", domain:"RELATIONSHIP", short:"I bring energy and enthusiasm.", tips:"Lift team morale on tough night shifts with short wins and celebrations." },
  { rank:16, name:"Discipline", domain:"EXECUTING", short:"I create structure, procedures, and routines.", tips:"Create a standard start-of-shift checklist for reviewing ACH and bank files." },
  { rank:17, name:"Futuristic", domain:"STRATEGIC", short:"I imagine exciting futures and possibilities.", tips:"Sketch a 6-month improvements roadmap for faster invoice retrievals." },
  { rank:18, name:"Significance", domain:"INFLUENCING", short:"I want to make an impact and be noticed.", tips:"Volunteer for a small cross-team project to raise visibility." },
  { rank:19, name:"Maximizer", domain:"INFLUENCING", short:"I turn good into great, focus on strengths.", tips:"Spot colleagues’ strengths and pair them for complex exceptions." },
  { rank:20, name:"Achiever", domain:"EXECUTING", short:"I have stamina and like finishing tasks.", tips:"Use a visible daily checklist to get the satisfaction of crossing off items." },

  { rank:21, name:"Responsibility", domain:"EXECUTING", short:"I am reliable and keep promises.", tips:"Own a weekly folder cleanup task (invoice folder) and show consistent follow-through." },
  { rank:22, name:"Analytical", domain:"STRATEGIC", short:"I examine data and look for cause and effect.", tips:"Use when reviewing chargeback patterns by bank/comment code." },
  { rank:23, name:"Focus", domain:"EXECUTING", short:"I concentrate and prioritize what matters.", tips:"Block 45 minutes for deep exception handling without Slack/phone." },
  { rank:24, name:"Self-Assurance", domain:"INFLUENCING", short:"Confident and decisive in my choices.", tips:"Take ownership when clarifying ambiguous remits with customers." },
  { rank:25, name:"Adaptability", domain:"RELATIONSHIP", short:"Flexible and present-centered; go with the flow.", tips:"Great on shift when priorities change; pivot to urgent bank items." },
  { rank:26, name:"Arranger", domain:"EXECUTING", short:"I organize but stay flexible to optimize.", tips:"Design an efficient folder & routing structure for invoice distribution." },
  { rank:27, name:"Consistency", domain:"EXECUTING", short:"Fairness, rules and same treatment for all.", tips:"Use consistent templates and SLAs to keep customer experience uniform." },
  { rank:28, name:"Belief", domain:"EXECUTING", short:"Values-driven and principled.", tips:"Bring ethics and clarity to disputes — document decisions for audits." },
  { rank:29, name:"Communication", domain:"INFLUENCING", short:"I explain and express ideas clearly.", tips:"Write crisp emails explaining remittance mismatches — customers appreciate clarity." },

  { rank:30, name:"Context", domain:"STRATEGIC", short:"I look to the past to understand the present.", tips:"When something repeats, check the historical transaction trail to learn patterns." },
  { rank:31, name:"Activator", domain:"INFLUENCING", short:"I make things happen — quick to start.", tips:"Launch small process tests to speed up a manual reconciliation step." },
  { rank:32, name:"Command", domain:"INFLUENCING", short:"I lead confidently and take charge.", tips:"Step up to drive a cross-team decision when there’s ambiguity." },
  { rank:33, name:"Woo", domain:"INFLUENCING", short:"I win others over and start conversations easily.", tips:"Use at onboarding calls to build rapport with new vendors." },
  { rank:34, name:"Includer", domain:"RELATIONSHIP", short:"You make people feel part of a group.", tips:"Make sure quieter teammates get credit in team updates." }
];

/* Domain order & colors */
const domainOrder = [
  { key:"EXECUTING", label:"Executing", css:"domain-executing", color:"#8b61ff" },
  { key:"INFLUENCING", label:"Influencing", css:"domain-influencing", color:"#ff9b3f" },
  { key:"RELATIONSHIP", label:"Relationship Building", css:"domain-relationship", color:"#3aa0ff" },
  { key:"STRATEGIC", label:"Strategic Thinking", css:"domain-strategic", color:"#38d07a" }
];

/* ====== Build UI with D3 (grid columns + tiles) ====== */
const grid = d3.select('#grid');

/* Create one column per domain */
const columns = grid.selectAll('.column')
  .data(domainOrder)
  .join('div')
    .attr('class','column')
    .attr('data-domain', d => d.key)
    .each(function(domainInfo){
      const col = d3.select(this);
      col.append('h3').text(domainInfo.label);
      col.append('div').attr('class','count').text('0');
      col.append('div').attr('class','list'); // will hold tiles
    });

/* function to update counts and tiles */
function renderTiles(data){
  domainOrder.forEach(dom => {
    const items = data.filter(d => d.domain === dom.key).sort((a,b)=> a.rank - b.rank);
    const list = grid.select(`[data-domain="${dom.key}"] .list`);
    // update count
    grid.select(`[data-domain="${dom.key}"] .count`).text(items.length);

    // bind tiles
    const tiles = list.selectAll('.tile')
      .data(items, d => d.rank);

    // exit
    tiles.exit().transition().duration(250).style('opacity',0).remove();

    // enter
    const enter = tiles.enter()
      .append('div')
        .attr('class', d => `tile ${dom.css}`)
        .style('opacity',0)
        .on('mousemove', tileMouseMove)
        .on('mouseout', tileMouseOut)
        .on('click', tileClick);

    enter.append('div').attr('class','rank').text(d => d.rank);
    const info = enter.append('div').style('min-width','0px'); // wrapper
    info.append('div').attr('class','name').text(d => d.name);
    info.append('div').attr('class','sub').text(d => `#${d.rank} • ${dom.label}`);

    // merge + transition
    enter.merge(tiles)
      .transition().duration(350)
      .style('opacity',1)
      .style('transform','translateY(0)');
  });
}

/* initial render */
renderTiles(strengths);
  renderCliftonSVGBar(strengths);


/* TOOLTIP elements */
const tooltip = d3.select('#tooltip');

function tileMouseMove(event, d){
  // show tooltip with short description
  tooltip.style('display','block')
         .html(`<strong style="display:block;margin-bottom:6px">${d.rank}. ${d.name}</strong>
                <div style="color:var(--muted);font-size:13px">${d.short}</div>`);
  // position tooltip near pointer, with small offset
  const [mx,my] = d3.pointer(event);
  const left = event.clientX + 12;
  const top = event.clientY + 12;
  tooltip.style('left', left + 'px').style('top', top + 'px');
  // highlight same-domain tiles
  d3.selectAll('.tile').classed('muted', t => t.domain !== d.domain);
  highlightRank(d.rank);

}


function tileMouseOut(){
  tooltip.style('display','none');
  d3.selectAll('.tile').classed('muted', false);
  clearAllHighlights();

}

function tileClick(event, d) {
  const isMobile = window.innerWidth <= 900;

  // Desktop: update in-section panel; no modal, no scroll lock
  if (!isMobile) {
    const details = d3.select('#details');
    const domColor = (domainOrder.find(x => x.key===d.domain) || {}).color || 'var(--domColor)';
    details.html(`
      <h2 style="color:${domColor}">${d.rank}. ${d.name}
        <span style="font-size:13px;color:var(--muted);margin-left:8px">(${d.domain})</span>
      </h2>
      <p style="font-size:14px;margin:4px 0 10px 0;color:#fff">${d.short}</p>
      <p><strong>How to use this strength (practical):</strong> ${d.tips}</p>
      <p style="margin-top:8px;font-size:13px;color:var(--muted)">
        Tap another tile to view its notes. Use the Search to filter.
      </p>
    `);

    d3.select('#svgBarWrap svg').selectAll('rect').attr('stroke', null).attr('stroke-width', null);
    d3.select('#svgBarWrap svg rect[data-rank="' + d.rank + '"]').attr('stroke', '#fff').attr('stroke-width', 2);
    highlightRank(d.rank);
    return;
  }

  // Mobile: open modal with robust close logic
  const modal = document.getElementById("mobileModal");
  const body = document.getElementById("mobileModalBody");
  const dom = domainOrder.find(x => x.key === d.domain);
  const content = modal.querySelector('.mobile-modal-content');
  const closeBtn = modal.querySelector('.close-btn');

  body.innerHTML = `
    <h2 style="color:${dom ? dom.color : 'var(--domColor)'}; margin:0 0 6px 0;">
      ${d.rank}. ${d.name}
      <span style="font-size:13px;color:var(--muted);margin-left:8px">(${d.domain})</span>
    </h2>
    <p style="font-size:14px;margin:4px 0 10px 0;color:#fff">${d.short}</p>
    <p><strong>How to use this strength:</strong> ${d.tips}</p>
  `;

  const closeModal = () => {
    modal.classList.remove('open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    modal.onclick = null;
    if (closeBtn) closeBtn.onclick = null;
    if (modal._escHandler) {
      document.removeEventListener('keydown', modal._escHandler);
      delete modal._escHandler;
    }
  };

  // Open + lock background scroll
  modal.classList.add('open');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  // Close by X
  if (closeBtn) closeBtn.onclick = closeModal;

  // Close by backdrop (ignore clicks inside sheet)
  modal.onclick = (e) => { if (!content.contains(e.target)) closeModal(); };

  // Close by ESC
  modal._escHandler = (e) => { if (e.key === 'Escape') closeModal(); };
  document.addEventListener('keydown', modal._escHandler);
}



/* ===== Stack bar showing distribution of domains ===== */
function clearAllHighlights(){
  d3.select('#svgBarWrap svg').selectAll('rect')
    .attr('stroke', null).attr('stroke-width', null);
  d3.selectAll('.tile').classed('muted', false);
  d3.selectAll('.stack-seg')
    .attr('opacity', 1)
    .attr('stroke', null)
    .attr('stroke-width', null);
}
function highlightRank(rank){
  // Top barcode
  d3.select('#svgBarWrap svg').selectAll('rect')
    .attr('stroke', null).attr('stroke-width', null);
  d3.select('#svgBarWrap svg rect[data-rank="' + rank + '"]')
    .attr('stroke', '#fff').attr('stroke-width', 2);
  // Tiles
  d3.selectAll('.tile').classed('muted', t => t.rank !== rank);
  // Stackbar segments
  const strength = strengths.find(s => s.rank === rank);
  if(strength){
    d3.selectAll('.stack-seg')
      .attr('opacity', s => s.key === strength.domain ? 1 : 0.25)
      .attr('stroke', s => s.key === strength.domain ? '#fff' : null)
      .attr('stroke-width', s => s.key === strength.domain ? 2 : null);
  }
}
function highlightDomain(domainKey){
  // tiles by domain
  d3.selectAll('.tile').classed('muted', t => t.domain !== domainKey);

  // top bars by domain
  const bars = d3.select('#svgBarWrap svg').selectAll('rect');
  bars.attr('stroke', null).attr('stroke-width', null);
  bars.filter(d => d && d.domain === domainKey)
      .attr('stroke', '#fff').attr('stroke-width', 2);

  // stackbar emphasize the selected segment
  d3.selectAll('.stack-seg')
    .attr('opacity', s => s && s.key === domainKey ? 1 : 0.25)
    .attr('stroke', s => s && s.key === domainKey ? '#fff' : null)
    .attr('stroke-width', s => s && s.key === domainKey ? 2 : null);
}
function renderStackBar(data){
  const counts = domainOrder.map(dom => {
    return { key: dom.key, label: dom.label, color: dom.color, count: data.filter(d => d.domain===dom.key).length };
  });
  const total = d3.sum(counts, d => d.count);

  const width = 520;
  const height = 16;
  d3.select('#stackbar').html(''); // clear
const svg = d3.select('#stackbar').append('svg')
  .attr('viewBox', `0 0 ${width} ${height}`)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .attr('width', null)
  .attr('height', null);
  let x = 0;
counts.forEach(segment => {
  const segW = Math.round((segment.count / total) * width);
svg.append('rect')
  .attr('x', x)
  .attr('y', 0)
  .attr('width', segW)
  .attr('height', height)
  .attr('fill', segment.color)
  .attr('rx', 4)
  .attr('class', 'stack-seg')
  .append('title').text(`${segment.label}: ${segment.count}`);
  x += segW; // advance x for next segment
}); // <- close forEach properly

  // legend to right
  const legend = d3.select('#stackLegend').html('');
  counts.forEach(seg => {
    legend.append('div').style('display','flex').style('gap','6px').style('align-items','center').html(`
      <div style="width:12px;height:12px;border-radius:3px;background:${seg.color}"></div>
      <div style="font-size:13px;color:var(--muted)">${seg.label} (${seg.count})</div>
    `);
  });
}
renderStackBar(strengths);

/* ===== Controls: Search, Top5, Export CSV ===== */
d3.select('#search').on('input', function(){
  const q = this.value.trim().toLowerCase();
  if(!q){
    d3.selectAll('.tile').style('opacity',1);
    return;
  }
  d3.selectAll('.tile').each(function(d){
    const match = d.name.toLowerCase().includes(q) || String(d.rank) === q;
    d3.select(this).style('opacity', match ? 1 : 0.18);
  });
});

let top5Active = false;

d3.select('#top5').on('click', function(){
  if (!top5Active) {
    // activate
    d3.selectAll('.tile').style('opacity', t => (t.rank <= 5 ? 1 : 0.12)); // highlight top 5 tiles [web:74]
    // outline the top 5 bars
    const svgBars = d3.select('#svgBarWrap svg').selectAll('rect');
    svgBars.attr('stroke', null).attr('stroke-width', null);
    strengths.filter(s => s.rank <= 5).forEach(s => {
      d3.select('#svgBarWrap svg rect[data-rank="' + s.rank + '"]')
        .attr('stroke', '#fff').attr('stroke-width', 2);
    });
    top5Active = true;
  } else {
    // deactivate: full reset
    d3.selectAll('.tile').style('opacity', 1);
    clearAllHighlights(); // clears strokes and mutes [web:74]
    top5Active = false;
  }
});


d3.select('#exportCSV').on('click', function(){
  const rows = ["rank,name,domain,short"];
  strengths.forEach(s => rows.push(`${s.rank},"${s.name.replace(/"/g,'""')}","${s.domain}","${s.short.replace(/"/g,'""')}"`));
  const blob = new Blob([rows.join("\n")], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'clifton_strengths_34.csv';
  a.click();
  URL.revokeObjectURL(url);
});

/* ===== Responsive niceties: if header overlaps, add top padding (optional) ===== */
/* If you embed into a page with a fixed header, call:
     document.querySelector('#app').style.paddingTop = '80px';
   (example included in integration notes)
*/

/* If you want to re-render after editing data, call:
     renderTiles(newData); renderStackBar(newData);
*/

/* END OF SCRIPT */
 function renderCliftonSVGBar(data) {
  const domainColors = {
    EXECUTING: "#8b61ff",
    INFLUENCING: "#ff9b3f",
    RELATIONSHIP: "#3aa0ff",
    STRATEGIC: "#38d07a"
  };

  const svgWidth = 500, svgHeight = 60;
  const barWidth = 8, barHeight = 40, spacing = 12;

  // Reset
  d3.select('#svgBarWrap').html('');
 const svg = d3.select('#svgBarWrap')
  .append('svg')
  .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
  .attr('preserveAspectRatio','xMidYMid meet')
  .attr('width', null)
  .attr('height', null);


  // ---- helper function to draw a group of bars ----
  function drawBars(container, bars) {
    container.selectAll('rect')
      .data(bars)
      .enter()
      .append('rect')
        .attr('x', (d,i) => i * spacing)
        .attr('y', 0)
        .attr('width', barWidth)
        .attr('height', barHeight)
        .attr('rx', 2)
        .attr('fill', d => domainColors[d.domain] || '#ccc')
        .attr('data-rank', d => d.rank)
        .style('cursor','pointer')
.on('mouseover', function(e,d) {
  barHoverOnly(d); // highlight only — no tooltip or details
})
.on('mouseout', function() {
  clearAllHighlights(); // reset everything
})
.on('click', function(e,d) {
  tileClick(e,d); // open details panel if clicked
});

  }

  // ---- LEFT 5 bars ----
  const leftBars = data.filter(d => d.rank <= 5);
  const leftG = svg.append('g').attr('transform','translate(0,10)');
  drawBars(leftG, leftBars);

  // ---- Decorative lines left ----
  svg.append('line').attr('x1',0).attr('y1',5).attr('x2',56).attr('y2',5)
    .attr('stroke','#bfbfbf').attr('stroke-width',6).attr('stroke-linecap','round');
  svg.append('line').attr('x1',0).attr('y1',55).attr('x2',56).attr('y2',55)
    .attr('stroke','#bfbfbf').attr('stroke-width',6).attr('stroke-linecap','round');

  // ---- Diagonals after 5 bars ----
  svg.append('line').attr('x1',56).attr('y1',5).attr('x2',116).attr('y2',55)
    .attr('stroke','#bfbfbf').attr('stroke-width',6).attr('stroke-linecap','round');
  svg.append('line').attr('x1',56).attr('y1',55).attr('x2',116).attr('y2',5)
    .attr('stroke','#bfbfbf').attr('stroke-width',6).attr('stroke-linecap','round');

  // ---- RIGHT 29 bars ----
  const rightBars = data.filter(d => d.rank > 5);
  const rightG = svg.append('g').attr('transform','translate(116,10)');
  drawBars(rightG, rightBars);

  // ---- Decorative lines right ----
  svg.append('line')
    .attr('x1',116).attr('y1',5).attr('x2',500).attr('y2',5)
    .attr('stroke','#bfbfbf').attr('stroke-width',6).attr('stroke-linecap','round');
  svg.append('line')
    .attr('x1',116).attr('y1',55).attr('x2',500).attr('y2',55)
    .attr('stroke','#bfbfbf').attr('stroke-width',6).attr('stroke-linecap','round');
}
function barHoverOnly(d){
  // Reset previous highlights
  d3.selectAll('.tile').classed('muted', false).classed('highlighted', false);
  clearAllHighlights(); // clears stackbar and top bar strokes

  // Highlight the top barcode
  d3.select('#svgBarWrap svg rect[data-rank="' + d.rank + '"]')
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);

  // Highlight the corresponding tile
  d3.selectAll('.tile')
    .filter(t => t.rank === d.rank)
    .classed('highlighted', true);

  // Muted effect for other tiles (optional)
  d3.selectAll('.tile')
    .filter(t => t.rank !== d.rank)
    .classed('muted', true);

  // Highlight stackbar
  const strength = strengths.find(s => s.rank === d.rank);
  if(strength){
    d3.selectAll('.stack-seg')
      .attr('opacity', s => s.key === strength.domain ? 1 : 0.25)
      .attr('stroke', s => s.key === strength.domain ? '#fff' : null)
      .attr('stroke-width', s => s.key === strength.domain ? 2 : null);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const slider   = document.getElementById("certSlider");
  const leftBtn  = document.querySelector(".cert-arrow.left");
  const rightBtn = document.querySelector(".cert-arrow.right");

  if (!slider || !leftBtn || !rightBtn) return;

  // Original slides (real certificates)
  const realSlides = Array.from(slider.querySelectorAll(".cert-slide"));
  const realCount  = realSlides.length;
  if (!realCount) return;

  /* ========= Infinite loop setup: clone edges ========= */
  const firstClone = realSlides[0].cloneNode(true);
  const lastClone  = realSlides[realCount - 1].cloneNode(true);

  slider.appendChild(firstClone);             // ... 1 2 3 4 5 [clone of 1]
  slider.insertBefore(lastClone, realSlides[0]); // [clone of 5] 1 2 3 4 5 ...

  let slides = Array.from(slider.querySelectorAll(".cert-slide"));

  let index           = 1; // start on first REAL slide (after left clone)
  let slideWidth      = slider.clientWidth;
  let isDragging      = false;
  let startX          = 0;
  let currentTranslate = 0;
  let prevTranslate    = 0;
  const isMobile = window.innerWidth <= 768;

  function setSlideWidth() {
    slideWidth = slider.clientWidth;
    goToIndex(index, false);
  }

  function goToIndex(targetIndex, withTransition = true) {
    if (withTransition) {
      slider.style.transition = "transform 0.35s ease";
    } else {
      slider.style.transition = "none";
    }
    slider.style.transform = `translateX(-${targetIndex * slideWidth}px)`;
  }

  // After animating onto a clone, snap back to corresponding real slide
  function snapIfClone() {
    if (index === slides.length - 1) {
      // on right clone (copy of first)
      index = 1;
      goToIndex(index, false);
    } else if (index === 0) {
      // on left clone (copy of last)
      index = slides.length - 2;
      goToIndex(index, false);
    }
  }

  window.addEventListener("resize", setSlideWidth);
  setSlideWidth();

  /* ========= AUTOPLAY ========= */
  function nextSlide() {
    index++;
    goToIndex(index, true);
    setTimeout(snapIfClone, 360);
  }

  function prevSlide() {
    index--;
    goToIndex(index, true);
    setTimeout(snapIfClone, 360);
  }

  let autoPlayInterval = setInterval(nextSlide, 3000);

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  function resumeAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 3000);
  }

  // Arrow buttons
  rightBtn.addEventListener("click", () => {
    stopAutoPlay();
    nextSlide();
    resumeAutoPlay();
  });

  leftBtn.addEventListener("click", () => {
    stopAutoPlay();
    prevSlide();
    resumeAutoPlay();
  });

  /* ========= DRAG / SWIPE ========= */
  /* ========= DRAG / SWIPE ========= */
  const getX = (e) =>
    e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;

  // ❗ Enable drag/swipe only on desktop/laptop
  if (!isMobile) {
    slides.forEach((slide) => {
      const start = (e) => {
        stopAutoPlay();
        isDragging = true;
        startX = getX(e);
        prevTranslate = -index * slideWidth;
        slider.style.transition = "none";
      };

      const move = (e) => {
        if (!isDragging) return;
        const currentX = getX(e);
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
        slider.style.transform = `translateX(${currentTranslate}px)`;
      };

      const end = () => {
        if (!isDragging) return;
        isDragging = false;

        const moved = currentTranslate - prevTranslate;
        if (moved < -60) {
          index++;
        } else if (moved > 60) {
          index--;
        }

        goToIndex(index, true);
        setTimeout(snapIfClone, 360);
        resumeAutoPlay();
      };

      // Mouse
      slide.addEventListener("mousedown", start);
      slide.addEventListener("mousemove", move);
      slide.addEventListener("mouseup", end);
      slide.addEventListener("mouseleave", end);

      // Touch (desktop touchscreens only, still fine)
      slide.addEventListener("touchstart", start, { passive: true });
      slide.addEventListener("touchmove", move, { passive: true });
      slide.addEventListener("touchend", end);
    });
  }


  /* ========= MODAL (FULL VIEW) – uses ONLY real slides ========= */
  const modal         = document.getElementById("cert-modal");
  const modalImg      = document.getElementById("cert-modal-img");
  const modalLeft     = document.querySelector(".modal-arrow.modal-left");
  const modalRight    = document.querySelector(".modal-arrow.modal-right");
  const modalBackdrop = document.querySelector(".cert-backdrop");

  let modalIndex = 0; // 0..realCount-1

  function openModal(realIdx) {
    modalIndex = realIdx;
    modalImg.src = realSlides[modalIndex].src;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    stopAutoPlay();
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    resumeAutoPlay();
  }

  function showNextModal() {
    modalIndex = (modalIndex + 1) % realCount;
    modalImg.src = realSlides[modalIndex].src;
    index = modalIndex + 1; // +1 because of left clone
    goToIndex(index, true);
  }

  function showPrevModal() {
    modalIndex = (modalIndex - 1 + realCount) % realCount;
    modalImg.src = realSlides[modalIndex].src;
    index = modalIndex + 1;
    goToIndex(index, true);
  }

  // Clicking any slide – map clones to correct real index
  slides.forEach((slide, i) => {
    slide.addEventListener("click", () => {
      let realIdx;
      if (i === 0) {
        realIdx = realCount - 1;              // left clone → last real
      } else if (i === slides.length - 1) {
        realIdx = 0;                          // right clone → first real
      } else {
        realIdx = i - 1;                      // normal case
      }
      openModal(realIdx);
    });
  });

  // Modal arrows
  if (modalRight) {
    modalRight.addEventListener("click", (e) => {
      e.stopPropagation();
      showNextModal();
    });
  }
  if (modalLeft) {
    modalLeft.addEventListener("click", (e) => {
      e.stopPropagation();
      showPrevModal();
    });
  }

  // Click blur background to close
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", () => {
      closeModal();
    });
  }

  // ESC / Backspace to close
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Escape" || e.key === "Backspace") &&
        modal.classList.contains("show")) {
      closeModal();
    }
  });
});

function openMobileModal(html){
  const modal = document.getElementById("mobileModal");
  const body = document.getElementById("mobileModalBody");
  if (!modal || !body) return;

  body.innerHTML = html;
  modal.classList.add('open');

  // Lock page scroll while modal is open
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  const content = modal.querySelector('.mobile-modal-content');
  const closeBtn = modal.querySelector('.close-btn');

  const close = () => closeMobileModal();

  // Close by X
  if (closeBtn) closeBtn.onclick = close;

  // Close by tapping backdrop (outside content)
  modal.onclick = (e) => {
    if (!content.contains(e.target)) close();
  };

  // Close by ESC
  modal._escHandler = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', modal._escHandler);
}

function closeMobileModal(){
  const modal = document.getElementById("mobileModal");
  if (!modal) return;

  modal.classList.remove('open');

  // Restore page scroll
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  // Remove handlers
  const closeBtn = modal.querySelector('.close-btn');
  if (closeBtn) closeBtn.onclick = null;
  modal.onclick = null;
  if (modal._escHandler){
    document.removeEventListener('keydown', modal._escHandler);
    delete modal._escHandler;
  }
}

// Safety: if resized to desktop, ensure modal is closed and scroll unlocked
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMobileModal();
});

(() => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const form = $('#contactForm');
  const btn = $('#cf-submit');
  const success = $('#cf-success');
  const count = $('#cf-count'); // optional if you add a counter element
  const toast = $('#toast');
  const msg = $('#cf-message');

  /* ========== Character counter (no hard cap) ========== */
  if (msg && count) {
    const update = () => { count.textContent = msg.value.length; };
    msg.addEventListener('input', update); update();
  }

  /* ========== Validation (no Subject) ========== */
  const rules = {
    name: v => v.trim().length >= 3 || 'Your name cant be less than 3 Characters!',
    email: v => /\S+@\S+\.\S+/.test(v) || 'Mailing address',
    message: v => v.trim().length >= 10 || 'Minimum 10 character please.'
  };

  function setError(id, msg) {
    const el = $('#err-' + id);
    if (el) el.textContent = msg || '';
  }

  function validateField(id, value) {
    const rule = rules[id];
    if (!rule) return true;
    const ok = rule(value);
    setError(id, ok === true ? '' : ok);
    return ok === true;
  }

  [['name','cf-name'],['email','cf-email'],['message','cf-message']].forEach(([key, id]) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur', () => validateField(key, input.value));
    input.addEventListener('input', () => setError(key, ''));
  });

  /* ========== Submit handling (simulate network) ========== */
form?.addEventListener('submit', async e => {
  e.preventDefault(); // ✅ stop page refresh
  console.log('Form submit triggered');

  const data = {
    name: $('#cf-name')?.value.trim() || '',
    email: $('#cf-email')?.value.trim() || '',
    message: $('#cf-message')?.value.trim() || '',
    files: Array.from($('#cf-files')?.files || [])
  };

  // ✅ Validation
  const valid = ['name','email','message'].every(k => validateField(k, data[k]));
  if (!valid) return;

  btn?.classList.add('loading');
  btn?.setAttribute('disabled', 'true');

  // ✅ Prepare FormData
  const fd = new FormData();
  fd.append('name', data.name);
  fd.append('email', data.email);
  fd.append('message', data.message);
  data.files.forEach(f => fd.append('files', f));

  try {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbzIkWLd83Vv-cS4jampaN_oYCElc3bc0XDjtGc75GNyRM5q4p0ARhH7HSahBjak7qcf/exec',
      {
        method: 'POST',
        body: fd,
      }
    );

    console.log('Fetch done ✅', res);

    // Since no-cors hides response, assume success visually
await new Promise(r => setTimeout(r, 500));
success?.removeAttribute('hidden');
form.querySelectorAll('input, textarea, select, button').forEach(el => el.setAttribute('disabled', 'true'));

// ✅ Auto-reset form after 5 seconds
setTimeout(() => {
  success?.setAttribute('hidden','true');
  form.reset();
  form.querySelectorAll('input, textarea, select, button').forEach(el => el.removeAttribute('disabled'));
  btn?.classList.remove('loading');
  btn?.removeAttribute('disabled');
  // Clear validation errors
  setError('name',''); setError('email',''); setError('message','');
  if (msg) msg.dispatchEvent(new Event('input')); // refresh counter if present
}, 5000); // 5000ms = 5 seconds


  } catch (err) {
    console.error('Error sending message:', err);
    alert('⚠️ Message not sent. Try again later.');
    btn?.classList.remove('loading');
    btn?.removeAttribute('disabled');
  }
});

  $('#cf-send-another')?.addEventListener('click', () => {
    success?.setAttribute('hidden','true');
    form?.reset();
    form?.querySelectorAll('input, textarea, select, button').forEach(el => el.removeAttribute('disabled'));
    btn?.classList.remove('loading');
    btn?.removeAttribute('disabled');
    setError('name',''); setError('email',''); setError('message','');
    if (msg) msg.dispatchEvent(new Event('input')); // refresh counter if present
  });

  /* ========== Copy email with feedback ========== */
  async function copyText(text) {
    if (!text) throw new Error('No text to copy');
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); }
    finally { document.body.removeChild(ta); }
  }

  function flashAction(el, ok = true) {
    const label = el.querySelector('.contact-action');
    const original = label?.textContent || 'Copy';
    if (label) label.textContent = ok ? 'Copied' : 'Failed';
    el.classList.add(ok ? 'copied' : 'copy-failed');
    setTimeout(() => {
      if (label) label.textContent = original;
      el.classList.remove('copied', 'copy-failed');
    }, 1100);
  }

  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-msg');
    if (msgEl) msgEl.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 2000);
  }

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.js-copy');
    if (!btn) return;
    const text = btn.dataset.copy?.trim() || btn.querySelector('.contact-value')?.textContent.trim() || '';
    try {
      await copyText(text);
      flashAction(btn, true);
      showToast('Copied to clipboard');
    } catch (err) {
      console.error('Copy failed:', err);
      flashAction(btn, false);
      showToast('Copy failed');
    }
  });

  /* ========== Quick actions ========== */
  $('#qa-resume')?.addEventListener('click', () => showToast('Resume download starting...'));
  $('#qa-meet')?.addEventListener('click', () => showToast('Opening meeting scheduler...'));
})();

document.addEventListener("DOMContentLoaded", function () {
  var qrBtn      = document.getElementById("view-qr-btn");
  var shareBtn   = document.getElementById("share-portfolio-btn");
  var qrWrapper  = document.getElementById("qr-wrapper");
  var qrImage    = qrWrapper ? qrWrapper.querySelector(".qr-image") : null;

  // New modal elements
  var qrModal         = document.getElementById("qr-modal");
  var qrModalImg      = document.getElementById("qr-modal-img");
  var qrModalBackdrop = document.querySelector(".qr-modal-backdrop");

  var portfolioUrl = "https://mohammad-mujahid894.github.io/Portfolio/";
  var shareText    = "Check out my portfolio website:";

  // 🔹 Helper: close mobile menu (hamburger + dropdown)
  function closeMobileMenu() {
    var navbarEl  = document.getElementById("navbar");
    var burgerEl  = document.querySelector(".hamburger");
    if (navbarEl)  navbarEl.classList.remove("show");
    if (burgerEl)  burgerEl.classList.remove("active");
    document.querySelectorAll(".dropdown").forEach(function (d) {
      d.classList.remove("open");
    });
  }

  // Helper: ensure small QR box is visible
  function openQrBox() {
    if (!qrWrapper) return;
    qrWrapper.style.display = "block";
  }

  // Helper: toggle small QR box (dropdown style)
  function toggleQrBox() {
    if (!qrWrapper) return;
    var isHidden = (qrWrapper.style.display === "none" || qrWrapper.style.display === "");
    qrWrapper.style.display = isHidden ? "block" : "none";
  }

  // ===== Modal open / close =====
  function openQrModal() {
    if (!qrModal) return;
    qrModal.classList.add("show");
    // Lock background scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

 function closeQrModal() {
  if (!qrModal) return;

  qrModal.classList.remove("show");

  // Always hide the small QR box when modal closes
  if (qrWrapper) {
    qrWrapper.style.display = "none";
  }

  // Restore scroll
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}


  // 🔳 Quick actions: button → show/hide small QR box
  if (qrBtn) {
    qrBtn.addEventListener("click", function () {
      toggleQrBox();
    });
  }

  // 🖼️ Click on small QR → open centered modal
  if (qrImage) {
    qrImage.addEventListener("click", function () {
      openQrBox();    // make sure it's visible
      openQrModal();  // open fullscreen popup
    });
  }

  // Click outside (backdrop) → close modal
  if (qrModalBackdrop) {
    qrModalBackdrop.addEventListener("click", closeQrModal);
  }

  // Click on big QR itself → also close
  if (qrModalImg) {
    qrModalImg.addEventListener("click", closeQrModal);
  }

  // ESC / Backspace → close (desktop + external keyboard on mobile)
  document.addEventListener("keydown", function (e) {
    if (
      (e.key === "Escape" || e.key === "Backspace") &&
      qrModal &&
      qrModal.classList.contains("show")
    ) {
      closeQrModal();
    }
  });

  /* ===============================
   * 🔗 NAVBAR DROPDOWN HOOKS
   * =============================== */

  // "Projects" in More ▾ → open / close QR popup (same as QR behaviour)
  var navProjectsLink = document.querySelector('.dropdown-content a[href="./index.html#projects"]');

  if (navProjectsLink) {
    navProjectsLink.addEventListener("click", function (e) {
      e.preventDefault();
      // close mobile menu (hamburger) if open
      closeMobileMenu();

      // Toggle QR modal
      if (qrModal && qrModal.classList.contains("show")) {
        // Currently open → close everything
        closeQrModal();
        if (qrWrapper) {
          qrWrapper.style.display = "none";
        }
      } else {
        // Currently closed → show dropdown QR + popup centered
        openQrBox();
        openQrModal();
      }
    });
  }

  // "Blogs" in More ▾ → same as "Share My Portfolio" quick action
  var navBlogsLink = document.querySelector('.dropdown-content a[href="./index.html#blogs"]');

  if (navBlogsLink && shareBtn) {
    navBlogsLink.addEventListener("click", function (e) {
      e.preventDefault();
      closeMobileMenu();
      // Reuse same logic as the Quick Action button
      shareBtn.click();
    });
  }

  // 📤 Share my portfolio (Quick actions button)
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      if (navigator.share) {
        navigator.share({
          title: "My Portfolio – Mohammad Mujahid",
          text: shareText,
          url: portfolioUrl
        }).catch(function () {
          // user cancelled or failed – ignore
        });
      } else {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(portfolioUrl)
            .then(function () {
              alert("Portfolio link copied to clipboard.\nYou can now paste it into WhatsApp, email, etc.");
            })
            .catch(function () {
              alert("Could not copy automatically. You can share this link:\n" + portfolioUrl);
            });
        } else {
          var temp = document.createElement("input");
          temp.value = portfolioUrl;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
          alert("Portfolio link copied to clipboard.\nYou can now paste it into WhatsApp, email, etc.");
        }
      }
    });
  }
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Called by the Google Apps Script JSONP response
  function updateVisitorCount(data) {
    try {
      var n = data && data.count ? Number(data.count) : 0;
      var el = document.getElementById("visitor-count");
      if (el) {
        el.textContent = n.toLocaleString("en-IN");
      }
    } catch (err) {
      console.error("Visitor counter error:", err);
    }
  }

const aperianModal = document.getElementById("aperianModal");

  function openAperianModal() {
    aperianModal.classList.add("open");
  }

  function closeAperianModal() {
    aperianModal.classList.remove("open");
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAperianModal();
    }
  });

const agenticModal = document.getElementById("agenticModal");

  function openAgenticModal() {
    agenticModal.classList.add("open");
  }

  function closeAgenticModal() {
    agenticModal.classList.remove("open");
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAgenticModal();
    }
  });
