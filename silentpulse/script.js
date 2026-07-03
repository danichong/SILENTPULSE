// script.js — Interacciones mínimas para la landing
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('waitlist-form');
  const form2 = document.getElementById('waitlist-form-2');

  function handleSubmit(e, inputId){
    e.preventDefault();
    const input = document.getElementById(inputId);
    if(!input || !input.value) return;
    const email = input.value.trim();
    const list = JSON.parse(localStorage.getItem('silentpulse_waitlist') || '[]');
    if(!list.includes(email)) list.push(email);
    localStorage.setItem('silentpulse_waitlist', JSON.stringify(list));
    // Feedback minimal
    input.value = '';
    const parent = input.closest('form');
    const msg = document.createElement('div');
    msg.className = 'muted';
    msg.innerText = 'Gracias — te notificaremos cuando lancemos la beta.';
    parent.appendChild(msg);
    setTimeout(()=>{msg.remove()},4000);
  }

  if(form) form.addEventListener('submit', (e)=>handleSubmit(e,'email'));
  if(form2) form2.addEventListener('submit', (e)=>handleSubmit(e,'email2'));

  // Small UX: smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href === '#') return;
      const el = document.querySelector(href);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
    });
  });
});
