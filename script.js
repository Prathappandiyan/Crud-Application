
var newMemberAddBtn=document.querySelector(".addMemberBtn"),
darkbg=document.querySelector(".dark_bg"),
popupform=document.querySelector(".popup"),
crossBtn=document.querySelector(".closeBtn"),
submitBtn=document.querySelector(".submitBtn"),
modalTitle=document.querySelector(".modalTitle"),
popupfooter=document.querySelector(".popupFooter"),
imginput=document.querySelector(".img"),
imgHolder = document.querySelector('.imgholder')
form=document.querySelector('form'),
formInputFields = document.querySelectorAll('form input'),
uploadimg=document.querySelector("#uploadimg")
EmployeeId=document.getElementById("EmployeeId")
fName=document.getElementById("fName")
Department=document.getElementById("Department")
Position=document.getElementById("Position")
Type=document.getElementById("Type")
stylecode=document.getElementById("stylecode")
Size=document.getElementById("Size")
Status=document.getElementById("Status")
locations=document.getElementById("locations")
reqDate=document.getElementById("reqDate")
assdate=document.getElementById("assDate")
entries = document.querySelector(".showEntries"),
tabSize = document.getElementById("table_size"),
userInfo = document.querySelector(".userInfo"),
table = document.querySelector("table"),
filterData = document.getElementById("search")

let originaldata=localStorage.getItem('userProfile')?JSON.parse(localStorage.getItem('userProfile')):[]
let getdata=[...originaldata]

let isEdit=false,editID


var arrayLength = 0
var tableSize = 13
var startIndex = 1
var endIndex = 0
var currentIndex = 1
var maxIndex = 0


newMemberAddBtn.addEventListener('click',()=>{
    isEdit=false
    submitBtn.innerHTML="Submit"
    modalTitle.innerHTML="Fill the Form"
    popupfooter.style.display="block"
    imginput.src="pic1.png"
    darkbg.classList.add('active')
    popupform.classList.add('active')
})

///code for close the form
crossBtn.addEventListener('click',()=>{
    darkbg.classList.remove('active')
    popupform.classList.remove('active')
    form.reset()
})

///code uploading image

uploadimg.onchange=function(){
    if(uploadimg.files[0].size<1000000){
        var fileReader=new FileReader()

        fileReader.onload=function(e){
            var imgurl=e.target.result
            imginput.src=imgurl 
        }

        fileReader.readAsDataURL(uploadimg.files[0])
    }

    else{
        alert("This file is too large!")

    }
}


function preLoadCalculations(){
    array = getdata
    arrayLength = array.length
    maxIndex = arrayLength / tableSize

    if((arrayLength % tableSize) > 0){
        maxIndex++
    }
}



function displayIndexBtn(){

    preLoadCalculations()

    const pagination=document.querySelector(".pagination")

    pagination.innerHTML=""

    pagination.innerHTML = '<button onclick="prev()" class="prev">Previous</button>'

    for(let i=1; i<=maxIndex; i++){
        pagination.innerHTML += '<button onclick= "paginationBtn('+i+')" index="'+i+'">'+i+'</button>'
    }

    pagination.innerHTML += '<button onclick="next()" class="next">Next</button>'

    highlightIndexBtn()

}


