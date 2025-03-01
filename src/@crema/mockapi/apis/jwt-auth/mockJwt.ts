// // This file should be used to mock the API during development
// // Place it in your project somewhere it can be imported

// import { createServer, Model, Response, Server } from 'miragejs';
// import { AnyFactories, AnyModels } from 'miragejs/-types';
// import Schema from 'miragejs/orm/schema';
// import jwt from 'jsonwebtoken'; // You might need to install this package

// // Define the User model type
// interface User {
//   id: string;
//   firstname: string;
//   lastname: string;
//   username: string;
//   email: string;
//   phone: string;
//   password: string;
//   role: string;
//   avatar?: string;
//   _id?: string;
//   createdAt?: string;
// }

// // Define your models
// type AppModels = {
//   user: typeof Model;
// }

// // Secret key for JWT (only for development)
// const JWT_SECRET = 'your-secret-key-for-development';

// export function setupMockServer() {
//   return createServer({
//     models: {
//       user: Model.extend<Partial<User>>({}),
//     },

//     seeds(server) {
//       // Seed with some initial users if needed
//       server.create('user', {
//         id: '1',
//         firstname: 'Admin',
//         lastname: 'User',
//         username: 'admin123',
//         email: 'admin@paragoniu.edu.kh',
//         phone: '0123456789',
//         password: 'Admin123', // In real app, this would be hashed
//         role: 'admin',
//         avatar: '/assets/images/avatar/A1.jpg',
//       });
//     },

//     routes() {
//       this.namespace = 'api';
      
//       // User registration endpoint
//       this.post('/users', (schema, request) => {
//         const attrs = JSON.parse(request.requestBody);
        
//         // Check if email already exists
//         const existingUser = schema.all('user').models.find(user => (user as unknown as User).email === attrs.email);
//         if (existingUser) {
//           return new Response(
//             422,
//             { 'Content-Type': 'application/json' },
//             { errors: { email: ['Email already exists'] } }
//           );
//         }

//         // Check if username already exists
//         const existingUsername = schema.all('user').models.find(user => (user as unknown as User).username === attrs.username);
//         if (existingUsername) {
//           return new Response(
//             422,
//             { 'Content-Type': 'application/json' },
//             { errors: { username: ['Username already exists'] } }
//           );
//         }

//         // Create new user - in a real app, you would hash the password
//         const user = schema.db.users.insert({
//           ...attrs,
//           _id: Math.floor(Math.random() * 10000).toString(),
//           role: attrs.role || 'student', // Default to student if no role provided
//           createdAt: new Date().toISOString(),
//         });

//         // Generate JWT token
//         const token = jwt.sign(
//           { 
//             id: user._id,
//             email: user.email,
//             role: user.role,
//           },
//           JWT_SECRET,
//           { expiresIn: '7d' }
//         );

//         console.log('User registered:', user);
        
//         return {
//           user: {
//             _id: user._id,
//             email: user.email,
//             name: `${user.firstname} ${user.lastname}`,
//             role: user.role,
//           },
//           token,
//         };
//       });

//       // Authentication endpoint
//       this.post('/auth', (schema, request) => {
//         const { email, password } = JSON.parse(request.requestBody);
//         const user = schema.all('user').models.find(user => (user as unknown as User).email === email) as unknown as User;

//         if (!user || user.password !== password) { // In real app, you'd compare hashed passwords
//           return new Response(
//             401,
//             { 'Content-Type': 'application/json' },
//             { message: 'Invalid email or password' }
//           );
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//           { 
//             id: user._id,
//             email: user.email,
//             role: user.role,
//           },
//           JWT_SECRET,
//           { expiresIn: '7d' }
//         );

//         return {
//           token,
//         };
//       });

//       // Get authenticated user
//       this.get('/auth', (schema, request) => {
//         const authHeader = request.requestHeaders.Authorization || '';
//         const token = authHeader.replace('Bearer ', '');
        
//         try {
//           const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
//           const user = schema.db.users.find(user => user._id === decoded.id);
          
//           if (!user) {
//             return new Response(401, {}, { message: 'User not found' });
//           }
          
//           return {
//             _id: user._id,
//             firstname: user.firstname,
//             lastname: user.lastname,
//             username: user.username,
//             email: user.email,
//             phone: user.phone,
//             role: user.role,
//             avatar: user.avatar || null,
//           };
//         } catch (error) {
//           return new Response(401, {}, { message: 'Token is not valid' });
//         }
//       });

//       // Let other API calls pass through to your backend
//       this.passthrough();
//     },
//   });
// }