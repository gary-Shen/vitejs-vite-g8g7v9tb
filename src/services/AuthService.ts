class AuthService {
  public state: { theme: 'light' | 'dark'; user: any } = {
    theme: 'light',
    user: null,
  };

  private subscribers: any[] = [];

  constructor() {
    console.log('AuthService Initialized (Singleton)');
  }

  public subscribe(callback: (state: any) => void) {
    this.subscribers.push(callback);
    
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
      console.log(`Unsubscribed. Total: ${this.subscribers.length}`);
    };
  }

  private notify() {
    this.subscribers.forEach(callback => callback(this.state));
  }

  public setTheme(theme: 'light' | 'dark') {
    this.state.theme = theme;
    this.notify();
  }

  public login(user: any) {
    this.state.user = user;
    this.notify();
  }
}

export default new AuthService();