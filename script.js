async function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
  
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
  
    const response = await fetch('/server.php?action=signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const result = await response.json();
    alert(result.message);
  }
  
  async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    if (!username || !password) {
      alert('For love of god, Please enter both username and password.');
      return;
    }

  
    const constantValue = 'exampleConstantValue';
    console.log('Constant Value:', constantValue);
    console.log('Username:', username);
    console.log('Password:', password); 

    const response = await fetch('/server.php?action=login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, constantValue }),
    });
    
   
  
    const result = await response.json();
    alert(result.message);
  }