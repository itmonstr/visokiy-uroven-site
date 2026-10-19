const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroVisual = document.querySelector('[data-hero-parallax]');
if (heroVisual && !reducedMotion && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let heroFrame;
  heroVisual.addEventListener('pointermove', e => {
    cancelAnimationFrame(heroFrame);
    heroFrame = requestAnimationFrame(() => {
      const bounds = heroVisual.getBoundingClientRect();
      heroVisual.style.setProperty('--hero-x', `${(0.5-(e.clientX-bounds.left)/bounds.width)*12}px`);
      heroVisual.style.setProperty('--hero-y', `${(0.5-(e.clientY-bounds.top)/bounds.height)*12}px`);
    });
  });
  heroVisual.addEventListener('pointerleave', () => {
    cancelAnimationFrame(heroFrame);
    heroVisual.style.setProperty('--hero-x', '0px');
    heroVisual.style.setProperty('--hero-y', '0px');
  });
}
const archiveFiles=['hero.jpg','img_4254-scaled.jpg','img_4775-scaled.jpg','img-20230224-wa0025.jpg','img-20220428-wa0031.jpg','j8ptsj8pfugqdtxq1myo4ey_hntsmq1.jpg','img-bathroom.jpg','img_2205-scaled.jpg','nsqprq2ihibd3oarxz9hqztudqq7nbe2.jpg','img-20230224-wa0015.jpg','fqm-xlwyyzu6qa7a98io7desqz1euqxh.jpg','20240106_154701-scaled.jpg','p5j5xhmbs0xu0kjw_tqtwp7sdia4ai9j.jpg','img_3306-scaled.jpg','img_4476-scaled.jpg','img_20230803_213728_470.jpg','img-0325.jpg','upvfij68rjxfomdepzpxhtls-htkkyka.jpg','interior.jpg'];
const archive=document.querySelector('#portfolio-archive');
archiveFiles.forEach((file,index)=>{const button=document.createElement('button');button.type='button';button.className='project archive-project';button.dataset.image=`assets/${file}`;button.dataset.title=`Выполненная работа — фото ${index+1}`;button.dataset.description='Фотография выполненной работы из портфолио компании «Высокий уровень». Обсудим похожее решение для вашего помещения.';button.hidden=index>=6;const img=document.createElement('img');img.src=`assets/${file}`;img.alt=`Выполненная работа компании — фотография ${index+1}`;img.loading='lazy';const caption=document.createElement('span');caption.className='archive-number';caption.textContent=`${String(index+1).padStart(2,'0')} ↗`;button.append(img,caption);archive.append(button);});
document.querySelector('#archive-more').addEventListener('click',e=>{const button=e.currentTarget;const expanded=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(expanded));archive.querySelectorAll('.project').forEach((p,i)=>p.hidden=!expanded&&i>=6);button.innerHTML=expanded?'Свернуть галерею <span>↑</span>':'Показать все 19 фотографий <span>↓</span>';});
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню'); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Открыть меню'); navigation.classList.remove('open'); }));
document.addEventListener('keydown', e => { if(e.key === 'Escape') { menu.setAttribute('aria-expanded','false'); navigation.classList.remove('open'); } });
if (!reducedMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('.section h2,.service-layout,.heading-row,.trust-list,.steps,.project').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
  if (matchMedia('(hover: hover)').matches) document.querySelectorAll('[data-tilt]').forEach(el => {
    let frame;
    el.addEventListener('pointermove', e => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { const r = el.getBoundingClientRect(); el.style.setProperty('--rx', `${-(e.clientY-r.top-r.height/2)/r.height*4}deg`); el.style.setProperty('--ry', `${(e.clientX-r.left-r.width/2)/r.width*4}deg`); }); });
    el.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); el.style.setProperty('--rx','0deg'); el.style.setProperty('--ry','0deg'); });
  });
}
const descriptions = {
  all: 'Три слоя работают вместе: основание, защита от шума и финишный потолок со светом.',
  sound: 'Звукоизоляционный слой поглощает шум и создаёт безупречную тишину в помещении.',
  light: 'Свет интегрирован в потолок: световые линии и продуманное освещение создают комфортную среду.'
};

