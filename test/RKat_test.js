
const RKat = artifacts.require('RKat');

contract('RKat', function (accounts) {
    let rkats;
    
    beforeEach(async function () {
        rkats = await RKat.new();
    });
    
    it('name and symbol', async function () {
        const name = await rkats.name();
        const symbol = await rkats.symbol();
        
        assert.equal(name, 'RKat');
        assert.equal(symbol, 'RKAT');
    });
});

