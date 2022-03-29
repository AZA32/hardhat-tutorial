const {BigNumber} = require("hardhat");
const {expect} = require('chai');

describe("tokenizer", function () {

    let singer0;
    let signer1;
    let contract;

    beforeEach(async function () {
        [singer0, signer1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        contract = await Token.deploy("BNB", "BNB");
    })
    describe("Deployment", function () {
        it("deployer balance equals owners balance", async function () {
            const newVarBalance = await contract.balanceOf(singer0.address);
            expect(await contract.totalSupply()).to.equals(newVarBalance);
        });
    })

    describe("transaction", function () {
        it('transfer between two account ', async function () {
            await contract.transfer(signer1.address, 580);
            const singer1Balance = await contract.balanceOf(signer1.address);
            console.log("%s", singer1Balance);
            expect(singer1Balance).to.equals(580);
        });

        it('transaction event', async function () {
            await expect(contract.transfer(signer1.address, 580)).to.emit(contract, 'Transfer').withArgs(singer0.address, signer1.address, 580)
        })
    })

    /*
        describe("BigNumber", function () {
            it('matchers ', function () {
                expect(BigNumber.from(100)).to.be.within(BigNumber.from(99), BigNumber.from(101));
            });
        })
    */

    describe("sendETH", function () {
        it('ETH Balance change ', async function () {
            /*await expect(() => singer0.sendTransaction({
                to: signer1.address,
                value: 50
            })).to.changeEtherBalance(signer1, 10);*/

            await expect(() => singer0.sendTransaction({
                to: signer1.address,
                value: 200
            })).to.changeEtherBalances([singer0, signer1], [-200, 200]);
        });
    })

})