function setEngineeringLayer(mode) {
  document.querySelectorAll('[data-layer]').forEach(b => {
    const isActive = b.dataset.layer === mode;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', String(isActive));
  });
  const stage = document.querySelector('.eng-stage-box, .model-stage');
  if (stage) stage.dataset.mode = mode;

  const desc = document.querySelector('.layer-description, .eng-hint-text');
  if (desc && descriptions[mode]) desc.textContent = descriptions[mode];

  document.querySelectorAll('.eng-callout-card').forEach(card => {
    const cardLayer = card.dataset.callout;
    if (mode === 'all') {
      card.classList.add('active');
      card.classList.remove('dimmed');
    } else {
      const isTarget = (mode === 'sound' && cardLayer === 'sound') || (mode === 'light' && cardLayer === 'light');
      card.classList.toggle('active', isTarget);
      card.classList.toggle('dimmed', !isTarget);
    }
  });
}

document.querySelectorAll('[data-layer]').forEach(button => {
  button.addEventListener('click', () => setEngineeringLayer(button.dataset.layer));
});

document.querySelectorAll('.eng-callout-card').forEach(card => {
  card.addEventListener('click', () => {
    const callout = card.dataset.callout;
    if (callout === 'sound') setEngineeringLayer('sound');
    else if (callout === 'light') setEngineeringLayer('light');
    else setEngineeringLayer('all');
  });
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active',b===button); b.setAttribute('aria-pressed',String(b===button)); }); document.querySelectorAll('.project-grid .project').forEach(p => { p.hidden=button.dataset.filter!=='all'&&p.dataset.category!==button.dataset.filter; }); document.querySelector('.project-grid').classList.toggle('filtered',button.dataset.filter!=='all'); }));
const moodScenarios = {
  morning: {
    title: 'Режим «Утро» — бодрость и энергия',
    desc: 'Мягкий свет для спокойного пробуждения.',
    tags: [
      { icon: '<svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.93 4.93l1.8 1.8M17.27 17.27l1.8 1.8M4.93 19.07l1.8-1.8M17.27 6.73l1.8-1.8"/></svg>', label: 'Мягкий подъем' },
      { icon: '<svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>', label: 'Бодрость и тонус' },
      { icon: '<svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>', label: 'Комфорт для глаз' }
    ]
  },
  day: {
    title: 'Режим «День» — естественный ритм',
    desc: 'Ровный свет для работы, кухни и повседневных дел.',
    tags: [
      { icon: '<svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>', label: 'Комфорт для глаз' },
      { icon: '<svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>', label: 'Яркое освещение' },
      { icon: '<svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', label: 'Подходит для работы' }
    ]
  },
  evening: {
    title: 'Режим «Вечер» — тёплая атмосфера',
    desc: 'Приглушённый тёплый свет для отдыха и кино.',
    tags: [
      { icon: '<svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>', label: 'Тёплая атмосфера' },
      { icon: '<svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>', label: 'Кино без бликов' },
      { icon: '<svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>', label: 'Отдых и релакс' }
    ]
  }
};

const lightDetails = document.querySelector('#light-details');
const lightPhoto = lightDetails ? (lightDetails.querySelector('.light-arch-frame') || lightDetails.querySelector('.solution-photo')) : null;
const moodExpTitle = document.querySelector('#mood-exp-title');
const moodExpDesc = document.querySelector('#mood-exp-desc');
const moodExpTags = document.querySelector('#mood-exp-tags');

function triggerTrackPulse() {
  if (!lightPhoto || reducedMotion) return;
  lightPhoto.classList.remove('light-pulse-active');
  void lightPhoto.offsetWidth;
  lightPhoto.classList.add('light-pulse-active');
}

document.querySelectorAll('[data-light-scene]').forEach(button => {
  button.addEventListener('click', () => {
    const scene = button.dataset.lightScene;
    document.querySelectorAll('[data-light-scene]').forEach(b => {
      b.classList.toggle('active', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });
    if (lightDetails) lightDetails.dataset.scene = scene;

    const data = moodScenarios[scene];
    if (data) {
      if (moodExpTitle) moodExpTitle.textContent = data.title;
      if (moodExpDesc) moodExpDesc.textContent = data.desc;
      if (moodExpTags) {
        moodExpTags.innerHTML = data.tags.map(tag => `<span class="mood-tag">${tag.icon} ${tag.label}</span>`).join('');
      }
    }

    triggerTrackPulse();
  });
});

if (!reducedMotion) {
  // Hero visual initial light sweep
  const heroSweep = document.querySelector('#hero-light-sweep');
  if (heroSweep) {
    setTimeout(() => heroSweep.classList.add('swept'), 350);
  }

  // Trigger track light pulse when light section enters viewport
  if (lightDetails) {
    const lightObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerTrackPulse();
          lightObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    lightObs.observe(lightDetails);
  }
}
const dialog=document.querySelector('#project-dialog');
document.querySelectorAll('.project').forEach(project => project.addEventListener('click', () => { document.querySelector('#dialog-image').src=project.dataset.image; document.querySelector('#dialog-image').alt=project.dataset.title; document.querySelector('#dialog-title').textContent=project.dataset.title; document.querySelector('#dialog-description').textContent=project.dataset.description; dialog.showModal(); }));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{ if(e.target===dialog){ const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close(); } });
document.querySelector('#dialog-cta').addEventListener('click',()=>dialog.close());
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{ const radio=[...document.querySelectorAll('[name=service]')].find(r=>r.value===a.dataset.service); if(radio)radio.checked=true; }));
const form=document.querySelector('#lead-form');
form.addEventListener('input',()=>{document.querySelector('#form-result').hidden=true;});
const phone=form.elements.phone;
phone.addEventListener('input',()=>phone.setCustomValidity(''));
form.addEventListener('submit',e=>{ e.preventDefault(); const digits=phone.value.replace(/\D/g,''); if(digits.length<10||digits.length>15){phone.setCustomValidity('Введите телефон: от 10 до 15 цифр.');phone.reportValidity();return;} const data=new FormData(form); const message=`Здравствуйте! Хочу обсудить проект.\nУслуга: ${data.get('service')}\nМеня зовут: ${String(data.get('name')).trim()}\nТелефон: ${data.get('phone')}`; document.querySelector('#message-preview').textContent=message; document.querySelector('#whatsapp-send').href=`https://wa.me/79385234437?text=${encodeURIComponent(message)}`; document.querySelector('#form-result').hidden=false; document.querySelector('#copy-message').textContent='Скопировать сообщение'; document.querySelector('#whatsapp-send').focus(); });
document.querySelector('#copy-message').addEventListener('click', async e=>{try{await navigator.clipboard.writeText(document.querySelector('#message-preview').textContent);e.target.textContent='Скопировано';}catch{e.target.textContent='Выделите и скопируйте текст выше';}});

