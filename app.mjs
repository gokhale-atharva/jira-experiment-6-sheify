import { createRequest, closeRequest, filterRequests } from './support.mjs';
const storeKey = 'sheify-demo-requests-v1';
const feedback = document.querySelector('#feedback');
let requests = [];
try { const saved = JSON.parse(localStorage.getItem(storeKey) || '[]'); requests = Array.isArray(saved) ? saved.filter(r => r && typeof r.id === 'string' && typeof r.name === 'string' && typeof r.message === 'string' && ['Open','Closed'].includes(r.status)) : []; }
catch { feedback.textContent = 'Saved requests could not be loaded. You can start a new list.'; }
function persist(next) { try { localStorage.setItem(storeKey, JSON.stringify(next)); requests = next; return true; } catch { feedback.textContent = 'Storage is unavailable. The change was not saved.'; return false; } }
function render() {
 const list = document.querySelector('#request-list'); list.replaceChildren();
 const shown = filterRequests(requests, document.querySelector('#status-filter').value);
 if (!shown.length) { const empty = document.createElement('p'); empty.textContent = 'No requests to show.'; list.append(empty); }
 for (const request of shown) {
  const card = document.createElement('article'); card.className = 'request';
  const title = document.createElement('h3'); title.textContent = request.name;
  const status = document.createElement('span'); status.className = 'status'; status.textContent = request.status;
  const message = document.createElement('p'); message.textContent = request.message;
  card.append(title, status, message);
  if (request.status === 'Open') { const button = document.createElement('button'); button.textContent = 'Close request'; button.addEventListener('click', () => { if (persist(requests.map(r => r.id === request.id ? closeRequest(r) : r))) render(); }); card.append(button); }
  list.append(card);
 }
}
document.querySelector('#request-form').addEventListener('submit', event => {
 event.preventDefault();
 try { const request = { ...createRequest(document.querySelector('#customer').value, document.querySelector('#message').value), id: crypto.randomUUID() }; if (persist([...requests, request])) { event.target.reset(); feedback.textContent = 'Request saved in this browser.'; render(); } }
 catch (error) { feedback.textContent = error.message; }
});
document.querySelector('#status-filter').addEventListener('change', render);
render();
