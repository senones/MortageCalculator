function calculate() {
    // Collect the data
    let bal = Number(document.getElementById("loan").value);
    let term = Number(document.getElementById("term").value);
    let rate = Number(document.getElementById("rate").value);


    // Run Calculations On Collected Data
    let totMonPmt = (bal) * (rate / 1200) / (1 - Math.pow((1 + rate / 1200), -term));
    let remBal = bal;
    let intPmt = remBal * rate / 1200;
    let prinPmt = totMonPmt - intPmt;
    let totIntPmt = 0;

    // Create table format
    let template = `<tr>
        <th>Month</th>
        <th>Payment</th>
        <th>Principal</th>
        <th>Interest</th>
        <th>Total Interest</th>
        <th>Balance</th>        
    </tr>`;


    // Loop through payments to calculate information for table (Order Matters!)

    for (let i = 1; i <= term; i++) {

        intPmt = remBal * rate / 1200;
        prinPmt = totMonPmt - intPmt;
        totIntPmt += intPmt;
        remBal = remBal - prinPmt;
        totPmt = bal + totIntPmt;

        // Output results to table 
        template += `<tr>
        <td>${i}</td>
        <td>$${totMonPmt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
        <td>$${prinPmt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
        <td>$${intPmt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
        <td>$${totIntPmt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
        <td>$${Math.abs(remBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
    </tr>`
    };

    // Output to HTML
    document.getElementById("result").innerHTML = template;
    document.getElementById("termMon").innerHTML = `${term} months`
    document.getElementById("totBal").innerHTML = `$${bal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    document.getElementById("monPmt").innerHTML = `$${totMonPmt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
    document.getElementById("intRate").innerHTML = `${rate}%`
    document.getElementById("totPmt").innerHTML = `$${totPmt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
    document.getElementById("totInt").innerHTML = `$${totIntPmt.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

};

// On-Click Button Event
document.getElementById('calc').addEventListener('click', function () {

    let verifyBal = Number(document.getElementById('loan').value);
    let verifyTerm = Number(document.getElementById('term').value);
    let verifyRate = Number(document.getElementById('rate').value);


    if (verifyBal == "" || verifyTerm == "" || verifyRate == "" ) {
        swal("Unable to calculate", "Please enter requested information in each box!", "error")
        clearText();
    }
    else {
        calculate();
    }
});

function clearText() {
    document.getElementById("loan").value = "";
    document.getElementById("term").value = "";
    document.getElementById("rate").value = "";
}

