//Logics for Delegators

import axios from "axios";

export const findDelegatorsMoreThanRange = (obj, lower, upper) => {
    //>= lower FX && < upper FX
    let delegators = {
        delegations: []
    };
    obj.validators.forEach(i => {
        i.delegations.forEach(j => {
            if (Number(j.balance.amount) >= lower && Number(j.balance.amount) < upper) {
                delegators.delegations.push(j);
            }
        })
    })
    delegators = delegators.delegations.map(del => (
        {
            delegator_address: del.delegation.delegator_address,
            amount: del.balance.amount,
            denom: del.balance.denom,
            validator_address: del.delegation.validator_address
        }
    ))
    return delegators;
}

export const findDelegatorsMoreThanOnly = (obj, lower) => {
    //>= lower FX only
    let delegators = {
        delegations: []
    };
    obj.validators.forEach(i => {
        i.delegations.forEach(j => {
            if (Number(j.balance.amount) >= lower) {
                delegators.delegations.push(j);
            }
        })
    })
    delegators = delegators.delegations.map(del => (
        {
            delegator_address: del.delegation.delegator_address,
            amount: del.balance.amount,
            denom: del.balance.denom,
            validator_address: del.delegation.validator_address
        }
    ))
    return delegators;
}

export const getUniqueDelegatorsFromDelegations = (obj) => {
    let delegators = [];
    obj.forEach(i => {
        delegators.push(i.delegator_address);
    })
    const uniqueDelegators = new Set(delegators);
    return Array.from(uniqueDelegators);
}

export const compareCommonDelegatorAddr = (min, ...arrs) =>
//get array of unique addrs, and filter.
//For each unique addr, check if present in each of array
//true = +1
//if more than specified min (minimum arrays an element has to be appearing),
//filer them into the returned array.
[...new Set(arrs.flat())].filter(e =>
    arrs.reduce((acc, cur) =>
        acc + cur.includes(e), 0) >= min);
