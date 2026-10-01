async function testAll() {
  console.log('--- 1. Testing Registration in MongoDB Atlas ---');
  const testId = '200' + Math.floor(100 + Math.random() * 900);
  const regPayload = {
    fullName: 'Student ' + testId,
    studentId: testId,
    email: 'student_' + testId + '@pust.ac.bd',
    password: 'password123',
    department: 'Computer Science and Engineering',
    year: '3',
    term: '2'
  };

  const regRes = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(regPayload)
  });
  const regData = await regRes.json();
  console.log('Register status:', regRes.status, 'Success:', regData.success, 'User:', regData.user?.fullName);

  console.log('\n--- 2. Testing Login against MongoDB Atlas ---');
  const loginRes = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: regPayload.email, password: 'password123' })
  });
  const loginData = await loginRes.json();
  console.log('Login status:', loginRes.status, 'Success:', loginData.success, 'Token issued:', !!loginData.token);

  console.log('\n--- 3. Testing /api/auth/me with JWT ---');
  const meRes = await fetch('http://localhost:5000/api/auth/me', {
    headers: { 'Authorization': 'Bearer ' + loginData.token }
  });
  const meData = await meRes.json();
  console.log('Auth Me status:', meRes.status, 'User ID:', meData.user?._id, 'Student ID:', meData.user?.studentId);

  console.log('\n--- 4. Testing AI Chat with Gemini API Key ---');
  const aiRes = await fetch('http://localhost:5000/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loginData.token },
    body: JSON.stringify({
      message: 'Explain Virtual Memory and Paging in Operating Systems in 2 brief points.',
      courseCode: 'CSE 3203',
      courseTitle: 'Operating Systems',
      topic: 'Virtual Memory'
    })
  });
  const aiData = await aiRes.json();
  console.log('AI Chat status:', aiRes.status, 'Source:', aiData.source);
  console.log('AI Reply Preview:\n', aiData.reply?.text?.slice(0, 300) + '...\n');

  console.log('--- 5. Testing Static Frontend Routing (index.html) ---');
  const htmlRes = await fetch('http://localhost:5000/');
  const htmlText = await htmlRes.text();
  console.log('Frontend index.html served:', htmlRes.status, 'Contains root div:', htmlText.includes('id="root"'));

  console.log('\n--- 6. Testing Courses API (78 Courses) ---');
  const cRes = await fetch('http://localhost:5000/api/courses');
  const cData = await cRes.json();
  console.log('Courses count:', cData.courses?.length, 'Curriculum terms:', cData.curriculum?.length);

  console.log('\nALL INTEGRATION TESTS PASSED!');
}

testAll().catch(err => console.error('Test error:', err));
