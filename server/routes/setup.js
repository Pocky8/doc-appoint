import { v4 as uuidv4 } from 'uuid';
const jwtSecret = uuidv4();

console.log(jwtSecret); // Output the generated JWT secret for use
