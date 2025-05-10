let API = `https://moviedatabase-fc904-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`
        
        let container = document.getElementById('container')
        let submitbtn = document.getElementById('submitbtn');

        submitbtn.addEventListener("submit", async (e)=>{
            e.preventDefault();
        let name = document.getElementById('nameinput').value;
        let email = document.getElementById('emailinput').value;
        let occupation = document.getElementById('occup').value;
        let age = document.getElementById('age').value;

        if(!name || !email || !occupation || !age){
            container.textContent="All fields must be filled!"
            container.style.color='red'
            return;
        }
        let res = await fetch(`${API}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name,email,occupation,age})
       })
       console.log(res)
       submitbtn.reset()
      
       displyData();
    })
        async function displyData(){
            let res = await fetch(API)
            let data = await res.json();
            let users = Object.entries(data).map(([id, user]) => {
            return { id, ...user };
            });
        
            container.innerHTML = ""
            users.forEach((ele)=>{
                let card = document.createElement('div');
                card.innerHTML=`
                <h2>${ele.name}</h2>
                <p>${ele.occupation}</p>
                <p>${ele.age}</p>
                `
                container.style.color='black'
                container.appendChild(card)
            })
            console.log(users)
        }
        displyData()