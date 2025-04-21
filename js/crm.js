// crm.js for simple CRM with Supabase integration
// TODO: Insert your Supabase URL and anon/public key below
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabase = null;

function initSupabase() {
  if (!window.supabase) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js';
    script.onload = () => {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      afterLogin();
    };
    document.head.appendChild(script);
  } else {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    afterLogin();
  }
}

document.getElementById('crmLogin').addEventListener('submit', function(e) {
  e.preventDefault();
  // Simple password check (replace with env var or better in production!)
  if (document.getElementById('crmPass').value === 'drpedrocrm') {
    document.getElementById('crmLogin').style.display = 'none';
    document.getElementById('crmApp').style.display = 'block';
    initSupabase();
  } else {
    alert('Incorrect password.');
  }
});

function afterLogin() {
  loadPatients();
  document.getElementById('addPatientForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = this.name.value;
    const email = this.email.value;
    await supabase.from('patients').insert([{ name, email }]);
    loadPatients();
    this.reset();
  });
  document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    // In production, send emails via backend, not Supabase directly!
    alert('Email sending is a placeholder. Integrate with SendGrid/Mailgun backend.');
    this.reset();
  });
}

async function loadPatients() {
  const { data, error } = await supabase.from('patients').select();
  const list = document.getElementById('patient-list');
  if (error) {
    list.textContent = 'Error loading patients.';
    return;
  }
  list.innerHTML = data.map(p => `<div>${p.name} (${p.email})</div>`).join('');
}
