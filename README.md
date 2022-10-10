#fxcoreAddrAnalytics

How to use:
1. After cloning the repository, install the dependencies from package.json

In addressList.js:
2. In generateValidatorsFile, change the name of the file as accordingly
3. In generateDelegators, use and adjust the methods available from services/delegator,js to get delegations of the desired range(s). Adjust return variables as accordingly.
4. In generateDelegatorFiles, adjust the parameters and function body as according to how many files to be generated, and change file names to required names. Do note the variables you are passing into this method.
5. Always ensure that the names of the files being written are changed to reflect the appropriate data extracted
6. In main, follow the steps to run either Section A or section B, according to the files needed.

Note:
- To check for addresses that delegated in more than one FX range, you can use delegators.js -> compareCommonDelegatorAddr

- To print output to console on vscode, you'd have to download Code Runner extension, after that, you can simply right click -> Run code, to examine the output.