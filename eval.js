solve();

function solve() {
    exp = "43+84*65-5/3-2*2+2";
    var post_exp = evaluate(exp);
    //print(exp);
    print(post_exp);
    var a, ans_stack = [];
    for (i = 0; i < post_exp.length; i++) {
        if (isOperand(post_exp[i])) {
            ans_stack.push(post_exp[i]);

        } else {
            var first = ans_stack.pop();
            var second = ans_stack.pop();
            //print(ans_stack);
            //   print(post_exp[i]);
            if (post_exp[i] == '*')
                ans_stack.push(parseFloat(first) * parseFloat(second));
            else
            if (post_exp[i] == '/')
                ans_stack.push(parseFloat(first) / parseFloat(second));
            else
            if (post_exp[i] == '+')
                ans_stack.push(parseFloat(first) + parseFloat(second));
            else
            if (post_exp[i] == '-')
                ans_stack.push(parseFloat(second) - parseFloat(first));
            else
            if (post_exp[i] == '^')
                ans_stack.push(parseFloat(first) ^ parseFloat(second));
            print(peek(ans_stack));
        }

    }
    print(ans_stack[0]);
    print(eval(exp));

}


function evaluate(exp) {
    var i, k = -1;
    //var exp = "2+5*(2-1)*7+(2+8)";
    print(exp);
    var stack = [];
    var ans = [];
    for (i = 0; i < exp.length;) {
        //   print(stack);
        if (isOperand(exp[i])) {
            var x = '';
            while (isOperand(exp[i])) {
                x += exp[i];
                i++;
            }
            print(x);
            ans[++k] = x;
        } else if (exp[i] == '(')
            stack.push(exp[i++]);
        else if (exp[i] == ')') {
            i++;
            while (!isEmpty(stack) && peek(stack) != '(')
                ans[++k] = stack.pop();
            if (!isEmpty(stack) && peek(stack) != '(')
                return -1;
            else
                stack.pop();
        } else { //operator encountered
            while (!isEmpty(stack) && Prec(exp[i]) <= Prec(peek(stack)))
                ans[++k] = stack.pop();
            stack.push(exp[i++]);
        }

    }
    // print(ans);
    var exp = [];
    //print(isEmpty(stack));
    while (!isEmpty(stack)) {
        //print(peek(stack));
        ans[++k] = stack.pop();
    }
    //  ans[++k] = '\0';
    // console.log(exp);
    // if (exp != undefined)
    //     print("result" + ans);
    // else
    //     print("god save us");
    return ans;
}

function Prec(ch) {
    switch (ch) {
        case '+':
        case '-':
            return 1;

        case '*':
        case '/':
            return 2;

        case '^':
            return 3;
    }
    return -1;
}

function peek(stack) {
    return stack[stack.length - 1];
}

function isEmpty(stack) {
    if (stack.length == 0) {
        return true;
    } else
        return false;
}

function isOperand(ch) {
    var result = (ch >= '0' && ch <= '9');
    //  print(result);
    return result;
}