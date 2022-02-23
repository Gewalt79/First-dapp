const displayGreeting = async (greeting, contract) => {
  greeting = await contract.methods.sayHello().call();
  $('h2').html(greeting);
};
const updateGreeting = (greeting, contract, accounts) => {
  let inputValue;
  $('#input').on('change', (e) => {
    inputValue = e.target.value;
  });
  $('#form').on('submit', async (e) => {
    e.preventDefault();
    await contract.methods.updateGreeting(inputValue).send({ from: accounts[0], gas: 400000 });
    displayGreeting(greeting, contract);
  });
};
async function greetingApp() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = await getContract(web3);
  let greeting;
  displayGreeting(greeting, contract);
  updateGreeting(greeting, contract, accounts);
}
greetingApp();
