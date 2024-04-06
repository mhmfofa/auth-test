import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginResponseModel } from './models/auth-user.model';
import { environment } from 'environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to login and return an access token', () => {
    const loginData = {
      email: 'test@test.com',
      password: '123456'
    };

    const mockResponse: LoginResponseModel = {
      username: 'test@test.com',
      email: 'test@test.com',
      token: 'test-token',
      expiresIn: 3600,
      isLogged: true
    };
    service.login(loginData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.urls.baseUrl + environment.urls.endPoints.login);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

});
