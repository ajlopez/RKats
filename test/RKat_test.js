
const RKat = artifacts.require('RKat');

const truffleAssert = require('truffle-assertions');

contract('RKat', function (accounts) {
    let rkats;
    let alice = accounts[0];
    let bob = accounts[1];
    
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
    
    it('initially not paused', async function () {
        const paused = await rkats.paused();
        
        assert.ok(!paused);
    });
    
    it('pause', async function () {
        await rkats.pause();
        
        const paused = await rkats.paused();
        
        assert.ok(paused);
    });
    
    it('only owner can pause', async function () {
        await truffleAssert.reverts(rkats.pause({ from: bob }));
    });
    
    it('cannot pause if already paused', async function () {
        await rkats.pause();
        
        const paused = await rkats.paused();
        
        assert.ok(paused);
        
        truffleAssert.reverts(rkats.pause());
    });
    
    it('unpause', async function () {
        await rkats.pause();
        await rkats.unpause();
        
        const paused = await rkats.paused();
        
        assert.ok(!paused);
    });
    
    it('only owner can unpause', async function () {
        await rkats.pause();
        await truffleAssert.reverts(rkats.unpause({ from: bob }));
    });
    
    it('cannot unpause if not paused', async function () {
        await rkats.pause();
        await rkats.unpause();
        
        const paused = await rkats.paused();
        
        assert.ok(!paused);
        
        truffleAssert.reverts(rkats.unpause());
    });
    
    it('mint rkat', async function () {
        const value = Buffer.from('005f000ca7', 'hex');
        await rkats.mint(value, { from: alice });
        
        const rkat = await rkats.rkats(0);        
        assert.equal(rkat.toString('hex'), '0x005f000ca7');
        
        const totalSupply = await rkats.totalSupply();
        assert.equal(totalSupply, 1);
        
        const balance = await rkats.balanceOf(alice);
        assert.equal(balance, 1);
        
        const owner = await rkats.ownerOf(0);
        assert.equal(owner, alice);
    });
    
    it('cannot mint rkat twice', async function () {
        const value = Buffer.from('005f000ca7', 'hex');
        await rkats.mint(value, { from: alice });
        await truffleAssert.reverts(rkats.mint(value, { from: alice }));
    });
    
    it('cannot mint genesis rkat', async function () {
        const value = Buffer.from('ff5f000ca7', 'hex');
        await truffleAssert.reverts(rkats.mint(value, { from: alice }));
    });
    
    it('initialize', async function () {
        await rkats.initialize(0, 32, { from: bob });
        
        const totalSupply = await rkats.totalSupply();
        assert.equal(totalSupply, 32);
        
        const rkat00 = await rkats.rkats(0);        
        assert.equal(rkat00.toString('hex'), '0xff00000000');
        const rkat1f = await rkats.rkats(31);
        assert.equal(rkat1f.toString('hex'), '0xff1f000000');
        
        const aliceBalance = await rkats.balanceOf(alice);
        assert.equal(aliceBalance, 0);
        const bobBalance = await rkats.balanceOf(bob);
        assert.equal(bobBalance, 32);
        
        const owner00 = await rkats.ownerOf(0);
        assert.equal(owner00,bob);
        const owner1f = await rkats.ownerOf(31);
        assert.equal(owner1f,bob);
        
        const tokenId = await rkats.tokenOfOwnerByIndex(bob, 31);
        assert.equal(tokenId, 31);
        
        const tokenId2 = await rkats.tokenByIndex(31);
        assert.equal(tokenId2, 31);
    });
    
    it('cannot initialize twice', async function () {
        await rkats.initialize(0, 8, { from: bob });
        await truffleAssert.reverts(rkats.initialize(0, 8, { from: bob }));
    });
});