// Arrows and the phone symbol are emoji on some iPhones. Replace only these
// decorative text glyphs with the site's own monochrome vector icons.
const iconGlyphs = { '↗': 'arrow', '☎': 'phone' };
const iconTextNodes = [];
const iconWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (iconWalker.nextNode()) {
  const node = iconWalker.currentNode;
  if (/[↗☎]/.test(node.nodeValue) && !node.parentElement.closest('script,style,svg')) iconTextNodes.push(node);
}
iconTextNodes.forEach(node => {
  const fragment = document.createDocumentFragment();
  node.nodeValue.split(/([↗☎])/).forEach(part => {
    if (iconGlyphs[part]) {
      const icon = document.createElement('span');
      icon.className = `site-icon site-icon-${iconGlyphs[part]}`;
      icon.setAttribute('aria-hidden', 'true');
      fragment.append(icon);
    } else if (part) fragment.append(document.createTextNode(part));
  });
  node.replaceWith(fragment);
});

// Soundproofing scenario tabs interactivity
const soundPills = document.querySelectorAll('.sound-pill');
const soundSelectionResult = document.querySelector('.sound-selection-result');
const soundRecommendations = {
  walls: 'Для стен от соседей подойдёт SoundGuard.',
  steps: 'Для потолка от шагов сверху подойдёт Tonlos.',
  bedrooms: 'Для спален и детских подберём систему по типу шума.',
  pipes: 'Для стояков и коммуникаций подойдёт Tonlos.',
  mounts: 'Виброподвесы помогают снизить передачу ударного шума.'
};

soundPills.forEach(pill => {
  pill.addEventListener('click', () => {
    soundPills.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-pressed', 'false');
    });
    pill.classList.add('active');
    pill.setAttribute('aria-pressed', 'true');
    if (soundSelectionResult) {
      soundSelectionResult.textContent = soundRecommendations[pill.dataset.soundTab] || '';
    }
  });
});
