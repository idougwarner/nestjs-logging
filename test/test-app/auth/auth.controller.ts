import { Controller, Post } from '@nestjs/common';

/**
 * Controller: /auth
 */
@Controller('auth')
export class AuthController {
  /**
   * Post login ok
   */
  @Post('login')
  public login(): string {
    return 'This action returns auth object';
  }
}
