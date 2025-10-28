import { useState, useEffect } from 'react';
import AuthService from './services/AuthService';
import { useUserSearch } from './hooks/useUserSearch';
import { User } from './types';

const Header = () => {
  const [user, setUser] = useState(AuthService.state.user);
  useEffect(() => {
    const handleAuthChange = (newState: any) => setUser(newState.user);
    const unsubscribe = AuthService.subscribe(handleAuthChange);
  }, []); 

  return <h1>Welcome, {user ? user.name : 'Guest'}</h1>;
};

const ModernWidget = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log(`setTimeout firing with stale count: ${count}`);
      setCount(count + 1);
    }, 2000);

    return () => clearTimeout(timerId);
  }, []);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Modern Widget Count: {count}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};


function App() {
  const [query, setQuery] = useState('');
  
  const { users } = useUserSearch(query);
  
  const [theme, setTheme] = useState(AuthService.state.theme);
  useEffect(() => {
    const handleAuthChange = (newState: any) => setTheme(newState.theme);
    const unsubscribe = AuthService.subscribe(handleAuthChange);
  }, []);

  const handleUserClick = (user: User) => {
    console.log('Clicked', user);
    AuthService.login(user);
  };
  
  const appStyle = {
    backgroundColor: theme === 'light' ? '#FFF' : '#333',
    color: theme === 'light' ? '#333' : '#FFF',
  };
  
  return (
    <div style={appStyle}>
      <Header />
      <button onClick={() => AuthService.setTheme('dark')}>Set Dark</button>
      
      <ModernWidget />
      
      <hr />
      
      <input onChange={(e: any) => setQuery(e.target.value)} placeholder="Search..." />
      
      <h3>Active Users: {users.filter((u: User) => u.name.length > 3).length}</h3>
      
      <ul>
        {users.map((user: User, index: number) => (
          <li 
            key={index} 
            onClick={() => handleUserClick(user)}
          >
            {user.name} (Processed: {user.processedAt?.toString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;