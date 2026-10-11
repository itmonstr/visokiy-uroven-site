const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
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
const descriptions = { all:'Три слоя работают вместе: основание, защита от шума и финишный потолок со светом.', sound:'Звукоизоляционный слой помогает снижать передачу шума. Его состав зависит от помещения и источника звука.', light:'Свет интегрирован в потолок: линии и точечные светильники создают разные сценарии освещения.' };
document.querySelectorAll('[data-layer]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-layer]').forEach(b => { b.classList.toggle('active',b===button); b.setAttribute('aria-pressed',String(b===button)); }); document.querySelector('.model-stage').dataset.mode=button.dataset.layer; document.querySelector('.layer-description').textContent=descriptions[button.dataset.layer]; }));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active',b===button); b.setAttribute('aria-pressed',String(b===button)); }); document.querySelectorAll('.project').forEach(p => { p.hidden=button.dataset.filter!=='all'&&p.dataset.category!==button.dataset.filter; }); document.querySelector('.project-grid').classList.toggle('filtered',button.dataset.filter!=='all'); }));
const dialog=document.querySelector('#project-dialog');
document.querySelectorAll('.project').forEach(project => project.addEventListener('click', () => { document.querySelector('#dialog-image').src=project.dataset.image; document.querySelector('#dialog-image').alt=project.dataset.title; document.querySelector('#dialog-title').textContent=project.dataset.title; document.querySelector('#dialog-description').textContent=project.dataset.description; dialog.showModal(); }));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{ if(e.target===dialog){ const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close(); } });
document.querySelector('#dialog-cta').addEventListener('click',()=>dialog.close());
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{ const radio=[...document.querySelectorAll('[name=service]')].find(r=>r.value===a.dataset.service); if(radio)radio.checked=true; }));
const form=document.querySelector('#lead-form');
const mobileCta=document.querySelector('.mobile-cta');
new IntersectionObserver(entries=>{mobileCta.classList.toggle('is-hidden',entries[0].isIntersecting);},{threshold:0,rootMargin:'80px 0px 0px 0px'}).observe(document.querySelector('#contact'));
form.addEventListener('input',()=>{document.querySelector('#form-result').hidden=true;});
const phone=form.elements.phone;
phone.addEventListener('input',()=>phone.setCustomValidity(''));
form.addEventListener('submit',e=>{ e.preventDefault(); const digits=phone.value.replace(/\D/g,''); if(digits.length<10||digits.length>15){phone.setCustomValidity('Введите телефон: от 10 до 15 цифр.');phone.reportValidity();return;} const data=new FormData(form); const message=`Здравствуйте! Хочу обсудить проект.\nУслуга: ${data.get('service')}\nМеня зовут: ${String(data.get('name')).trim()}\nТелефон: ${data.get('phone')}`; document.querySelector('#message-preview').textContent=message; document.querySelector('#whatsapp-send').href=`https://wa.me/79385234437?text=${encodeURIComponent(message)}`; document.querySelector('#form-result').hidden=false; document.querySelector('#copy-message').textContent='Скопировать сообщение'; document.querySelector('#whatsapp-send').focus(); });
document.querySelector('#copy-message').addEventListener('click', async e=>{try{await navigator.clipboard.writeText(document.querySelector('#message-preview').textContent);e.target.textContent='Скопировано';}catch{e.target.textContent='Выделите и скопируйте текст выше';}});
