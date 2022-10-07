#fxcoreAddrAnalytics

How to use:
1. After cloning the repository, install the dependencies from package.json
2. In addressList.js -> generateValidatorsFile(), change the name of the file to be written as accordingly
3. In addressList.js -> generateDelegatorFiles(), use and adjust parameters of different methods available from services/delegators.js to get delegators of the desired range(s)
4. Ensure that the names of the files being written are changed to reflect the appropriate data extracted
5. In addressList.js -> main(), change the argument for generating validators to MAINNET_VALIDATORS or TESTNET_VALIDATORS
6. Comment out generateDelegatorsFiles in main and run in root: node addressList.js
6. Comment out generateValidatorsFile in main and run in root: node addressList.js

To print output to console, you'd have to download Code Runner extension, after that, you can simply right click -> Run code to generate a console output.