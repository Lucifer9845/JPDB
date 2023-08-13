/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


/* global jsonStrObj, resJsonObj */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/1ml";
var stdDBName = "SCHOOL-DB";
var stdRelationName = "STUDENT-TABLE";
var connToken = "90931328|-31949322608858229|90950536";
var jsonObj;

$("#rollno").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}
function getrollnoAsJson0bj() {
    
    var rollno = $("#rollno").val();
    var jsonStr ={
         rollno: rollno
    };
    return JSON.stringify(jsonStr);
}
function fillData (json0bj) {
    saveRecNO2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#stdclass").val(record.name);
    $("#stdbdate").val(record.birthdate);
    $("#stdaddr").val(record.address);
    $("#enrdate").val(record.enrollmentdate);
    
}

function resetForm()
{
    $("#rollno").val("");
    $("#stdname").val("");
    $("#stdbdate").val("");
    $("#stdaddr").val("");
    $("#stdclass").val("");
    $("#enrdate").val("");
    $("#rollno").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollno").focus();
}


function validateData()
{
    var rollno,name, birthdate,stdclass, address, enrollmentdate;
    rollno = $("#rollno").val();
    name = $("#stdname").val();
    birthdate = $("#stdbdate").val();
    address = $("#stdaddr").val();
    stdclass = $("#stdclass").val();
    enrollmentdate= $("#enrdate").val();
    

    if(rollno === "")
    {
        alert("student roll no is missing");
        $("#rollno").focus();
        return "";
    }
    if(name === "")
    {
        alert("name is missing");
        $("#name").focus();
        return "";
    }
    if(stdclass === "")
    {
        alert("student class is missing");
        $("#stdclass").focus();
        return "";
    }

    if(birthdate === "")
    {
        alert("student birthdate is missing");
        $("#stdbdate").focus();
        return "";
    }
    if(address === "")
    {
        alert("student address is missing");
        $("#stdaddr").focus();
        return "";
    }
    if(enrollmentdate === "")
    {
        alert("student enrollment date is missing");
        $("#enrdate").focus();
        return "";
    }
     var jsonStrobj = {
         rollno: rollno,
         name: name,
         class: stdclass,
         stdbdate: birthdate,
         address: address,
         enrollmentdate: enrollmentdate
     };
     return JSON.stringify(jsonStrobj);
}

function getStd()
{
    var rollnoJsonObj = getrollnoAsJson0bj();
    var getRequest = createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, rollnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled". false);
        $("#rollno").focus();
    }
    else if(resJsonObj.status === 200) {
        $("#rollno").prop("disabled", true);
        fillData(resJsonObj);

        $("#change").prop("disabled", false);
        $("#reset").prop("disabled". false);
        $("#rollno").focus();
    }
}

function saveDate()
{
    var jsonStrObj = validateData();
    if(jsonStrObj === "")
    {
        return "";
    }

    var putRequest = createPUTRequest(connToken, jsonStrObj, stdDBName, stdRelationName);
    jquery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
}

function changeData()
{
    $("#change").prop("disabled", true);
    jsonchg = validateData()
    var updateRequest = createUPDATERecordRequest(connToken, jsonchg, stdDBName, stdRelationName, localStorage.setItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}