function highlightIndexBtn(){
    startIndex = ((currentIndex - 1) * tableSize) + 1
    endIndex = (startIndex + tableSize) - 1

    if(endIndex > arrayLength){
        endIndex = arrayLength
    }

    if(maxIndex >= 2){
        var nextBtn = document.querySelector(".next")
        nextBtn.classList.add("act")
    }


    entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`

    var paginationBtns = document.querySelectorAll('.pagination button')
    paginationBtns.forEach(btn => {
        btn.classList.remove('active')
        if(btn.getAttribute('index') === currentIndex.toString()){
            btn.classList.add('active')
        }
    })

    showInfo()
   
}

function showInfo(){
    document.querySelectorAll(".employeeDetails").forEach(info => info.remove())

    var tab_start = startIndex - 1
    var tab_end = endIndex

    if(getdata.length > 0){
        for(var i=tab_start; i<tab_end; i++){
            var staff = getdata[i]


            if(staff){
                let createElement = `<tr class = "employeeDetails">
                <td>${i+1}</td>
                <td><img src="${staff.picture}" alt="" width="40" height="40"></td>
                <td>${staff.EmployeeId}</td>
                <td>${staff.fName}</td>
                <td>${staff.Departmentval}</td>
                <td>${staff.Positionval}</td>
                <td>${staff.Typeval}</td>
                <td>${staff.stylecodeval}</td>
                <td>${staff.Sizeval}</td>
                <td>${staff.Statusval}</td>
                <td>${staff.locationsval}</td>
                <td>${staff.reqDateval}</td>
                <td>${staff.assdateval}</td>
                <td>
                    <button onclick="readInfo('${staff.picture}', '${staff.EmployeeId}', '${staff.fName}', '${staff.Departmentval}', '${staff.PositionVal}', '${staff.Typeval}', '${staff.stylecodeval}', '${staff.Sizeval}', '${staff.Statusval}', '${staff.locationsval}','${staff.reqDateval}','${staff.assdateval}')"><i class="fa-regular fa-eye"></i></button>

                    <button onclick="editInfo('${i}', '${staff.picture}', '${staff.EmployeeId}', '${staff.fName}', '${staff.Departmentval}', '${staff.PositionVal}', '${staff.Typeval}', '${staff.stylecodeval}', '${staff.Sizeval}', '${staff.Statusval}', '${staff.locationsval}','${staff.reqDate}','${staff.assdate}')"><i class="fa-regular fa-pen-to-square"></i></button>

                    <button onclick = "deleteInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>`

                userInfo.innerHTML += createElement
                table.style.minWidth = "1400px"
            }
        }
    }


    else{
        userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="14" align="center">No data available in table</td></tr>`
        table.style.minWidth = "1400px"
    }

}

showInfo()


function readInfo(pic,Id,fname,department,position,type,Stylecode,size,status,locationss,reqDates,assDates){
    imginput.src=pic,
    EmployeeId.value=Id,
    fName.value=fname,
    Department.value=department,
    Position.value=position,
    Type.value=type,
    stylecode.value=Stylecode,
    Size.value=size,
    Status.value=status,
    locations.value=locationss,
    reqDate.value=reqDates,
    assDate.value=assDates


    darkbg.classList.add('active')
    popupform.classList.add('active')
    popupfooter.style.display = "none"
    modalTitle.innerHTML = "Profile"
    formInputFields.forEach(input => {
        input.disabled = true
    })


    imgHolder.style.pointerEvents = "none"

}


function editInfo(id,pic,Id,fname,department,position,type,Stylecode,size,status,locationss,reqDates,assDates){
    isEdit=true
    editID=id


    const originalIndex=originaldata.findIndex(item=> item.id ===id)

    originaldata[originalIndex]={
        id:id,
        picture:pic,
        EmployeeId:EmployeeId,
        fName:fName,
        Departmentval:Department,
        Positionval:Position,
        Typeval:Type,
        stylecodeval:stylecode,
        Sizeval:Size,
        Statusval:Status,
        locationsval:locations,
        reqDateval:reqDate,
        assdateval:assdate
    }

    imginput.src=pic,
    EmployeeId.value=Id,
    fName.value=fname,
    Department.value=department,
    Position.value=position,
    Type.value=type,
    stylecode.value=Stylecode,
    Size.value=size,
    Status.value=status,
    locations.value=locationss,
    reqDate.value=reqDates,
    assDate.value=assDates

    darkbg.classList.add('active')
    popupform.classList.add('active')
    popupfooter.style.display = "block"
    modalTitle.innerHTML = "Update the Form"
    submitBtn.innerHTML = "Update"
    formInputFields.forEach(input => {
    input.disabled = false
    })


    imgHolder.style.pointerEvents = "auto"


}


function deleteInfo(index){
    if(confirm("Aer you sure want to delete?")){
        originaldata.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(originaldata));
        
        // Update getData after deleting the record
        getdata = [...originaldata];

        preLoadCalculations()

        if(getdata.length === 0){
            currentIndex = 1
            startIndex = 1
            endIndex = 0
        }
        else if(currentIndex > maxIndex){
            currentIndex = maxIndex
        }

        showInfo()
        highlightIndexBtn()
        displayIndexBtn()

        var nextBtn = document.querySelector('.next')
        var prevBtn = document.querySelector('.prev')

        if(Math.floor(maxIndex) > currentIndex){
            nextBtn.classList.add("act")
        }
        else{
            nextBtn.classList.remove("act")
        }


        if(currentIndex > 1){
            prevBtn.classList.add('act')
        }
    }


}

form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const information={
        id:Date.now(),
        picture:imginput.src==undefined? ".pic1.png":imginput.src,
        EmployeeId:EmployeeId.value,
        fName:fName.value,
        Departmentval:Department.value,
        Positionval:Position.value,
        Typeval:Type.value,
        stylecodeval:stylecode.value,
        Sizeval:Size.value,
        Statusval:Status.value,
        locationsval:locations.value,
        reqDateval:reqDate.value,
        assdateval:assdate.value
        
    }

    if(!isEdit){
        originaldata.unshift(information)
    }

    else{
        originaldata[editID]=information
    }

    getdata=[...originaldata]
    localStorage.setItem('userProfile',JSON.stringify(originaldata))

    submitBtn.innerHTML="Submit"
    modalTitle.innerHTML="Fill the Form"

    darkbg.classList.remove('active')
    popupform.classList.remove('active')
    form.reset()

    highlightIndexBtn()
    displayIndexBtn()
    showInfo()

    var nextBtn = document.querySelector(".next")
    var prevBtn = document.querySelector(".prev")
    if(Math.floor(maxIndex) > currentIndex){
        nextBtn.classList.add("act")
    }
    else{
        nextBtn.classList.remove("act")
    }


    if(currentIndex > 1){
        prevBtn.classList.add("act")
    }




})



function next(){
    var prevBtn = document.querySelector('.prev')
    var nextBtn = document.querySelector('.next')

    if(currentIndex <= maxIndex - 1){
        currentIndex++
        prevBtn.classList.add("act")

        highlightIndexBtn()
    }

    if(currentIndex > maxIndex - 1){
        nextBtn.classList.remove("act")
    }
}


function prev(){
    var prevBtn = document.querySelector('.prev')

    if(currentIndex > 1){
        currentIndex--
        prevBtn.classList.add("act")
        highlightIndexBtn()
    }

    if(currentIndex < 2){
        prevBtn.classList.remove("act")
    }
}


function paginationBtn(i){
    currentIndex = i

    var prevBtn = document.querySelector('.prev')
    var nextBtn = document.querySelector('.next')

    highlightIndexBtn()

    if(currentIndex > maxIndex - 1){
        nextBtn.classList.remove('act')
    }
    else{
        nextBtn.classList.add("act")
    }


    if(currentIndex > 1){
        prevBtn.classList.add("act")
    }

    if(currentIndex < 2){
        prevBtn.classList.remove("act")
    }
}


tabSize.addEventListener("change",()=>{
    var selectedValue = parseInt(tabSize.value)
    tableSize = selectedValue
    currentIndex = 1
    startIndex = 1
    displayIndexBtn()
})


filterData.addEventListener("input",()=>{
    const searchTerm = filterData.value.toLowerCase().trim()

    if(searchTerm !== ""){

        const filteredData = originaldata.filter((item) => {
            const fullName = (item.fName).toLowerCase()
            const emp = (item.EmployeeId)
            const position = (item.Departmentval).toLowerCase()

            return(
                fullName.includes(searchTerm) ||
                emp.includes(searchTerm) ||
                position.includes(searchTerm)
            )
        })

        // Update the current data with filtered data
        getdata = filteredData
    }

    else{
        getdata = JSON.parse(localStorage.getItem('userProfile')) || []
    }


    currentIndex = 1
    startIndex = 1
    displayIndexBtn()
})

displayIndexBtn()
