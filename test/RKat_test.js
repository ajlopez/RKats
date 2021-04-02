
const RKat = artifacts.require('RKat');

contract('RKat', function (accounts) {
    let rkats;
    let alice = accounts[0];
    
    beforeEach(async function () {
        rkats = await RKat.new();
    });
    
    it('name and symbol', async function () {
        const name = await rkats.name();
        const symbol = await rkats.symbol();
        
        assert.equal(name, 'RKat');
        assert.equal(symbol, 'RKAT');
    });
    
    it('initial total supply', async function () {
        const totalSupply = await rkats.totalSupply();
        
        assert.equal(totalSupply, 0);
    });
    
    it('mint rkat', async function () {
        const value = Buffer.from('ff5f000ca7', 'hex');
        await rkats.mint(value, { from: alice });
        
        const rkat = await rkats.rkats(0);        
        assert.equal(rkat.toString('hex'), '0xff5f000ca7');
        
        const totalSupply = await rkats.totalSupply();
        assert.equal(totalSupply, 1);
        
        const balance = await rkats.balanceOf(alice);
        assert.equal(balance, 1);
        
        const owner = await rkats.ownerOf(0);
        assert.equal(owner, alice);
    });
});

