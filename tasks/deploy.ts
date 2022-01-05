import { task } from 'hardhat/config'

task('deploy', 'Deploy NameRegister')
  .addFlag('verify', 'verify contracts on etherscan')
  .setAction(async (args, { ethers, run, network }) => {
    try {
      console.log('Deploying NameRegister...')

      await run('compile')
      
      const signer = (await ethers.getSigners())[0]
      console.log('Signer:', signer.address)

      const nameRegister = await (await ethers.getContractFactory('NameRegister', signer)).deploy()

      console.log('----------------------')
      console.log('SUCCESSFULLY DEPLOYED AT:')
      console.log({ nameRegister: nameRegister.address })
      console.log('----------------------')

      // verify source
      if (args.verify) {
        console.log('Verifying source on etherscan')

        await nameRegister.deployTransaction.wait(5)

        await run('verify:verify', {
          address: nameRegister.address,
        })
      }
    } catch (e) {
      console.log('----------------------')
      console.log('FAILED TO DEPLOY')
      console.error(e)
      console.log('----------------------')
    }
  })
