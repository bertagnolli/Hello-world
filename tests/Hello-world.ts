import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import { Counter } from "../target/types/counter";

describe("Counter", () => {
  const provider = anchor.AnchorProvider.env();
 
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace.Counter as Program<Counter>;

  it("Is initialized!", async () => {
    // Add your test here.
   
    const kp = anchor.web3.Keypair.generate()
    const tx = await program.methods.initialize(new anchor.BN(100)).accounts({
      counter: kp.publicKey,
      authority: provider.wallet.publicKey
    }).signers([kp]).rpc();
 
    console.log("Your transaction signature", tx);

    const accountInfo = (await program.account.counter.fetch(kp.publicKey))
    expect(accountInfo.count.toNumber()).to.eq(10)
  });

  it("Is incremented!", async () => {

    const kp = anchor.web3.Keypair.generate()

      const tx = await program.methods.initialize(new anchor.BN(10)).accounts({
        counter: kp.publicKey,
        authority: provider.wallet.publicKey
      }).signers([kp]).rpc();
   
    // Add your test here.
    const tx2 = await program.methods.increment().accounts({
      counter: kp.publicKey,
      authority: provider.wallet.publicKey

    }).rpc();
    console.log("Your transaction signature", tx2);
  });

});
