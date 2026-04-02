fetch('http://localhost:5000/api/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Harshit Mohanta', email: 'harshit.mohanta.s.131@kalv', password: 'password123' })
}).then(r => r.json()).then(console.log).catch(console.error);
