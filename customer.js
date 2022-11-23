window.onload = function(){
    fetch("/customer/getall")
        .then(response => response.text())
        .then(data => getCustomers(data))
}

var selectedRow = null;

async function addCustomer(){
    var _data = {
        cid : parseInt(document.getElementById("cid").value),
        firstname : document.getElementById("fname").value,
        lastname : document.getElementById("lname").value,
        email : document.getElementById("email").value,
        phonenumber : parseInt(document.getElementById("phone").value)
    }
    var cid = _data.cid;
    if (isNaN(cid)){
        alert("Customer ID cannot be empty")
        return
    }
    fetch("/customer/add",{
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(() => {
        fetch("/customer/get/"+cid)
        .then(response => response.text())
        .then(data => getCustomer(data))
    });
    resetform()
    
    
}

async function getCustomer(data){
    const customer = JSON.parse(data)
    var table = document.getElementById("myTable");
    var row = table.insertRow(table.length);
    var td = []
    for (i = 0; i < table.rows[0].cells.length; i++){
        td[i] = row.insertCell(i);
    }
    td[0].innerHTML = customer.Cid;
    td[1].innerHTML = customer.Firstname;
    td[2].innerHTML = customer.Lastname;
    td[3].innerHTML = customer.PhoneNumber;
    td[4].innerHTML = customer.Email;
    td[5].innerHTML = '<input type="button" onclick="deleteStudent(this)" value="delete" id="button-1">';
    td[6].innerHTML = '<input type="button" onclick="updateStudent(this)" value="edit" id="button-2">';
}

async function getCustomers(data){
    const customers = JSON.parse(data)
    customers.forEach(stud => {
        var table = document.getElementById("myTable");
        var row = table.insertRow();
        var td = []
        for (i=0; i<table.rows[0].cells.length; i++){
            td[i] = row.insertCell(i);
        }
        td[0].innerHTML = stud.Cid;
        td[1].innerHTML = stud.Firstname;
        td[2].innerHTML = stud.Lastname;
        td[3].innerHTML = stud.PhoneNumber;
        td[4].innerHTML = stud.Email;
        td[5].innerHTML = '<input type="button" onclick="deleteStudent(this)" value="delete" id="button-1">';
        td[6].innerHTML = '<input type="button" onclick="updateStudent(this)" value="edit" id="button-2">';
    })
}

function resetform(){
    document.getElementById("cid").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";    
}

async function updateStudent(r) {
    selectedRow = r.parentElement.parentElement;
    document.getElementById("cid").value = selectedRow.cells[0].innerHTML;
    document.getElementById("fname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("lname").value = selectedRow.cells[2].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
    document.getElementById("email").value = selectedRow.cells[4].innerHTML;
    old_sid = selectedRow.cells[0].innerHTML;
    var btn = document.getElementById("button-add");
    if (btn){
        btn.innerHTML = "Update";
        btn.setAttribute("onclick", "update(old_sid)")
    }
}

async function update(old_sid) {
    var newData = {
        cid : parseInt(document.getElementById("cid").value),
        firstname : document.getElementById("fname").value,
        lastname : document.getElementById("lname").value,
        email : document.getElementById("email").value,
        phonenumber : parseInt(document.getElementById("phone").value),
    }
    fetch("/customer/update/"+old_sid,{
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    selectedRow.cells[0].innerHTML = newData.stdid;
    selectedRow.cells[1].innerHTML = newData.firstname;
    selectedRow.cells[2].innerHTML = newData.lastname;
    selectedRow.cells[3].innerHTML = newData.phonenumber;
    selectedRow.cells[4].innerHTML = newData.email;
    var button = document.getElementById("button-add");
    button.innerHTML = "Add";
    button.setAttribute("onclick", "addCustomer()");
    selectedRow = null;
    resetform()
}

async function deleteStudent(r){
    if (confirm("Are you sure you want to DELETE this?")){
        selectedRow = r.parentElement.parentElement;
        cid = selectedRow.cells[0].innerHTML;
        fetch("/customer/delete/"+cid,{
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        var rowIndex = selectedRow.rowIndex;
        if (rowIndex>0){
            document.getElementById("myTable").deleteRow(rowIndex);
        }
        selectedRow = null;
    }
}

function val0(){
    
    if(document.f.a5.value!=document.f.a6.value){
        alert("Password does not match.")
    }
    else{
        return true
    }
    
}