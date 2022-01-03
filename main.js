const resultTag = document.getElementById("result");
const textArea = document.getElementById("textarea");
const submitBtn = document.getElementById("submit-btn");

var sample1 = {
  test1: "12",
  test2: {
    test4: false,
  },
  test3: true,
};
let strElements = `<ul>
                    <li>
                        <span onclick="toggle(this)" class="json-viewer-object-start">{ </span>
                        <ul>@placeholder</ul>
                    </li>
                </ul>`;
function createString(key) {
  return `"${key}`;
}
function toggle(e) {
  e.classList.toggle("json-viewer-object-close");
}
function prettier() {
  let temp = "";
  return function traverse(obj, key) {
    if (obj && typeof obj === "object") {
      if (key) {
        temp += `<li><span onclick="toggle(this)" class="json-viewer-object-start">"${key}": {</span><ul>`;
      }
      Object.getOwnPropertyNames(obj).forEach((prop) =>
        traverse(obj[prop], prop)
      );
      temp += `</ul><span class="json-viewer-object-end">}</span></li>`;
    } else {
      temp += `<li>
                        <span class="key">"${key}": </span>
                        <span class="value-${typeof obj}">${
        typeof obj === "string" ? createString(obj) : obj
      }</span>
                    </li>`;
    }
    return temp;
  };
}

submitBtn.addEventListener("click", function () {
  let json;
  try {
    json = JSON.parse(textArea.value);
    const result = prettier()(json);
    const temp = strElements.replace("@placeholder", result);
    resultTag.innerHTML = temp;
  } catch (err) {
    textArea.classList.toggle("has-error");
  }

  // let test = `
  //     <li>
  //         <span class="key">
  //             "test1":
  //         </span>
  //         <span class="value-string">
  //             "12"
  //         </span>
  //     </li>
  //     <li>
  //         <span class="json-viewer-object-start">"test2": { </span>
  //         <ul>
  //             <li>
  //                 <span class="key">
  //                     "test4":
  //                 </span>
  //                 <span class="value-string">
  //                     false
  //                 </span>
  //             </li>
  //         </ul>
  //         <span class="json-viewer-object-end"> } </span>
  //     </li>
  // `;
  // resultTag.innerHTML = test;
});
