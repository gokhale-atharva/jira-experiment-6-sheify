export function createRequest(name, message) {
  if (typeof name !== 'string' || name.trim().length < 2) throw new Error('Enter a name with at least two characters.');
  if (typeof message !== 'string' || message.trim().length < 10) throw new Error('Describe the request in at least ten characters.');
  if (name.trim().length > 80 || message.trim().length > 1000) throw new Error('Keep the name under 81 and the request under 1001 characters.');
  return { name: name.trim(), message: message.trim(), status: 'Open' };
}
export function closeRequest(request) {
  if (!request || !['Open', 'Closed'].includes(request.status)) throw new Error('Invalid request');
  return { ...request, status: 'Closed' };
}
export function filterRequests(requests, status = 'All') {
  if (!['All', 'Open', 'Closed'].includes(status)) throw new Error('Invalid status');
  return requests.filter(r => status === 'All' || r.status === status);
}
