import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const resolveValue = document.querySelector('input[value="fulfilled"]');
const rejectValue = document.querySelector('input[value="rejected"]');
const button = document.querySelector('button');
button.addEventListener("click", firePromise);

function firePromise(e) {
  e.preventDefault();

  let delayInput = document.querySelector('input[name="delay"]');
  let delayValue = delayInput.value;

  if (isNaN(delayValue) || delayValue <= 0 || !resolveValue.checked && !rejectValue.checked) {
    iziToast.show({
      title: "Error",
      message: "Please make valid inputs",
      color: "orange",
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    delayInput.value = "";

    setTimeout(() => {
      if (resolveValue.checked) {
        resolveValue.checked = false;
        resolve(resolveValue);
      } else {
        rejectValue.checked = false; 
        reject(rejectValue);
      }
    }, delayValue);
  });

  promise
  .then(resolveValue => {
    iziToast.show({
        title: "Done",
        message: `✅ Fulfilled promise in ${delayValue} ms`,
        color: "green",
    });
  })
  .catch(rejectValue => {
    iziToast.show({
        title: "Warning",
        message: `❌ Rejected promise in ${delayValue} ms`,
        color: "red",
    });
  })
  .finally(() => {
    console.log("finally");
  });
}


