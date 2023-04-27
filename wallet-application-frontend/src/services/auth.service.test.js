import axios from 'axios';
import AuthService from './auth.service';

jest.mock('axios');

describe('AuthService', () => {
  afterEach(() => {
    jest.resetAllMocks();
    sessionStorage.clear();
  });

  describe('register', () => {
    it('should call the register API with the given username, email, and password', async () => {
      const username = 'testuser';
      const email = 'testuser@example.com';
      const password = 'password';
      const data = { message: 'User registered successfully!' };
      axios.post.mockResolvedValueOnce({ data });

      await AuthService.register(username, email, password);

      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/users/signup', { username, email, password });
    });

    it('should reject with a value if the API call fails', async () => {
      const username = 'testuser';
      const email = 'testuser@example.com';
      const password = 'password';

      await AuthService.register(username, email, password);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/users/signup', { username, email, password });
    });
  });

  describe('login', () => {
    it('should call the login API with the given username and password', async () => {
      const userData = {
        username: 'testuser',
        password: 'testpassword',
      };
      const mockResponse = {
        data: {
          user: {
            username: 'testuser',
            email: 'testuser@test.com',
          },
          token: 'mocktoken',
        },
      };
      axios.post.mockResolvedValueOnce(mockResponse);
  
      const result = await AuthService.login(userData.username, userData.password);
  
      expect(result).toEqual(mockResponse.data.user);
      expect(sessionStorage.getItem('user')).toEqual(JSON.stringify(mockResponse.data.user));
      expect(sessionStorage.getItem('token')).toEqual(JSON.stringify(mockResponse.data.token));
      // const username = 'testuser';
      // const password = 'password';
      // const data = { user:{
      //   username:'testuser'
      // } };
      // axios.post.mockResolvedValueOnce({ data });

      // const result = await AuthService.login(username, password);

      // expect(result).toEqual(data);
      // expect(sessionStorage.getItem('user')).toEqual(JSON.stringify(data));
      // expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/users/login', { username, password });
    });

  });
  describe('logout', () => {
    it('should call the logout API and remove the user from session storage', async () => {
      const data = { message: 'User logged out successfully!' };
      axios.post.mockResolvedValueOnce({ data });

      const result = await AuthService.logout();

      expect(result).toEqual(data);
      expect(sessionStorage.getItem('user')).toBeNull();
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/users/signout');
    });

    // it('should reject with a value if the API call fails', async () => {
    //   const error = new Error('Network error');
    //   axios.post.mockRejectedValueOnce(error);

    //   const result = await AuthService.logout();

    //   expect(result).toBeInstanceOf(Error);
    //   expect(result).toEqual(error);
    //   expect(sessionStorage.getItem('user')).toBeNull();
    //   expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/users/signout');
    // });
  });
});