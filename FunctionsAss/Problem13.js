var tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];

let newarr = [];
for(let i=0;i<tasks.length-1;i++){
    newarr[i]=tasks[i+1];
}
let secarr=['imptask1', 'imptask2']
for(let i=secarr.length;i<=tasks.length;i++){
    secarr[i]=tasks[i-1];
}
tasks = secarr;
tasks[tasks.length-1]='newtask';
console.log(tasks);
