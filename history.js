import { DateTime } from "luxon";
import { path } from "ramda";

const dateHelper = (date) => DateTime.fromFormat(date, "yyyy-MM-dd");

export const valueAt = (history, date) => {
  let returnValue = history.defaultValue;
  if (history.steps.length) {
    const targetDate = dateHelper(date);
    history.steps.forEach(step => {
      const stepDate = dateHelper(step.date);
      if ((stepDate.equals(targetDate)) || (stepDate < targetDate)) {
        returnValue = step.value;
      }
    });
  }
  return returnValue;
}

const stepsArrayHelper = (steps, finalDefaultValueSum, followingStepsDefaultValueSumArray) => {
  const valuesArray = steps.map(x => x.value);
  const finalresult = steps.map((step, index) => {
    const followingStepsDefaultValueSum = finalDefaultValueSum - followingStepsDefaultValueSumArray[index]
    const previousStepsValueSum = valuesArray.slice(0, index).reduce((acc, x) => acc + x, 0);
    const finalValue = step.value + previousStepsValueSum + followingStepsDefaultValueSum;
    return Object.assign(step, {value: finalValue});
  });
  return finalresult
};


const mergeDuplicateHistories = (histories) => {
  const test = histories.map((history, index) => {
    if (history.skip) {
      return undefined;
    }
    if (history.steps.length) {
      const duplicateHistory = histories.slice(index + 1, histories.length).find(y => history.steps[0].date === path(["steps", "0", "date"], y));
      if (duplicateHistory) {
        let  new_history = JSON.parse(JSON.stringify(history));
        new_history.defaultValue = new_history.defaultValue + duplicateHistory.defaultValue;
        new_history.steps[0].value = new_history.steps[0].value + duplicateHistory.steps[0].value
        duplicateHistory.skip = true;
      return new_history;
    }
    }
    return history;
  }).filter(Boolean);
  return test;
  };

export const add = (histories) => {
  const unique_histories = mergeDuplicateHistories(histories);
 const defaultValueArray = unique_histories.map(x => x.defaultValue);
 const steps = [].concat(...unique_histories.map(x => x.steps));
 const finalDefaultValueSum = defaultValueArray.reduce((acc, val) => acc + val, 0);
 const followingStepsDefaultValueSumArray =  defaultValueArray.reduce((acc,val,i) => acc.concat(i === 0 ? [val] : [acc[i - 1] + val]),[]);
 const finalSteps = stepsArrayHelper(steps, finalDefaultValueSum, followingStepsDefaultValueSumArray);
 return {defaultValue: finalDefaultValueSum, steps: finalSteps};
}

export const serialize = (history) => {
  return JSON.stringify(history);
}

export const deserialize = (str) => {
  return JSON.parse(str);
}
