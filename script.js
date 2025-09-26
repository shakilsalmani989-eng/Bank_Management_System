
//Register Page create.html
let regexpin = /^[0-9]{6}$/
function accountcreate()
{
    let ufname = document.getElementById("fname").value;
    let ulname = document.getElementById("lname").value;
    let udob = document.getElementById("dob").value;
    //let ugender = document.getElementById("gender").value;

    let ugender = document.querySelector('input[name="gdr"]:checked')?.value || "";


    let regexmobile = /^[0-9]{10}$/
    let umobile = document.getElementById("mobile").value;

    let uemail = document.getElementById("email").value;
    let upassword = document.getElementById("password").value;

    //let regexpin = /^[0-9]{6}$/
    let upin = document.getElementById("pin").value;

    let amount = 5000.00;

    if(!regexmobile.test(umobile))
    {
        alert("Mobile Number Shoude Be Number")
        return false;
    }

    if(!regexpin.test(upin))
    {
        alert("UPI PIn Shoude Be Number")
        return false;
    }

    let users= JSON.parse(localStorage.getItem("bankuser")) || [];

    let emailexist = users.find(u => u.email === uemail);
    if(emailexist)
    {
        alert("Email Id Is Allready Exist");
        return false;
    }

    let mobileexist = users.find(u => u.mobile === umobile);
    if(mobileexist)
    {
        alert("Mobile Number is Allready Exist");
        return false;
    }

    users.push({fname:ufname, lname:ulname, dob:udob, gender:ugender, mobile:umobile, email:uemail, password:upassword, pin:upin, balance:amount});
    localStorage.setItem("bankuser",JSON.stringify(users));
    alert("Account Cretae Sucessful");
    document.getElementById("register").reset();
    return false;
}


//Login Page login.html

function loginuser()
{
    let cemail = document.getElementById("loginemail").value;
    let cpass = document.getElementById("loginpass").value;

    let checkuser = JSON.parse(localStorage.getItem("bankuser")) || [];
    
    let checkemail = checkuser.find(u => u.email === cemail);
    let checkpass = checkuser.find(u => u.password === cpass);

    if(checkemail)
    {
        if(checkpass)
        {
            if(checkemail === checkpass)
            {
                localStorage.setItem("loginuser",JSON.stringify(checkemail)) || [];
                window.location.href = "UserDashboard.html";
            }
            else
            {
                alert("Password Is Ane Email Incorrect");   
                return false;  
            }
        }
        else
        {
            alert("Password Is Incorrect");   
            return false;  
        }
    }
    else
    {
        alert("Email Is Incorrect");
    }
    return false;
}



// Money Tarnsfer sendmoney.html
function sendmoney()
{
    let sendermobile = document.getElementById("sendermobile").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let reciverpin = document.getElementById("reciverpin").value;

    let users = JSON.parse(localStorage.getItem("bankuser")) || [];
    let loginuser = JSON.parse(localStorage.getItem("loginuser"));

    let sender = users.find(u => u.mobile === sendermobile);

    if(!sender)
    {
        alert("Sender Mobile No Not Exist");
        return false;
    }

    if(loginuser.pin !== reciverpin)
    {
        alert("Your UPI Pin Is Incorrect");
        return false;
    }

    if(loginuser.balance < amount)
    {
        alert("Insufficient Balance");
        return false;
    }

    sender.balance += amount;   
    loginuser.balance -= amount;

    users.map(u =>{
        if(u.email === loginuser.email)
        {
            u.balance -= amount;
        }
    });

    localStorage.setItem("bankuser",JSON.stringify(users));
    localStorage.setItem("loginuser",JSON.stringify(loginuser));
    alert("Amount Sucessful Tarnsefer By " + sender.fname);
    window.location.href = "viewprofile.html";
    document.getElementById("send").reset();
    return false;

    /*let index = users.find(u => u.email === loginuser.email);

    if(!index !== -1)
    {
    users[index] = loginuser;
    }*/
}



/* Update User updateuser.html*/

function updatename()
{
    let name = document.getElementById("newname").value;

    let users = JSON.parse(localStorage.getItem("bankuser"));
    let loginuser = JSON.parse(localStorage.getItem("loginuser"));

    loginuser.fname = name;
    users.map(u =>
    {
        if(u.email === loginuser.email)
        {
            u.fname = name;
        }
    });

    localStorage.setItem("bankuser",JSON.stringify(users));
    localStorage.setItem("loginuser",JSON.stringify(loginuser));
    alert("Your Name has Been Change");
    window.location.href = "UserDashboard.html";
    return false;
}


function updatesurname()
{
    let surname = document.getElementById("newsurname").value;

    let users = JSON.parse(localStorage.getItem("bankuser"));
    let loginuser = JSON.parse(localStorage.getItem("loginuser"));

    loginuser.lname = surname;
    users.map(u =>
    {
        if(u.email === loginuser.email)
        {
            u.lname = surname;
        }
    });

    localStorage.setItem("bankuser",JSON.stringify(users));
    localStorage.setItem("loginuser",JSON.stringify(loginuser));
    alert("Your Surname has Been Change");
    window.location.href = "UserDashboard.html";
    return false;
}


function updatepass()
{
    let pass = document.getElementById("newpassword").value;

    let users = JSON.parse(localStorage.getItem("bankuser"));
    let loginuser = JSON.parse(localStorage.getItem("loginuser"));

    loginuser.password = pass;
    users.map(u =>
    {
        if(u.email === loginuser.email)
        {
            u.password = pass;
        }
    });

    localStorage.setItem("bankuser",JSON.stringify(users));
    localStorage.setItem("loginuser",JSON.stringify(loginuser));
    alert("Your password has Been Change");
    window.location.href = "UserDashboard.html";
    return false;
}

function updatepin()
{
    let pin = document.getElementById("newpin").value;

    if(!regexpin.test(pin))
    {
        alert("only Enter Number");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("bankuser"));
    let loginuser = JSON.parse(localStorage.getItem("loginuser"));

    loginuser.pin = pin;
    users.map(u =>
    {
        if(u.email === loginuser.email)
        {
            u.pin = pin;
        }
    });

    localStorage.setItem("bankuser",JSON.stringify(users));
    localStorage.setItem("loginuser",JSON.stringify(loginuser));
    alert("Your UPI PIN has Been Change New UPI PIN = " + pin);
    window.location.href = "UserDashboard.html";
    return false;
}




let checkuser = JSON.parse(localStorage.getItem("bankuser")) || [];

    checkuser.forEach(u => {
        console.log("Create Name = " +u.fname);
        console.log("Create Surname = " + u.lname);
        console.log("Create DOB = " + u.dob);
        console.log("Create Mobile No = " + u.mobile);
        console.log("Create Gender = " + u.gender);
        console.log("Create Mobile No = " + u.mobile);
        console.log("Create Email = " + u.email);
        console.log("Create Pass = " + u.password);
        console.log("Create Balance = " + u.balance);
        console.log("");
    });

    
