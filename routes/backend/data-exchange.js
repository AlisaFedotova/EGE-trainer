const fetch = require("node-fetch");

exports.compileCode = async function (codeArray) {
    console.log('[compileCode] codeArray:\n', codeArray);
    let code = codeArray.join('\n');
    console.log('[compileCode] code:\n', code, '\n type of code:', typeof code);

    let jobj = "# include <iostream>\n" +
        "using namespace std;\n" +
        "int main()  { \n" +
        "int N, d, maxdigit;\n" +
        "N = 347;\n" +
        "maxdigit = 0;\n" +
        "while (N > 0) {\n" +
        "d = N  % 10;\n" +
        "       if ( d % 2 == 0  && d < 5)\n" +
        "if ( d > maxdigit )\n" +
        "maxdigit = d;\n" +
        "       N = N / 10; \n" +
        "}\n" +
        "if ( maxdigit > 0)\n" +
        "cout <<  maxdigit << endl;\n" +
        "else\n" +
        "cout << \"NO\" << endl;\n" +
        "return 0;\n" +
        "}";
    console.log(jobj);
    let resp = await postColiruRequest(code);
    console.log('[compileCode] response', resp);
    return resp;
};

postColiruRequest = async (code) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"cmd": "g++ main.cpp && ./a.out", "src": code})
    };
    try {
        let fetchResponse = await fetch(`http://coliru.stacked-crooked.com/compile`, settings);
        let resp = await fetchResponse.text();
        console.log('[postColiruRequest] response:', resp);
        return resp;
    } catch (e) {
        return e;
    }
};