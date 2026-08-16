document.getElementById("javascript-banner").remove()

document.getElementById("years-in-industry").innerHTML = calculateTimeSince(new Date(2023, 9, 25))

function calculateTimeSince(date) {
    var dateDiff = new Date(Date.now() - date);
    var totalYears = dateDiff.getUTCFullYear() - 1970;
    var totalMonths = (totalYears * 12) + dateDiff.getUTCMonth();

    var halfWayThroughYear = totalMonths % 12 >= 6;
    
    return Math.abs(totalYears + halfWayThroughYear);
}