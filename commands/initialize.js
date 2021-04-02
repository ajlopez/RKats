module.exports = async function (context, args) {
    for (let k = 0; k < 256; k += 8) {
        console.log('initialize genesis rkats from',k,'to',k+7);
        await context.command('invoke').execute([ 'root', 'rkat', 'initialize(uint256,uint256)', k + ',8' ]);
    }
}

