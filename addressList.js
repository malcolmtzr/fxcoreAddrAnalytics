import fs from "fs";
import { getValidators, getDelegations, countUniqueDelegatorsFromValidators } from "./services/validators.js";
import { findDelegatorsMoreThanOnly, findDelegatorsMoreThanRange, getUniqueDelegatorsFromDelegations } from "./services/delegators.js";

const MAINNET_VALIDATORS = "https://fx-rest.functionx.io/cosmos/staking/v1beta1/validators";
const TESTNET_VALIDATORS = "https://testnet-fx-rest.functionx.io/cosmos/staking/v1beta1/validators";

const generateValidators = async(url) => {
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
    return result_;
}

const generateValidatorsFile = async (url) => {
    const result_ = await generateValidators(url);
    console.log("Total UNIQUE Delegators: " + countUniqueDelegatorsFromValidators(result_));
    //write Validators file
    fs.writeFile("mainnet_fri_validatorsList.json", JSON.stringify(result_, null, '\t'), (error) => {
        if (error) {
            throw error;
        }
        console.log("File saved")
    });
}

//CHANGE FILE NAMES TO APPROPRIATE NAMES
const generateDelegatorFiles = async(validatorFileLoc) => {
    const result = JSON.parse(fs.readFileSync(validatorFileLoc));
    
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

    //WRITE FILES
    fs.writeFile("mainnet_fri_delegatorsMore2000FXOnlyList.json", JSON.stringify(finalMoreThan2000FXOnly, null, '\t'), (error) => {
        if (error) {
            throw error;
        }
        console.log("File saved")
    });

    fs.writeFile("mainnet_fri_delegatorsWithin1000And2000FXList.json", JSON.stringify(finalWithinRange1000And2000FX, null, '\t'), (error) => {
        if (error) {
            throw error;
        }
        console.log("File saved")
    });

    fs.writeFile("mainnet_fri_delegatorsWithin500And1000FXList.json", JSON.stringify(finalWithinRange500And1000FX, null, '\t'), (error) => {
        if (error) {
            throw error;
        }
        console.log("File saved")
    });

    fs.writeFile("mainnet_fri_delegatorsMore1000FXOnlyList.json", JSON.stringify(finalMoreThan1000FXOnly, null, '\t'), (error) => {
        if (error) {
            throw error;
        }
        console.log("File saved")
    });

}

const main = async () => {
    
    //await generateValidatorsFile(MAINNET_VALIDATORS);

    //CHANGE FILE NAME TO APPRORIATE NAME
    generateDelegatorFiles("./mainnet_fri_validatorsList2.json");
    
}

main();