const render = require('./lib/render');
const { exec } = require('child_process');

module.exports = async function (context, args) {
    const id = args[0];
    
    const token = await context.command('call').execute([ 'root', 'rkat', 'rkats(uint256)', id, 'bytes5' ]);
    console.log(token);
    
    render(token, 8);
    
    exec(token + '.png', (err, data) => {});
}

