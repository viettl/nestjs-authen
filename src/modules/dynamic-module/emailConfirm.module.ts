// import { Module } from '@nestjs/common';
// import { EmailConfirmationServce } from './email.service';
// import { ConfigModule } from '@nestjs/config';
// import { EmailModule } from './email.module';
// import { JwtModule } from '@nestjs/jwt';
// // import { EmailConfirmationController } from './emailConfirmation.controller';
// // import { UsersModule } from '../users/users.module';
 
// @Module({
//   imports: [
//     ConfigModule,
//     EmailModule.register({
//       service: 'gmail',
//       user: 'email.account@gmail.com',
//       password: 'mystrongpassword',
//     }),
//     JwtModule.register({}),
//     UsersModule,
//   ],
//   providers: [EmailConfirmationService],
//   exports: [EmailConfirmationService],
//   controllers: [EmailConfirmationController],
// })
// export class EmailConfirmationModule {}