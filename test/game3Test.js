const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();
    return { game };
  }

  const getSignerAddressSetBalance = async (game, index, value) => {
    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(index);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();
    await game.connect(signer).buy({ value: `${value}` });
    return {address, signer}
  }

  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    console.log('deploy game')
    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    const {address: address1} = await getSignerAddressSetBalance(game, 0, 2)
    const {address: address2} = await getSignerAddressSetBalance(game, 1, 3)
    const {address: address3} = await getSignerAddressSetBalance(game, 2, 1)

    // TODO: win expects three arguments
    await game.win(address1, address2, address3);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
