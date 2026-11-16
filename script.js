(() => {
  'use strict';
  const jobs = Array.isArray(window.PAYTM_JOBS) ? window.PAYTM_JOBS : [];
  const events = Array.isArray(window.TECH_EVENTS) ? window.TECH_EVENTS : [];
  const $ = id => document.getElementById(id);
  const esc = val => String(val ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const safeUrl = url => /^https:\/\//i.test(url || '') ? esc(url) : '#';
  const words = q => q.trim().toLocaleLowerCase('en-IN').split(/\s+/).filter(Boolean);
  const matches = (blob, terms) => terms.every(term => blob.toLocaleLowerCase('en-IN').includes(term));
  let selectedCity = 'all';
  let selectedEventKind = 'all';

  function jobCard(job) {
    const direct = job.linkType === 'direct';
    return `<article class="job-card">
      <h3>${esc(job.role)}</h3>
      <div class="job-meta"><span class="location">${esc(job.location)}</span><span class="team">${esc(job.team)}</span></div>
      <p class="role-blurb">${esc(job.note)}</p>
      <div class="role-facts"><span class="fact">${esc(job.experience)}</span><span class="fact">${esc(job.workType)}</span></div>
      <div class="job-actions"><span class="source-note">${direct ? 'Official individual job' : 'Official city careers list'}</span><a class="job-link" href="${safeUrl(job.url)}" target="_blank" rel="noopener noreferrer" aria-label="${direct ? 'View job:' : 'Find role on Paytm careers:'} ${esc(job.role)}">${direct ? 'View job ↗' : 'Find on careers ↗'}</a></div>
    </article>`;
  }

  function eventCard(event) {
    const warning = event.dateWarning === true;
    return `<article class="event-card">
      <div class="event-topline"><div class="event-date${warning ? ' warning' : ''}"><span>${esc(event.dateLabel)}</span><small>${esc(event.year)}</small></div>
      <div class="event-title-wrap"><span class="event-category ${esc(event.kind)}">${event.kind === 'hackathon' ? 'Hackathon / challenge' : 'Tech event'}</span><h3>${esc(event.title)}</h3><p class="event-host">${esc(event.host)}</p></div></div>
      <p class="event-time">${esc(event.when)}</p>
      <p class="event-desc">${esc(event.detail)}</p>
      <div class="event-tags"><span class="event-tag">${esc(event.type)}</span><span class="event-tag">${esc(event.location)}</span></div>
      ${warning ? `<p class="event-warning">${esc(event.extra)}</p>` : `<p class="team">${esc(event.extra)}</p>`}
      <div class="event-actions"><span class="source-note">Official event page</span><a class="event-link" href="${safeUrl(event.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(event.button)}: ${esc(event.title)}">${esc(event.button)} ↗</a></div>
    </article>`;
  }

  function renderJobs() {
    const terms = words($('job-search').value);
    const filtered = jobs.filter(job => (selectedCity === 'all' || job.cities.includes(selectedCity)) && matches([job.role, job.team, job.location, job.experience, job.note, job.workType].join(' '), terms));
    $('job-list').innerHTML = filtered.map(jobCard).join('');
    $('job-empty').hidden = filtered.length > 0;
    $('job-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'role' : 'roles'} found · Curated 16 Nov 2026`;
  }
  function renderEvents() {
    const terms = words($('event-search').value);
    const filtered = events.filter(event => (selectedEventKind === 'all' || event.kind === selectedEventKind) && matches([event.title, event.host, event.type, event.location, event.detail].join(' '), terms));
    filtered.sort((a,b) => a.sortDate.localeCompare(b.sortDate));
    $('event-list').innerHTML = filtered.map(eventCard).join('');
    $('event-empty').hidden = filtered.length > 0;
    $('event-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'event' : 'events'} found`;
  }

  $('count-all').textContent = jobs.length;
  $('count-chennai').textContent = jobs.filter(job => job.cities.includes('chennai')).length;
  $('count-bangalore').textContent = jobs.filter(job => job.cities.includes('bangalore')).length;
  document.querySelectorAll('[data-job-city]').forEach(button => button.addEventListener('click', () => {
    selectedCity = button.dataset.jobCity;
    document.querySelectorAll('[data-job-city]').forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    renderJobs();
  }));
  document.querySelectorAll('[data-event-kind]').forEach(button => button.addEventListener('click', () => {
    selectedEventKind = button.dataset.eventKind;
    document.querySelectorAll('[data-event-kind]').forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    renderEvents();
  }));
  $('job-search').addEventListener('input', renderJobs);
  $('event-search').addEventListener('input', renderEvents);
  renderJobs(); renderEvents();
})();
