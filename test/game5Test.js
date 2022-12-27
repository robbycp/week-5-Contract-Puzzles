const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    const signer = ethers.provider.getSigner(0);
     
    let wallet = ethers.Wallet.createRandom();
    while (wallet.address.slice(0,4) != '0x00') {
      wallet = ethers.Wallet.createRandom();
    }
    wallet = wallet.connect(ethers.provider);

    signer.sendTransaction( {
      to: wallet.address,
      value: ethers.utils.parseEther('1.0')
    })

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
