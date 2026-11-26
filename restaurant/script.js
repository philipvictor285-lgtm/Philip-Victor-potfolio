const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-menu');
toggle?.addEventListener('click',()=>{
  const open=toggle.getAttribute('aria-expanded')!=='true';
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
  nav.classList.toggle('open',open);
  document.body.classList.toggle('menu-open',open);
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded','false');
  toggle?.setAttribute('aria-label','Open navigation menu');
  document.body.classList.remove('menu-open');
}));

const tabs=[...document.querySelectorAll('.menu-tab')];
const panels=[...document.querySelectorAll('.menu-panel')];
function activateTab(tab){
  tabs.forEach(item=>{
    const active=item===tab;
    item.classList.toggle('active',active);
    item.setAttribute('aria-selected',String(active));
    item.tabIndex=active?0:-1;
  });
  panels.forEach(panel=>{panel.hidden=panel.id!==tab.getAttribute('aria-controls');});
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateTab(tab));
  tab.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    let next=index;
    if(event.key==='ArrowRight')next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    tabs[next].focus();activateTab(tabs[next]);
  });
});

const form=document.querySelector('#reservation-form');
const dateField=document.querySelector('#guest-date');
if(dateField){
  const today=new Date();
  dateField.min=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
}
form?.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(form);
  const subject=encodeURIComponent(`Table request — ${data.get('name')}`);
  const body=encodeURIComponent(`Hello Field & Fire,\n\nI'd like to request a table.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nDate: ${data.get('date')}\nGuests: ${data.get('guests')}\n\nPlease confirm availability.\n\n(Portfolio concept demo — this request is not sent until you send the email.)`);
  document.querySelector('#form-status').textContent='Your email app will open with a draft. The request is not sent until you press Send.';
  window.location.href=`mailto:philipvictor285@gmail.com?subject=${subject}&body=${body}`;
});
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
