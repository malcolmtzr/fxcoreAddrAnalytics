import fs from "fs";
import { getValidators, getDelegations, countUniqueDelegatorsFromValidators } from "./services/validators.js";
import { compareCommonDelegatorAddr, findDelegatorsMoreThanOnly, findDelegatorsMoreThanRange, getUniqueDelegatorsFromDelegations } from "./services/delegators.js";

const MAINNET_VALIDATORS = "https://fx-rest.functionx.io/cosmos/staking/v1beta1/validators";
const TESTNET_VALIDATORS = "https://testnet-fx-rest.functionx.io/cosmos/staking/v1beta1/validators";

const generateValidators = async (url) => {
    const validatorsList = await getValidators(url);
    let resList = [];
    for (const val of validatorsList) {
        const res = await getDelegations(url, val);
        let valObj = {
            validator: val,
            delegations: res.delegation_responses
        }
        resList.push(valObj);
    }
    let result_ = {
        validators: resList
    }
    console.log("Total UNIQUE Delegators: " + countUniqueDelegatorsFromValidators(result_));
    return result_;
}

const generateValidatorsFile = async (url) => {
    const result_ = await generateValidators(url);
    console.log("Total UNIQUE Delegators: " + countUniqueDelegatorsFromValidators(result_));
    //write Validators file
    fs.writeFile("mainnet_mon_validatorsList.json", JSON.stringify(result_, null, '\t'), (error) => {
        if (error) {
            throw error;
        }
        console.log("File saved")
    });
}

const generateDelegators = (result_, validatorFileLoc) => {
    let result;

    if (result_ === null) {
        result = JSON.parse(fs.readFileSync(validatorFileLoc));

    } else if (validatorFileLoc === null) {
        result = result_;

    } else if (typeof(result_) === "undefined" && typeof(validatorFileLoc) === "undefined") {
        return;
    }

    const delegatorsMoreThan2000FXOnly = findDelegatorsMoreThanOnly(result, 2000000000000000000000)
    const uniqueMoreThan2000FXOnly = getUniqueDelegatorsFromDelegations(delegatorsMoreThan2000FXOnly);
    const finalMoreThan2000FXOnly = {
        total_unique_delegators: uniqueMoreThan2000FXOnly.length,
        delegators: uniqueMoreThan2000FXOnly
    }
    console.log("Total Unique >= 2000 FX: " + uniqueMoreThan2000FXOnly.length);

    const delegatorsWithinRange1000And2000FX = findDelegatorsMoreThanRange(result, 1000000000000000000000, 2000000000000000000000);
    const uniqueWithinRange1000And2000FX = getUniqueDelegatorsFromDelegations(delegatorsWithinRange1000And2000FX);
    const finalWithinRange1000And2000FX = {
        total_unique_delegators: uniqueWithinRange1000And2000FX.length,
        delegators: uniqueWithinRange1000And2000FX
    }
    console.log("Total Unique >= 1000 && < 2000 FX: " + uniqueWithinRange1000And2000FX.length);

    const delegatorsWithinRange500And1000FX = findDelegatorsMoreThanRange(result, 500000000000000000000, 1000000000000000000000);
    const uniqueWithinRange500And1000FX = getUniqueDelegatorsFromDelegations(delegatorsWithinRange500And1000FX);
    const finalWithinRange500And1000FX = {
        total_unique_delegators: uniqueWithinRange500And1000FX.length,
        delegators: uniqueWithinRange500And1000FX
    }
    console.log("Total Unique >= 500 && < 1000 FX: " + uniqueWithinRange500And1000FX.length);

    const delegatorsMoreThan1000FXOnly = findDelegatorsMoreThanOnly(result, 1000000000000000000000)
    const uniqueMoreThan1000FXOnly = getUniqueDelegatorsFromDelegations(delegatorsMoreThan1000FXOnly);
    const finalMoreThan1000FXOnly = {
        total_unique_delegators: uniqueMoreThan1000FXOnly.length,
        delegators: uniqueMoreThan1000FXOnly
    }
    console.log("Total Unique >= 1000 FX: " + uniqueMoreThan1000FXOnly.length);

    //To view this output, you must have Code Runner installed
    console.log("Delegated in more than 3 pools: " + compareCommonDelegatorAddr(3, uniqueMoreThan1000FXOnly, uniqueMoreThan2000FXOnly, uniqueWithinRange1000And2000FX).length);
    
    return { finalMoreThan2000FXOnly, finalWithinRange1000And2000FX, finalWithinRange500And1000FX, finalMoreThan1000FXOnly }
}

//Adjust parameters and function body accordingly
//CHANGE FILE NAMES TO APPROPRIATE NAMES.
const generateDelegatorFiles = (finalMoreThan2000FXOnly, finalWithinRange1000And2000FX, finalWithinRange500And1000FX, finalMoreThan1000FXOnly) => {
        fs.writeFile("mainnet_mon_delegatorsMore2000FXOnlyList.json", JSON.stringify(finalMoreThan2000FXOnly, null, '\t'), (error) => {
            if (error) {
                throw error;
            }
            console.log("File saved")
        });
    
        fs.writeFile("mainnet_mon_delegatorsWithin1000And2000FXList.json", JSON.stringify(finalWithinRange1000And2000FX, null, '\t'), (error) => {
            if (error) {
                throw error;
            }
            console.log("File saved")
        });
    
        fs.writeFile("mainnet_mon_delegatorsWithin500And1000FXList.json", JSON.stringify(finalWithinRange500And1000FX, null, '\t'), (error) => {
            if (error) {
                throw error;
            }
            console.log("File saved")
        });
    
        fs.writeFile("mainnet_mon_delegatorsMore1000FXOnlyList.json", JSON.stringify(finalMoreThan1000FXOnly, null, '\t'), (error) => {
            if (error) {
                throw error;
            }
            console.log("File saved")
        });
}

const main = async () => {

    //ADJUST VARIABLES ACCORDINGLY
    //DOUBLE CHECK PARAMETERS AND VARIABLES IN ABOVE FUNCTIONS

    //To generate Validators' file, comment out section B,
    //run only Section A step 1 (comment out step 2), then once the Validators file is written, run only step 2.
    //Otherwise, to generate only Delegator files, comment out Section A, and run only Section B.
    
    //--------------------Section A--------------------
    //Step 1.
    //await generateValidatorsFile(MAINNET_VALIDATORS);
    //Step 2.
    //CHANGE FILE NAME TO APPRORIATE NAME
    //const { finalMoreThan2000FXOnly, finalWithinRange1000And2000FX, finalWithinRange500And1000FX, finalMoreThan1000FXOnly } = generateDelegators(null, "./mainnet_mon_validatorsList.json");
    //generateDelegatorFiles(finalMoreThan2000FXOnly, finalWithinRange1000And2000FX, finalWithinRange500And1000FX, finalMoreThan1000FXOnly)
    //-------------------------------------------------

    //--------------------Section B--------------------
    const validators = await generateValidators(MAINNET_VALIDATORS);
    let { finalMoreThan2000FXOnly, finalWithinRange1000And2000FX, finalWithinRange500And1000FX, finalMoreThan1000FXOnly } = generateDelegators(validators, null);
    generateDelegatorFiles(finalMoreThan2000FXOnly, finalWithinRange1000And2000FX, finalWithinRange500And1000FX, finalMoreThan1000FXOnly)
    //-------------------------------------------------
}

main();