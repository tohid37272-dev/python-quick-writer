let editor = CodeMirror.fromTextArea(
document.getElementById("editor"),
{
mode:"python",
theme:"dracula",
lineNumbers:true
}
)

const shortcuts = {
"p":"print()",
"prompt":"prompt = input('Enter your prompt: ')",
"fori":"for i in range(10):",
"ifmain":"if __name__ == '__main__':",
"whilet":"while True:",
"def":"def function_name():",
"cl":"class MyClass:",
"try":"try:\n    pass\nexcept Exception as e:\n    print(e)"
}

editor.on("keyup",function(cm,event){
if(event.key===" " || event.key==="Enter"){
let cursor = cm.getCursor()
let line = cm.getLine(cursor.line)
let words = line.split(" ")
let last = words[words.length-2]
if(shortcuts[last]){
let newLine = line.replace(last,shortcuts[last])
cm.replaceRange(newLine,{line:cursor.line,ch:0},{line:cursor.line,ch:line.length})
}
}
})

let pyodideReady = loadPyodide()

async function runPython(){
let pyodide = await pyodideReady
let code = editor.getValue()
try{
let result = await pyodide.runPythonAsync(code)
document.getElementById("output").textContent = result ?? "Program finished"
}catch(err){
document.getElementById("output").textContent = err
}
}

function downloadCode(){
let code = editor.getValue()
let blob = new Blob([code])
let a = document.createElement("a")
a.href = URL.createObjectURL(blob)
a.download = "script.py"
a.click()
}

function toggleTheme(){
let current = editor.getOption("theme")
editor.setOption("theme",current==="dracula"?"default":"dracula")
}