import app from './app';

import database from './database';

//database.sync({force: true});
console.log('Database connection running.');

app.listen(3001);
console.log('Server running at 3001');