//Logics for Validators

import axios from "axios";

export const getValidators = async(url) => {
    let res = await axios.get(url);
    let validatorsList = [];
    res.data.validators.forEach(v => {
        validatorsList.push(v.operator_address)
    });
    return validatorsList;
}

export const getDelegations = async(url, val_addr_) => {
    let res = await axios.get(`${url}/${val_addr_}/delegations`)
    return res.data;
}

export const countTotalDelegations = (obj) => {
    let delegationCount = 0;
    obj.validators.forEach(i => {
        let numDelegations = i.delegations.length;
        delegationCount += numDelegations;
    })
    return delegationCount;
}

export const countUniqueDelegatorsFromValidators = (obj) => {
    let delegators = [];
    obj.validators.forEach(i => {
        i.delegations.forEach(j => {
            delegators.push(j.delegation.delegator_address)
        })
    })
    console.log(delegators);
    const uniqueDelegators = new Set(delegators).size;
    return uniqueDelegators
}