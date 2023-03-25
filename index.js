// Function that display value
function dis(val) {
    let result = document.getElementById("result");
    if (result.value === "0") {
        result.value = val;
    } else {
        result.value += val;
    }
}

function myFunction(event) {
    if (event.key == '0' || event.key == '1'
        || event.key == '2' || event.key == '3'
        || event.key == '4' || event.key == '5'
        || event.key == '6' || event.key == '7'
        || event.key == '8' || event.key == '9'
        || event.key == '+' || event.key == '-'
        || event.key == '*' || event.key == '/')
        document.getElementById("result").value += event.key;
}

var cal = document.getElementById("calculator");
cal.onkeyup = function (event) {
    if (event.keyCode == 13) {
        console.log("Enter");
        let x = document.getElementById("result").value
        console.log(x);
        solve();
    }
}

function applyOp(a, b, op) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                return NaN; // dividing by zero results in NaN
            }
            return a / b;
        default:
            return NaN; // for invalid operators
    }
}

// Function that evaluates the digit and return result
function solve() {
    let x = document.getElementById("result").value;
    let parts = x.match(/(\d+(\.\d+)?|\+|\-|\*|\/)/g); // split into numbers and operators
    if (!parts) {
        return; // exit early if no parts are found
    }
    let values = [];
    let ops = [];
    for (let i = 0; i < parts.length; i++) {
        if (!isNaN(parts[i])) {
            values.push(parseFloat(parts[i])); // push numbers to values
        } else {
            // perform previous operation
            if (values.length >= 2) {
                let b = values.pop();
                let a = values.pop();
                let op = ops.pop();
                values.push(applyOp(a, b, op));
            }
            ops.push(parts[i]);
        }
    }
    // perform remaining operations
    while (ops.length > 0) {
        let op = ops.pop();
        let b = values.pop();
        let a = values.pop();
        values.push(applyOp(a, b, op));
    }
    document.getElementById("result").value = values[0];
}

// Function that clear the display
function clr() {
    document.getElementById("result").value = "0";
}

document.getElementById("result").value = "0";
